import { createContext, useContext, useState, useEffect } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import db, { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const userContext = createContext();

// Custom Provider
function UserCustomProvider({children}){
    const[user, setUser] = useState(null);
    const [data, setData] = useState([]);

    function errorNotification(text){
        toast(text);
    }
    
    // Sign up function
    function signUp (data){
        createUserWithEmailAndPassword(auth, data.email, data.pass)
        .then(async(res) => {
            console.log("signed up successfully.")
            await updateProfile(res.user, {
                displayName: data.name
            });
            const currentUser = {
                name: res.user.displayName,
                email: res.user.email,
                password:data.pass
            }
            setUser(currentUser);
            console.log("currentUser", currentUser);
        }).catch((err) => {
            console.log("err from context", err.message);
            errorNotification(err.message);
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
                password:data.pass
            }
            setUser(currentUser);
            console.log(currentUser);

            // Add the data to db = Add a new document in collection "users"
                await setDoc(doc(db, "users", currentUser.email), {
                    name: res.user.displayName,
                    email: res.user.email,
                    password:data.pass
                });
  
        })
        .catch((err) => {
            console.log("error while signing in ", err.message);
            errorNotification(err.message);
        })
    }

    // Sign out
    function logOut(){
        signOut(auth)
        .then(() => {
            console.log("signed out successfully ! ");
            setUser('');
        }).catch((err) => {
            console.log("error while signing out ! ", err);
            errorNotification(err.message);
        });
    }

    // Fetch data / How do you store data from an API in React? = Using Axios Library

    const fetchInfo = () => {
        return axios.get('https://fakestoreapi.com/products').then((res) => setData(res.data));
      };
    
      useEffect(() => {
        fetchInfo();
      }, [data]);

    //   Add to cart
    function addToCart(product){

    }
    
    return(
        <userContext.Provider value={{ signUp, logOut, logIn, errorNotification, user, data, addToCart }}>
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
