import React from 'react'
import {useFormikContext} from "formik"
import AppTextInput from './AppTextInput';
import ErrorMessage from './ErrorMessage';
import { StyleSheet } from 'react-native'


export default function AppFormField({name, ...otherProps}) {
  const {setFieldTouched, handleChange, errors, touched} = useFormikContext();
  return (
   <>
    <AppTextInput
      onBlur={()=>setFieldTouched(name)}
      onChangeText = {handleChange(name)}
      {...otherProps}
    />
    <ErrorMessage error={errors[name]} visible={touched[name]}/>
   </>
  )
}

const styles = StyleSheet.create({

})