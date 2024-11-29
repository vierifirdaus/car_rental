import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import CountDown from 'react-native-countdown-fixed';

function formatIDR(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

function getCurrentDate(dates) {
    let date = new Date(dates);
    const hariIndonesia = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulanIndonesia = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${hariIndonesia[date.getDay()]}, ${date.getDate()} ${bulanIndonesia[date.getMonth()]} ${date.getFullYear()}`;
}  

const calculateRemaining = (date) => {
    const targetDate = new Date(date); 
    targetDate.setDate(targetDate.getDate() + 1); 

    const now = new Date();
    const remainingTime = Math.max((targetDate - now) / 1000, 0); 
    return remainingTime;
}


export default function OrderItem({ 
    carName, 
    price = "200.000",
    date = "20 November 2024",
    status="pending",
    onPress, 
    marginHorizontal = 20,
}) {
    const styles = StyleSheet.create({
        carItem: {
            flexDirection: 'row',
            padding: 10,
            marginHorizontal: marginHorizontal,
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            marginBottom: 10,
        },
        carInfo: {
            flex: 1,
            paddingLeft: 10,
        },
        carName: {
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
        },
        carPrice: {
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            color: '#4CAF50',
            marginTop: 5,
        },
    });
    return (
        <TouchableOpacity style={styles.carItem} onPress={onPress}>
            <View style={styles.carInfo}>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Text style={styles.carName}>{carName} </Text>
                    {status === "paid" ? (
                        <Text style={{ color: 'green' }}>Lunas</Text>
                    ) : calculateRemaining(date) == 0 ? (
                        <Text style={{ color: 'red' }}>Belum Lunas</Text>
                    ) : (
                        <CountDown
                            digitStyle={{ backgroundColor: 'red' }}
                            digitTxtStyle={{ color: 'white' }}
                            timeToShow={['H', 'M', 'S']}
                            timeLabels={{ m: null, s: null }}
                            until={calculateRemaining(date)}
                            onFinish={() => alert('Waktu pembayaran habis')}
                            size={15}
                        />
                    )}
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <Text>{getCurrentDate(date)} </Text>
                    <Text style={{ color: 'green' }}>{formatIDR(price)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
