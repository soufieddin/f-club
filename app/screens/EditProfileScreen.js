import React, {useState} from 'react'
import { StyleSheet, ScrollView, Image, View} from 'react-native'
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/SubmitButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';
import * as Yup from "yup"; 
import {useFirestoreQuery} from '../firebase/useFirestoreQuery';
import { useAuth } from '../firebase/auth';
import {firestore } from '../firebase/firebase'



const validationSchema = Yup.object().shape({
  username: Yup.string().min(2).matches(/^\S+$/, 'This field cannot contain blankspaces').label("name"),
  email: Yup.string().email().label("email"),
  password: Yup.string().min(6).label("password"),
})

export default function EditProfileScreen({ navigation }) {
  const {user} = useAuth();
  const { data: info } = useFirestoreQuery(firestore.collection('users').doc(user.uid));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const handleSubmit = async({ username, email, password }) => {
    try {
      setLoading(true)
       await firestore.collection('users').doc(user.uid).update({
        displayName: username !== "" ? `${username}` : info.displayName,  
      })

      await user.updateProfile(username !== "" ? `${username}` : info.displayName)
      
      await user.updateEmail(email !== "" ? email : info.email)
      await user.updatePassword(password !== "" ? password : user.password)

      setLoading(false)
      navigation.navigate("My Account")

    } catch(error){
      setLoading(false)
      console.log(error.message);
      setError(error.message)
      
    }
  }
  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image style={styles.logo} source={require('../assets/log-icon.png')}/>
        </View>
        <ScrollView>
        <AppForm
          style={styles.form}
          initialValues={{username:`${info?.displayName ? info?.displayName : ""}`, email:"", password:"", firstname:"", lastname:"", address:"", zipCode:"", age:""}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            placeholder={info?.displayName ? info?.displayName : "Username"}
            name="username"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder={info?.email ? info?.email : "Email"}
            textContentType="emailAddress"
            name="email"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            name="password"
          />

          <SubmitButton  text="Update" />
        </AppForm>
        </ScrollView>
      </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent:"center",
  },   
  logo:{
    width:200,
    height: 200,
    alignSelf:"center",
    marginBottom:50,
  }
})
