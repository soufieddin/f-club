import React, { createContext, useState, useEffect, useContext }  from 'react'
import { auth, firestore } from './firebase'
import { useFirestoreQuery } from '../firebase/useFirestoreQuery';
import * as Notifications from 'expo-notifications';
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
    if(!usernames?.includes(`${name.toUpperCase()}`)){
      const response = await auth
        .createUserWithEmailAndPassword(email, password);
      await firestore.collection('users').doc(response.user.uid).set({
      uid: response.user.uid,
      displayName: `${name}`,
      email: `${email}`,
      expoToken:"",
      favorite_cryptos: [],
      assets: [],
    })
      const permission = await Notifications.requestPermissionsAsync();
      if(!permission.granted) return;
      const token = (await Notifications.getExpoPushTokenAsync()).data;

      return await firestore.collection('users').doc(response.user.uid).update({
        expoToken: token
      })

    }else{
      throw new Error("This username already exists!")
    }
  }

  const logout = async () =>{
    auth.signOut()
    setUser(null);
  } 
  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if(user) {
        setUser(user);
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