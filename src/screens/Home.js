import { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, Image, StyleSheet,SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import CarItem from '../components/CarItem';  
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUser } from '../redux/reducers/user';
import { useSelector } from 'react-redux';

export default function Home({ navigation }) {
  const [cars, setCars] = useState([]);
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const getUserUsingRedux = useSelector(selectUser);
  const getUser = async () => {
    try {
      setUser(getUserUsingRedux.data)
    } catch (e) {
      console.log(e);
      setUser(null);
    }
  }
  const fetchCars = async () => {
    setIsLoading(true);
    await axios
        .get('http://192.168.1.22:3000/api/v1/cars')
        .then((res) => {
            setCars(res.data.data);
        })
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCars();
  }, []);
  useFocusEffect(
    useCallback(() => {
      getUser()
      return () => {
        setUser(null)
      };
    }, [])
  )
  const buttonItems = [
    { type: "Sewa Mobil", icon: 'truck' },
    { type: "Oleh-Oleh", icon: 'box' },
    { type: "Penginapan", icon: 'key' },
    { type: "Wisata", icon: 'camera' },
  ];

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data = {cars}
        ListHeaderComponent={
          <>
            {/* Header Section */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>Hi, {user ? user.fullname : 'Guest'}</Text>
                <Text style={styles.location}>Your Location</Text>
              </View>
              <Image style={styles.profileImage} source={require('../assets/picture/Profile.png')} />
            </View>

            {/* Banner Section */}
            <View style={styles.banner}>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>Sewa Mobil Berkualitas di kawasanmu</Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Sewa Mobil</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Car Image */}
            <View style={styles.viewZenix}>
              <Image style={styles.zenix} source={require('../assets/picture/zenix.png')} />
            </View>

            {/* Category Icons */}
            <View style={styles.categoryContainer}>
              {buttonItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.category}>
                  <View style={styles.iconWrapper}>
                    <Icon name={item.icon} size={20} color="white" />
                  </View>
                  <Text style={styles.categoryText}>{item.type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({item,index}) => 
          <CarItem 
            key={index}
            car={item}
            onPress={() => navigation.navigate('CarDetail', { id: item.id })}
          />
        }
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 80,
        backgroundColor: '#A43333',
    },
    greeting: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
    },
    location: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    banner: {
        flexDirection: 'row',
        padding: 20,
        backgroundColor: '#AF392F',
        borderRadius: 10,
        margin: 15,
        marginTop: -50,
        paddingRight: 190,
    },
    bannerText: {
        flex: 1,
    },
    bannerTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    buttonText: {
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 14,
    },
    viewZenix:{
        flexDirection: 'row-reverse',
    },
    zenix:{
        floatImage: 'right',
        justifyContent: 'right',
        resizeMode: 'contain',
        marginTop: -150,
    },
    bannerImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    category: {
        alignItems: 'center',
    },
    iconPlaceholder: {
        width: 50,
        height: 50,
        backgroundColor: '#A43333',
        borderRadius: 10,
        marginBottom: 5,
    },
    categoryText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 12,
        color: 'black',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    carList: {
        marginHorizontal: 20,
    },
    category: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        width: 50,
        height: 50,
        backgroundColor: '#A43333',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    
});

