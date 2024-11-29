import { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, Image, StyleSheet, ScrollView, FlatList, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import OrderItem from '../components/OrderItem';
import { selectUser } from '../redux/reducers/user';
import { useFocusEffect } from '@react-navigation/native';


export default function ListOrder({ navigation }) {
    const user = useSelector(selectUser);
    const [listOrder, setListOrder] = useState([]);
    const getListOrder=async()=>{
        try {
            const res = await axios('http://192.168.0.5:3000/api/v1/order/myorder', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            });
            console.log("ini data data ",res.data.data)
            setListOrder(res.data.data.resources)
        } catch (error) {
            console.log("error",error.response)
        }
    }
    useFocusEffect(
        useCallback(() => {
            console.log("masuk use focues callback");
            getListOrder();
        }, [])
    );

    const handleSubmit = (status,id) => {
        if(status == "paid"){
            navigation.navigate('Ticket', { id: id })
        }
        else if(status == "pending"){
            navigation.navigate('Billing', { id: id })
        }
    }
    return (
        <SafeAreaView>
            <FlatList
                style={styles.container}
                data={listOrder}
                ListHeaderComponent={
                    <>
                        <Text style={styles.sectionTitle}>Daftar Pilihan Transaksi</Text>
                    </>
                }
                renderItem={({item,index}) => 
                    <>
                        <OrderItem 
                            key={index}
                            carName={item.cars.name}
                            price={item.total}
                            date={item.createdDt}
                            status={item.status}
                            onPress={()=>handleSubmit(item.status,item.id)}
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

