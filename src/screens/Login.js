import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin, resetState, selectUser } from '../redux/reducers/user';
import ModalPopup from '../components/ModalPopup';
import Icon from 'react-native-vector-icons/Feather';
import GoogleButton from '../components/GoogleButton';

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (!email || !password) {
      ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    await dispatch(postLogin({ email, password }));
    setLoading(false);
  };

  useEffect(() => {
    if (user.status === 'success') {
      setModalVisible(true);
      setErrorMessage(null);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('HomeTabs', { screen: 'Profil' });
      }, 1000);
    } else if (user.status === 'failed') {
      setModalVisible(true);
      setErrorMessage(user.message);
      setTimeout(() => {
        setModalVisible(false);
        dispatch(resetState());
      }, 2000);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          {/* Loading Indicator */}
          {loading && (
            <ModalPopup visible={loading}>
              <View style={styles.centeredView}>
                <ActivityIndicator size="large" color="#007BFF" />
              </View>
            </ModalPopup>
          )}

          {/* Header with Logo and Close Button */}
          <View style={styles.imageWrapper}>
            <Image source={require('../assets/picture/ToyotaLogo.png')} />
            <TouchableOpacity onPress={() => navigation.navigate('HomeTabs')}>
              <Image
                source={require('../assets/picture/X.png')}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <View style={styles.inputWrapper}>
            <Text style={styles.header}>Welcome Back!</Text>

            <Text style={styles.type}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: johndee@gmail.com"
              placeholderTextColor="gray"
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.type}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="6+ karakter"
              placeholderTextColor="gray"
              secureTextEntry
              onChangeText={setPassword}
            />

            <View style={styles.button}>
              <Button title="Sign In" onPress={()=>handleSubmit()} />
              <GoogleButton />
            </View>

            <Text style={styles.text}>
              Don’t have an account?{' '}
              <Link screen="Register" style={styles.link}>
                Sign Up for free
              </Link>
            </Text>
          </View>

          {/* Modal for Success or Error */}
          <ModalPopup visible={modalVisible}>
            <View style={styles.modalBackground}>
              {errorMessage ? (
                <>
                  <Icon name="x-circle" size={32} color="red" />
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </>
              ) : (
                <>
                  <Icon name="check-circle" size={32} color="green" />
                  <Text style={styles.successMessage}>Berhasil Login!</Text>
                </>
              )}
            </View>
          </ModalPopup>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 16,
  },
  imageWrapper: {
    paddingTop: 25,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    marginTop: 32,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  type: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    marginBottom: 8,
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
  button: {
    marginTop: 16,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  modalBackground: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  successMessage: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
