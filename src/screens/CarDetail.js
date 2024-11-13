import { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import Button from '../components/Button';

function formatIDR(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

// Home Screen Component
export default function CarDetail({ route,navigation }) {
    const { id } = route.params;
    
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start as true while loading

    const getCar = async () => {
        try {
            const res = await axios.get(`http://192.168.1.22:3000/api/v1/cars/${id}`);
            console.log("Car data:", res.data.data);
            setCar(res.data.data);
        } catch (error) {
            console.error("Error fetching car data:", error);
        } finally {
            setIsLoading(false); // Set to false once loading completes, whether successful or not
        }
    };

    const includes = [
        "Apa saja yang termasuk dalam paket misal durasi max 12 jam",
        "Sudah termasuk bensin selama 12 jam",
        "Sudah termasuk Tiket Wisata",
        "Sudah termasuk pajak",
    ];

    const excludes = [
        "Tidak termasuk biaya makan sopir Rp 75.000/hari",
        "Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam",
        "Tidak termasuk akomodasi penginapan",
    ];

    useEffect(() => {
        getCar();
    }, []);

    return (
        <View style={{flex: 1}}>
            <ScrollView style={styles.container}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    car && (
                        <ScrollView style={styles.container}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Image source={require('../assets/picture/back.png')} style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>
                            <View style={styles.detailCar}>
                                <Text style={styles.carName}>{car.manufactur+' '+car.name}</Text>
                                <View style={styles.passenger}>
                                    <Icon name="users" size={15} color="black" />
                                    <Text style={styles.iconDescription}>{car.seat}</Text>
                                    <Icon name="briefcase" size={15} color="black" />
                                    <Text style={styles.iconDescription}>{car.baggage}</Text>
                                </View>
                                <Image
                                    style={styles.carImage}
                                    source={{ uri: car.img }} // Ensure this is a valid URL
                                />
                            </View>
                            {/* Description Car */}
                            <View style={[styles.card, styles.shadowProp]}>
                                <View>
                                    <Text style={styles.descriptionTitle}>Tentang Paket</Text>
                                    <Text style={styles.descriptionTitle}>Include</Text>
                                    {includes.map((item, index) => (
                                        <View key={index} style={styles.listItem}>
                                            <Text style={styles.listText}>• {item}</Text>
                                        </View>
                                    ))}

                                    <Text style={styles.descriptionTitle}>Exclude</Text>
                                    {excludes.map((item, index) => (
                                        <View key={index} style={styles.listItem}>
                                            <Text style={styles.listText}>• {item}</Text>
                                        </View>
                                    ))}
                                    <Text style={styles.descriptionTitle}>Exclude</Text>
                                    {excludes.map((item, index) => (
                                        <View key={index} style={styles.listItem}>
                                            <Text style={styles.listText}>• {item}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    )
                )}
            </ScrollView>
            {
                isLoading ?
                (<Text>...</Text>) :
                (
                    <View style={styles.submitButton}>
                        <Text style={styles.priceValue}>{formatIDR(car.price)}</Text>
                        <Button 
                            title="Lanjut Pembayaran" 
                        />
                    </View>
                )
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    passenger: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        gap:5
    },
    carImage: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    detailCar:{
        alignItems:'center',
    },
    carName:{
        fontFamily:'Poppins-Regular',
        fontSize:14,
        textAlign:'center',
    },
    iconDescription:{
        fontFamily:'Poppins-Bold',
        fontSize:12,
        marginRight:10,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#171717',       
        shadowOffset: { width: -2, height: 4 }, 
        shadowOpacity: 0.2,           
        shadowRadius: 3,              
        elevation: 6,                 
    },
    descriptionTitle:{
        fontFamily:'Poppins-Bold',
        fontSize:14,
        marginBottom:10,
    },
    listText:{
        fontFamily:'Poppins-Bold',
        fontSize:14,
        color:'#8A8A8A'
    },
    submitButton:{
        padding:16,
        backgroundColor:'#EEEEEE'
    },
    priceValue:{
        fontFamily:'Poppins-Bold',
        fontSize:16,
        color:'black',
    }
});
