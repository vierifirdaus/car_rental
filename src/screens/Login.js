//make login in jsx
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from 'react-native-paper';
import { configureFonts, MD3LightTheme } from 'react-native-paper';
import { Link, useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import axios from 'axios'; 
const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Poppins-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Poppins-Thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...MD3LightTheme,
  roundness: 2,
  fonts: configureFonts(fontConfig),
  colors: {
    ...MD3LightTheme.colors,
    primary: '#A43333',
    accent: '#AF392F',
    tertiary: '#3D7B3F',
  },
};

// Login Screen Component
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const formData = { 
      email, 
      password 
    };

    try {
      const res = await axios.post(
        "http://192.168.1.22:3000/api/v1/auth/signin",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": 'application/json'
          }
        }
      );
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/picture/ToyotaLogo.png')} />
        <Link screen="Home"><Image source={require('../assets/picture/X.png')} /></Link>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.header}>Welcome Back!</Text>
        <Text style={styles.type}>Email s s</Text>
        <TextInput 
          style={styles.input}
          placeholder='Contoh: johndee@gmail.com'
          onChangeText={email => setEmail(email)}
          />
        <Text style={styles.type}>Password</Text>
        <TextInput 
          style={styles.input}
          placeholder='6+ karakter'
          onChangeText={password => setPassword(password)}
        />
        <View
          style={styles.button}
        >
          <Button 
            title="Sign In" 
            onPress={handleSubmit}
          />
        </View>
        <Text style={styles.text}>Don’t have an account? <Link screen="Register">   Sign Up for free</Link></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper:{
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper:{
    paddingTop:32,
    paddingLeft:16,
    paddingRight:16,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    textAlign:'center',
    marginBottom:32,
  },
  type:{
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginBottom:10,
  },
  input:{
    marginBottom:10,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    backgroundColor:'white',
    borderColor:'black'
  },
  text:{
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    paddingTop:36,
    textAlign:'center'
  },
  button:{
    paddingTop:25
  }
})