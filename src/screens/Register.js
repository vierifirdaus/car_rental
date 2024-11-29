import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Link } from '@react-navigation/native';
import axios from 'axios';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import ModalPopup from '../components/ModalPopup';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !username || !password) {
      setErrorMessage('All fields are required.');
      setModalVisible(true);
      return;
    }

    const formData = { fullname: name, email: username, password };

    try {
      setLoading(true);
      const res = await axios.post(
        'http://192.168.0.5:3000/api/v1/auth/signup',
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setLoading(false);
      setErrorMessage(null);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('Login');
      }, 1000);
    } catch (e) {
      setLoading(false);
      setErrorMessage(e.response?.data?.message || 'An error occurred. Please try again.');
      setModalVisible(true);
    }
  };

  return (
    <View>
      <View style={styles.imageWrapper}>
        <Image source={require('../assets/picture/ToyotaLogo.png')} />
        <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
          <Image source={require('../assets/picture/X.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.header}>Sign Up!</Text>
        <Text style={styles.type}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: John Doe"
          placeholderTextColor={'black'}
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.type}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Contoh: johndee@gmail.com"
          placeholderTextColor={'black'}
          value={username}
          onChangeText={setUsername}
        />
        <Text style={styles.type}>Create Password</Text>
        <TextInput
          style={styles.input}
          placeholder="8+ karakter"
          placeholderTextColor={'black'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <View style={styles.button}>
          <Button title={loading ? <ActivityIndicator color="white" /> : 'Sign Up'} onPress={handleSubmit} />
        </View>
        <Text style={styles.text}>
          Already have an account?<Link screen="Login"> Sign In here</Link>
        </Text>
      </View>
      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <>
              <Icon size={32} name="x-circle" color="red" />
              {Array.isArray(errorMessage) ? (
                errorMessage.map((e, index) => <Text key={index}>{e.message}</Text>)
              ) : (
                <Text>{errorMessage}</Text>
              )}
            </>
          ) : (
            <>
              <Icon size={32} name="check-circle" color="green" />
              <Text>Registration Successful!</Text>
            </>
          )}
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  imageWrapper: {
    paddingTop: 25,
    paddingLeft: 25,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  type: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 16,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    paddingTop: 36,
    textAlign: 'center',
  },
  button: {
    paddingTop: 25,
  },
  modalBackground: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
  },
});
