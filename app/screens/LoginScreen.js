import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/SubmitButton';
import ErrorMessage from '../components/forms/ErrorMessage';
import ActivityIndicator from '../components/general/ActivityIndicator';
import Screen from '../components/general/Screen';


import * as Yup from "yup"; 
import colors from '../config/colors';

import { useAuth } from '../firebase/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("email"),
  password: Yup.string().required().min(6).label("password")
})

export default function LoginScreen() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({email, password}) => {
    try {
      setLoading(true)
      await login(email, password);
    }catch(error){
      setLoginFailed(true)
      setLoading(false)
    }
  }

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        <View style={styles.logoWrapper}>
          <Image style={styles.logo} source={require('../assets/log-icon.png')}/>
        </View>
        <AppForm
          initialValues={{email:"", password:""}}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error="Invalid email and/or password" visible={loginFailed}/>
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon ="email"
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
            name="email"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon ="lock"
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            name="password"
          />
          <SubmitButton  text="login" />
        </AppForm>
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
  },
  btn: {
    width: '100%',
    height: 60,
    backgroundColor:colors.primary,
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    padding: 15,
    marginVertical:10,
  },
  text:{
    color: colors.white,
    fontSize:18,
    textTransform:"uppercase",
    fontWeight:"bold",
  },

})
