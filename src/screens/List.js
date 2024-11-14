import { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, Image, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import CarItem from '../components/CarItem';  
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
                setCars(res.data.data);
            })
        setIsLoading(false);
      };
    
      useEffect(() => {
        fetchCars();
      }, []);

    return (
        <SafeAreaView>
            <FlatList
                style={styles.container}
                data={cars}
                ListHeaderComponent={
                    <>
                        <Text style={styles.sectionTitle}>Daftar Mobil Pilihan</Text>
                    </>
                }
                renderItem={({item,index}) => 
                    <>
                        <CarItem 
                            key={index}
                            car={item}
                            onPress={() => navigation.navigate('CarDetail', { id: item.id })}
                        />
                    </>
                }
                keyExtractor={(item) => item.id}
            />      
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 25,
        marginLeft: 20,
    },

});

