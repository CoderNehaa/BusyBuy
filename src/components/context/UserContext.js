import { createContext, useContext, useEffect, useState } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import db, { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

const userContext = createContext();

// Custom Provider
function UserCustomProvider({children}){
    const[user, setUser] = useState(null);    //to store user info
    const [data, setData] = useState([]);       // to get home page data
    const [refresh, setRefresh] = useState(false);  //page should refresh or not
    const[cartInfo, setCartInfo] = useState({totalItems:0, totalPrice:0, cartProducts:[]})
    const[orders, setOrders] = useState([]);
    const[searchText, setSearchText] = useState('');

    const categories = ["men's clothing", "women's clothing", "electronics", "jewelery"];
    
    // Sign up function
    async function signUp (data){
        createUserWithEmailAndPassword(auth, data.email, data.pass)
        .then(async(res) => {
            console.log("signed up successfully.")
            await updateProfile(res.user, {
                displayName: data.name
            });
            const currentUser = {
                name: res.user.displayName,
                email: res.user.email,
                password:data.pass,
                cartInfo: {totalItems:0, totalPrice:0, cartProducts:[]},
                orders:[]
            }
            // Store user info in db
            const userDocRef = doc(db , "users" , currentUser.email);
            setDoc(userDocRef , currentUser);

            setUser(currentUser);
        }).catch((err) => {
            toast.error(err.message);
        })
    }
    
    // Sign In
     function logIn(data){
        signInWithEmailAndPassword(auth, data.email, data.pass)
        .then(async (res) => {
            console.log('signed in successfully');
            const currentUser = {
                name: res.user.displayName,
                email: res.user.email,
                password:data.pass,
                cartInfo: {totalItems:0, totalPrice:0, cartProducts:[]},
                orders:[]
            }
            setUser(currentUser);
        })
        .catch((err) => {
            toast.error(err.message);
        })
    }

    // Sign out
    function logOut(){
        signOut(auth)
        .then(() => {
            console.log("signed out successfully ! ");
            setUser(null)
        }).catch((err) => {
            toast.error(err.message);
        });
    }

    const authentication = onAuthStateChanged(auth, (currentUser) => {
        if(currentUser){
            const user = {
                userId: currentUser.uid,
                name: currentUser.displayName,
                email: currentUser.email,
                cartInfo: {totalItems:0, totalPrice:0, cartProducts:[]},
                orders:[]
            }
            setUser(user);
        }
    });
    
    //fecth products from api
    function fetchProducts () {
        axios.get('https://fakestoreapi.com/products').
        then((response)=>{ setData(response.data)}).
        catch((err) => toast.error(err.message));
    }

    // Get cart products
    function getCartProducts (){
        const unsub = onSnapshot(doc(db, "users", user.email), (currentUser) => {
            if(currentUser.data()){
                setCartInfo(currentUser.data().cartInfo)
            }
        });
    }

    // Get all orders
    function getOrders(){
        const unsub = onSnapshot(doc(db, "users", user.email),(currentUser) => {
            if(currentUser.data()){
                setOrders(currentUser.data().orders)
            }
        })
    }

    useEffect(() => {
        if(user){
            getCartProducts();
            getOrders();
        }
    }, [refresh]);


    //   Add to cart
    async function addToCart(obj){
        const docRef = doc(db, "users", user.email);
        const item = { category : obj.category, id:obj.id, image:obj.image, price:obj.price, title:obj.title, count:1 };
        const isItemInCart = cartInfo.cartProducts.some(product => product.id === item.id);
        
        if (isItemInCart) {
            toast.info("Product already present in the cart");
            return;
        }
        
        await updateDoc(docRef, {
            cartInfo:{
                        cartProducts: [...cartInfo.cartProducts, item],
                        totalItems : cartInfo.totalItems + 1,
                        totalPrice : cartInfo.totalPrice + item.price
                    }
        });
        setRefresh(!refresh);
        toast.success("Product added successfully");
    }
    
    async function removeFromCart(item){
        const docRef = doc(db, "users", user.email);
        const updatedArray = cartInfo.cartProducts.filter((product) => product.id !== item.id);

        await updateDoc(docRef, {
            cartInfo:{
                        cartProducts: updatedArray,
                        totalItems : cartInfo.totalItems - item.count,
                        totalPrice : cartInfo.totalPrice - item.price * item.count
                    }
        });
        
        setRefresh(!refresh);
        toast.success("Product Removed successfully");
    }

    //increase qty of product in cart
    const increaseProduct = async(product)=>{
        let index = cartInfo.cartProducts.findIndex((el)=> el.id === product.id);
        
        if(index !== -1){
            cartInfo.cartProducts[index].count++;
            
            const docRef = doc(db, "users", user.email);
            await updateDoc(docRef, {
                cartInfo:{
                            cartProducts: cartInfo.cartProducts,
                            totalItems : cartInfo.totalItems + 1,
                            totalPrice : cartInfo.totalPrice + product.price
                        }
                        
            });
            setRefresh(!refresh);
        }
    }

    //decrease qty of product in cart
    const decreaseProduct = async(product) => {
        let index = cartInfo.cartProducts.findIndex((el)=> el.id === product.id);
        
        if(index !== -1 ){
            if(cartInfo.cartProducts[index].count > 1){
                cartInfo.cartProducts[index].count--;
            
                const docRef = doc(db, "users", user.email);
                await updateDoc(docRef, {
                    cartInfo:{
                                cartProducts: cartInfo.cartProducts,
                                totalItems : cartInfo.totalItems - 1,
                                totalPrice : cartInfo.totalPrice - product.price
                            }
                            
                });
                setRefresh(!refresh);
            } else {
                toast.info("Product qty can't be less than one. ");
                return;   
            }
            
        }
    }

    // To make the cart empty
    async function clearCart(){
        const docRef = doc(db, "users", user.email);
        await updateDoc(docRef, {
            cartInfo:{
                        cartProducts: [],
                        totalItems : 0,
                        totalPrice : 0
                    }
        });
        setRefresh(!refresh);    
    }

    async function purchase(){
        let date = new Date();
        let currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        let order = {
            orderDate : currentDate, 
            totalPrice : cartInfo.totalPrice,
            orderedProductDetails : cartInfo.cartProducts
        }

        const docRef = doc(db, 'users', user.email);
        await updateDoc(docRef, {orders: [order, ...orders]});
        setRefresh(!refresh);
    }

    return(
        <userContext.Provider value={{ 
            signUp, logOut, logIn, user, categories, toast, data, addToCart, cartInfo, authentication, fetchProducts, getCartProducts, removeFromCart, increaseProduct, decreaseProduct, clearCart, purchase, orders, getOrders 
        }}>
            {children}
        </userContext.Provider>
    )
}

// Custom Hook
function UserCustomHook(){
    return useContext(userContext);
}

export default UserCustomProvider;
export {userContext, UserCustomHook};
