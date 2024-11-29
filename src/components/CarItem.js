import * as React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
function formatIDR(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}
export default function CarItem({ 
    car, 
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
        carImage: {
            width: 60,
            height: 60,
            resizeMode: 'contain',
        },
        carInfo: {
            flex: 1,
            paddingLeft: 10,
        },
        carName: {
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
        },
        carDetails: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 5,
        },
        icon: {
            marginRight: 5,
        },
        detailText: {
            marginRight: 15,
        },
        carPrice: {
            fontFamily: 'Poppins-reguler',
            fontSize: 14,
            color: '#4CAF50',
            marginTop: 5,
        },
    });

    return (
        <TouchableOpacity style={styles.carItem} onPress={onPress}>
            <Image
                style={styles.carImage}
                source={{ uri: car.img }} 
            />
            <View style={styles.carInfo}>
                <Text style={styles.carName}>{car.name}</Text>
                <View style={styles.carDetails}>
                    <Icon name="users" size={15} color="black" style={styles.icon} />
                    <Text style={styles.detailText}>{car.seat}</Text>
                    <Icon name="briefcase" size={15} color="black" style={styles.icon} />
                    <Text style={styles.detailText}>{car.baggage}</Text>
                </View>
                <Text style={styles.carPrice}>{formatIDR(car.price)}</Text>
            </View>
        </TouchableOpacity>
    );
};