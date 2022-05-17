import React, { createContext, useState, useEffect, useContext }  from 'react'
import { auth, firestore } from './firebase'
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';

const authContext = createContext();


export const useAuth = () => {
  return useContext(authContext);
}


export function AuthProvider({ children }) {
  const { data: allUsers } = useFirestoreQuery(firestore.collection('users'));
  const usernames = allUsers?.map(u => u.displayName.toUpperCase());
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => auth.signInWithEmailAndPassword(email, password);
  
  const signup = async (name, email, password) => {
    if(!usernames?.includes(`@${name.toUpperCase()}`)){
      const response = await auth
        .createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').doc(response.user.uid).set({
      uid: response.user.uid,
      displayName: `${name}`,
      firstName:"",
      lastName:"",
      address:"",
      zipCode:"",
      age:"",
      expoToken:""
    })
      return await response.user.updateProfile({
        displayName: `${name}`,
      });

    }else{
      throw new Error("This username already exists!")
    }
  }

  const logout = async () =>{
    auth.signOut()
  } 

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
      }
      else{
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  },[])

  const value = {
    user,
    login,
    logout,
    signup
  }

  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  )
}