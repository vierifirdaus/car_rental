import * as React from 'react';
import { Button, Text, View, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Home Screen Component
export default function Home({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Hi, Nama</Text>
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
                <Image style={styles.bannerImage} source={require('../assets/picture/zenix.png')} />
            </View>

            {/* Category Icons */}
            <View style={styles.categoryContainer}>
                {["Sewa Mobil", "Oleh-Oleh", "Penginapan", "Wisata"].map((item, index) => (
                    <TouchableOpacity key={index} style={styles.category}>
                        {/* Placeholder icons */}
                        <View style={styles.iconPlaceholder}></View>
                        <Text style={styles.categoryText}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Car List */}
            <Text style={styles.sectionTitle}>Daftar Mobil Pilihan</Text>
            <View style={styles.carList}>
                {/* Example of car item */}
                {[{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" },{ name: "Innova Zenix", price: "Rp 230.000" }].map((car, index) => (
                    <View key={index} style={styles.carItem}>
                        <Image style={styles.carImage} source={require('../assets/picture/zenix.png')} />
                        <View style={styles.carInfo}>
                            <Text style={styles.carName}>{car.name}</Text>
                            <Text style={styles.carPrice}>{car.price}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#A43333',
    },
    greeting: {
        color: '#FFFFFF',
        fontSize: 18,
    },
    location: {
        color: '#FFFFFF',
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
        backgroundColor: '#A43333',
        borderRadius: 10,
        margin: 15,
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
        color: '#FFFFFF',
        fontSize: 14,
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
        fontSize: 12,
        color: '#A43333',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    carList: {
        paddingHorizontal: 20,
    },
    carItem: {
        flexDirection: 'row',
        padding: 10,
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
        fontSize: 14,
        fontWeight: 'bold',
    },
    carPrice: {
        color: '#4CAF50',
        marginTop: 5,
    },
});

