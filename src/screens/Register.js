import React, { useState } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Link } from '@react-navigation/native';
import axios from 'axios'; // Make sure axios is installed and imported
import Button from '../components/Button';

export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const formData = { fullname: name, email: username, password };

    try {
      const res = await axios.post(
        "http://192.168.1.22:3000/api/v1/auth/signup",
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
        <Link screen="Home">
          <Image source={require('../assets/picture/X.png')} />
        </Link>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.header}>Sign Up!</Text>
        <Text style={styles.type}>Name</Text>
        <TextInput 
          style={styles.input}
          placeholder='Contoh: John Doe'
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.type}>Email</Text>
        <TextInput 
          style={styles.input}
          placeholder='Contoh: johndee@gmail.com'
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.type}>Create Password</Text>
        <TextInput 
          style={styles.input}
          placeholder='8+ karakter'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View
          style={styles.button}
        >
          <Button 
            title="Sign Up" 
            onPress={handleSubmit}
          />
        </View>
        <Text style={styles.text}>Already have an account?<Link screen="Login">   Sign In here</Link></Text>
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