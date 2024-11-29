import { View, Text, Alert, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import HERE_API_KEY from" @env";

export default function GeoLoc() {
    const [position, setPosition] = useState('Fetching location...');

    const getAddressFromCoordinates = async ({ latitude, longitude }) => {
        try {
        const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?apiKey=${HERE_API_KEY}&limit=1&at=${latitude},${longitude}`;
            const res = await axios.get(url);

            if (res.data?.items?.length) {
                const { address } = res.data.items[0];
                console.log("Fetched address:", address);
                return `${address.street}, ${address.houseNumber || ''}`.trim();
            }
            console.warn("No address found for the given coordinates.");
            return "Address not found";
        } catch (e) {
            console.error("Error in getAddressFromCoordinates:", e.message || e);
            return "Error fetching address";
        }
    };

    const getCurrentPosition = async () => {
        Geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const address = await getAddressFromCoordinates({
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                    });
                    setPosition(address);
                } catch (error) {
                    console.error("Error fetching address from coordinates:", error);
                    setPosition("Error fetching address");
                }
            },
            (error) => {
                console.error("Error getting location:", error);
                Alert.alert('GetCurrentPosition Error', JSON.stringify(error));
                setPosition("Unable to fetch location");
            },
            { enableHighAccuracy: true }
        );
    };

    useEffect(() => {
        getCurrentPosition();
    }, []);

    return (
        <View>
            <Text style={styles.title}>{position}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
    },
});
