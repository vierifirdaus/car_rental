import { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, Image, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import CarItem from '../components/CarItem';  
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectCars } from '../redux/reducers/cars';

export default function List({ navigation }) {
    const cars = useSelector(selectCars);
    return (
        <SafeAreaView>
            <FlatList
                style={styles.container}
                data={cars.cars}
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

