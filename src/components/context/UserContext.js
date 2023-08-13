import { createContext, useContext, useState, useEffect } from "react";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
const userContext = createContext();

// Custom Provider
function UserCustomProvider({children}){
    const[userName, setUserName] = useState("");
    const [refresh, setRefersh] = useState(false);
    
    function errorNotification(text){
        toast(text);
    }
    
    // Sign up function
    function signUp (name, email, password){
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(res) => {
            const user = res.user;
            await updateProfile(user, {
                displayName: name
            });
            setRefersh(!refresh);
            console.log( "user" ,user);
            return user;
        }).catch((err) => {
            console.log("err from context", err.message);
            errorNotification(err.message);
            return err;
        })
    }

    // Sign In
    function logIn(email, password){
         signInWithEmailAndPassword(auth, email, password)
         .then(() => {setRefersh(!refresh)})
         .catch((err) => {
            console.log("error while signing in ", err.message);
            errorNotification(err.message);
         })
    }

    // Sign out
    function logOut(){
        signOut(auth).then(() => {
            setUserName('');
          }).catch((err) => {
            console.log("error while signing out ! ", err);
            errorNotification(err.message);
          });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                setUserName(currentUser.displayName)
            }
        })
        // return () => // Return a cleanup function
        unsubscribe(); 
    }, [refresh, userName])

    return(
        <userContext.Provider value={{ userName, signUp, logOut, logIn }}>
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
