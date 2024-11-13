import { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import axios from 'axios';

// Home Screen Component
export default function CarDetail({ route }) {
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

    useEffect(() => {
        getCar();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {isLoading ? (
                <Text>Loading...</Text>
            ) : (
                car && (
                    <View>
                        <Text>{car.name}</Text>
                        <View style={styles.passenger}>
                            <Icon name="users" size={15} color="#A43333" />
                            <Text>{car.seat}</Text>
                            <Icon name="briefcase" size={15} color="#A43333" />
                            <Text>{car.baggage}</Text>
                        </View>
                        <Image
                            style={styles.carImage}
                            source={{ uri: car.img }} // Ensure this is a valid URL
                        />

                        {/* Description Car */}
                        <View>
                            <Text>Tentang Paket</Text>
                            <Text>Include</Text>
                            <Text>
                                Apa saja yang termasuk dalam paket misal durasi max 12 jam
                                Sudah termasuk bensin selama 12 jam
                                Sudah termasuk Tiket Wisata
                                Sudah termasuk pajak
                            </Text>
                            <Text>Exclude</Text>
                            <Text>
                                Tidak termasuk biaya makan sopir Rp 75.000/hari
                                Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam
                                Tidak termasuk akomodasi penginapan
                            </Text>
                        </View>
                    </View>
                )
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    passenger: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    carImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 16,
    },
});
