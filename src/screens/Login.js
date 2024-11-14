//make login in jsx
import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextInput } from 'react-native-paper';
import { configureFonts, MD3LightTheme } from 'react-native-paper';
import { Link, useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';
import { postLogin, selectUser } from '../redux/reducers/user';
import ModalPopup from '../components/ModalPopup';
import Icon from 'react-native-vector-icons/Feather';

// Login Screen Component
export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const formData = { 
      email, 
      password 
    };

    await dispatch(postLogin(formData));
  };

  useEffect(()=>{
    if(user.status === 'success'){
      console.log("berhasil berhasil ")
      console.log(user)
      setModalVisible(true);
      setErrorMessage(null);
      setTimeout(() => {
        navigation.navigate('HomeTabs', { screen: 'Profil' });
      }, 1000);
    }
    else if(user.status === 'failed'){
      setModalVisible(true);
      setErrorMessage(user.message);
    }
  }, [navigation, user]);
  return (
    <View>
      <ModalPopup visible={user.status === 'loading'}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator />
        </View>
      </ModalPopup>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/picture/ToyotaLogo.png')} />
        <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
            <Image source={require('../assets/picture/X.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
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