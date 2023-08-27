import { createContext, useContext, useEffect, useReducer } from "react";

import axios from 'axios';

import db, { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import busyBuyReducer from "../Reducer";

const userContext = createContext();

// Custom Provider
function UserCustomProvider({children}){
    const categories = ["men's clothing", "women's clothing", "electronics", "jewelery"];
    const[state, dispatch] = useReducer(busyBuyReducer, {data:[], products:[], user:null, refresh:false, cartInfo:{totalItems:0, totalPrice:0, cartProducts:[]},orders:[], loading:false, searchText:'', filterPrice:100, selectedCategories:[]})

    // Sign up function
    async function signUp (data){
        dispatch({type:'setData', payload: {state: 'loading', value:true}})
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
            dispatch({ type: 'setData' , payload:{state: 'user', value: currentUser} });
            dispatch({type:'setData', payload: {state: 'loading', value:false}})
        }).catch((err) => {
            toast.error(err.message);
            dispatch({type:'setData', payload: {state: 'loading', value:false}})
        })
    }
    
    // Sign In
     function logIn(data){
        dispatch({type:'setData', payload: {state: 'loading', value:true}})
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
            dispatch({ type: 'setData' , payload:{state: 'user', value: currentUser} });
            dispatch({type:'setData', payload: {state: 'loading', value:false}})
        })
        .catch((err) => {
            toast.error(err.message);
            dispatch({type:'setData', payload: {state: 'loading', value:false}})
        })
    }

    // Sign out
    function logOut(){
        signOut(auth)
        .then(() => {
            console.log("signed out successfully ! ");
            dispatch({ type: 'setData' , payload:{state: 'user', value: null} });
        }).catch((err) => {
            toast.error(err.message);
        });
    }

    const authentication = () => {
        dispatch({type:'setData', payload: {state: 'loading', value:true}})
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                const user = {
                    userId: currentUser.uid,
                    name: currentUser.displayName,
                    email: currentUser.email,
                    cartInfo: {totalItems:0, totalPrice:0, cartProducts:[]},
                    orders:[]
                }
                dispatch({ type: 'setData' , payload:{state: 'user', value: user} });
            }
        });
        dispatch({type:'setData', payload: {state: 'loading', value:false}})
    }
    
    //fecth products from api
    function fetchProducts () {
        axios.get('https://fakestoreapi.com/products').
        then((response)=>{
            dispatch({type: 'setData', payload:{state:'data', value: response.data}})
        }).
        catch((err) => toast.error(err.message));
    }
    
    // search query
    const handleSearchChange = (e) => {
        const newSearchText = e.target.value;
        dispatch({type:'setData', payload: {state: 'searchText', value:newSearchText}})
    };

    // Filter products based on category and price
    const filterProducts = (category, price) => {
        dispatch({type:'setData', payload: {state: 'filterPrice', value:price}})
        if(category !== null){
            if (state.selectedCategories.includes(category)) {                  // removing category
                dispatch({type:'remove', payload: {state:'selectedCategories', value: category}})
            } else {                                                            // Adding selected category
                dispatch({type: 'add', payload: {state: 'selectedCategories', value:category}})
            }
        }
    }

    // Get cart products
    function getCartProducts (){
        const unsub = onSnapshot(doc(db, "users", state.user.email), (currentUser) => {
            if(currentUser.data()){
                dispatch({ type: 'setData' , payload:{state: 'cartInfo', value: currentUser.data().cartInfo} });
            }
        });
    }

    // Get all orders
    function getOrders(){
        const unsub = onSnapshot(doc(db, "users", state.user.email),(currentUser) => {
            if(currentUser.data()){
                dispatch({ type: 'setData' , payload:{state: 'orders', value: currentUser.data().orders} });
            }
        })
    }

    //  Add to cart
    async function addToCart(obj){
        const docRef = doc(db, "users", state.user.email);
        const item = { category : obj.category, id:obj.id, image:obj.image, price:obj.price, title:obj.title, count:1, rating:obj.rating.rate};
        const isItemInCart = state.cartInfo.cartProducts.some(product => product.id === item.id);
        
        if (isItemInCart) {
            toast.info("Product already present in the cart");
            return;
        }
        
        await updateDoc(docRef, {
            cartInfo:{
                        cartProducts: [...state.cartInfo.cartProducts, item],
                        totalItems : state.cartInfo.totalItems + 1,
                        totalPrice : state.cartInfo.totalPrice + item.price
                    }
        });
        dispatch({type: 'setData', payload:{state:'refresh', value: !state.refresh}})
        toast.success("Product added successfully");
    }
    
    // Remove product from cart
    async function removeFromCart(item){
        const docRef = doc(db, "users", state.user.email);
        const updatedArray = state.cartInfo.cartProducts.filter((product) => product.id !== item.id);

        await updateDoc(docRef, {
            cartInfo:{
                        cartProducts: updatedArray,
                        totalItems : state.cartInfo.totalItems - item.count,
                        totalPrice : state.cartInfo.totalPrice - item.price * item.count
                    }
        });
        
        dispatch({type: 'setData', payload:{state:'refresh', value: !state.refresh}})
        toast.success("Product Removed successfully");
    }

    //increase qty of product in cart
    const increaseProduct = async(product)=>{
        let index = state.cartInfo.cartProducts.findIndex((el)=> el.id === product.id);
        
        if(index !== -1){
            state.cartInfo.cartProducts[index].count++;
            
            const docRef = doc(db, "users", state.user.email);
            await updateDoc(docRef, {
                cartInfo:{
                            cartProducts: state.cartInfo.cartProducts,
                            totalItems : state.cartInfo.totalItems + 1,
                            totalPrice : state.cartInfo.totalPrice + product.price
                        }
                        
            });
            dispatch({type: 'setData', payload:{state:'refresh', value: !state.refresh}})
        }
    }

    //decrease qty of product in cart
    const decreaseProduct = async(product) => {
        let index = state.cartInfo.cartProducts.findIndex((el)=> el.id === product.id);
        
        if(index !== -1 ){
            if(state.cartInfo.cartProducts[index].count > 1){
                state.cartInfo.cartProducts[index].count--;
            
                const docRef = doc(db, "users", state.user.email);
                await updateDoc(docRef, {
                    cartInfo:{
                                cartProducts: state.cartInfo.cartProducts,
                                totalItems : state.cartInfo.totalItems - 1,
                                totalPrice : state.cartInfo.totalPrice - product.price
                            }
                            
                });
                dispatch({type: 'setData', payload:{state:'refresh', value: !state.refresh}})
            } else {
                removeFromCart(product);
                return;   
            }      
        }
    }

    // To make the cart empty
    async function clearCart(){
        const docRef = doc(db, "users", state.user.email);
        await updateDoc(docRef, {
            cartInfo:{
                        cartProducts: [],
                        totalItems : 0,
                        totalPrice : 0
                    }
        });
        dispatch({type: 'setData', payload:{state:'refresh', value: !state.refresh}})    
    }

    // To purchase the cart products
    async function purchase(){
        let date = new Date();
        let currentDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        let order = {
            orderDate : currentDate, 
            totalPrice : state.cartInfo.totalPrice,
            orderedProductDetails : state.cartInfo.cartProducts
        }

        const docRef = doc(db, 'users', state.user.email);
        await updateDoc(docRef, {orders: [order, ...state.orders]});
        dispatch({type:'setData', payload:{state:'refresh', value: !state.refresh}})
    }

    // Use Effect hook to fill the products array with data
    useEffect(() => {   
        dispatch({type:'setData', payload: {state:'products', value: state.data}})
    },[state.data])

    // Use Effect hook to refresh the page for search query
    useEffect(() => {
        const filteredProducts = state.products.filter(product => product.title.toLowerCase().includes(state.searchText.toLowerCase()));
        dispatch({type:'setData', payload: {state:'products', value: filteredProducts}})
    },[state.searchText])
    
    // Use Effect hook to apply filters
    useEffect(() => {
        if(state.selectedCategories.length === 0){
            const filteredProducts = state.data.filter(product => product.price < state.filterPrice);  
            dispatch({type:'setData', payload: {state:'products', value: filteredProducts}})
        } else {
            const filteredProducts = state.data.filter(product => product.price < state.filterPrice && state.selectedCategories.includes(product.category));
            dispatch({type:'setData', payload: {state:'products', value: filteredProducts}})
        }
    }, [state.selectedCategories, state.filterPrice])
  
    // Use Effect hook to refresh the page for cart products and orders
    useEffect(() => {
        if(state.user){
            getCartProducts();
            getOrders();
        }
    }, [state.refresh]);

    return(
        <userContext.Provider value={{
            loading:state.loading,
            signUp, logIn, logOut, authentication,
            user:state.user, products:state.products, fetchProducts, getCartProducts, getOrders,
            handleSearchChange, categories, filterProducts, value:state.filterPrice,
            cartInfo:state.cartInfo, addToCart, removeFromCart, increaseProduct, decreaseProduct, clearCart, purchase, 
            orders:state.orders 
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
