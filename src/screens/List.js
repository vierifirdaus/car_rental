import { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CarItem from '../components/CarItem';  // Adjust path if needed
import axios from 'axios';
// Home Screen Component
export default function List({ navigation }) {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchCars = async () => {
        setIsLoading(true);
        await axios
            .get('http://192.168.1.22:3000/api/v1/cars')
            .then((res) => {
                console.log(res.data.data);
                setCars(res.data.data);
            })
        setIsLoading(false);
      };
    
      useEffect(() => {
        fetchCars();
      }, []);

    return (
        <ScrollView style={styles.container}>
            

            {/* Car List */}
            <Text style={styles.sectionTitle}>Daftar Mobil Pilihan</Text>
            <View style={styles.carList}>
                {
                    isLoading ? (
                        <Text>Loading...</Text>
                    ) : cars.map((car, index) => (
                        <CarItem
                            key={car.id}
                            car={car}
                            onPress={() => navigation.navigate('CarDetail', { id: car.id })}
                        />
                    ))
                }
                
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop:15,
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
        fontFamily: 'Poppins-Bold',
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

