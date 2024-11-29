import { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, ToastAndroid } from 'react-native';
import axios from 'axios';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { useDispatch, useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-fixed';
import CarItem from '../components/CarItem';
import BankItem from '../components/BankItem';
import Button from '../components/Button';
import Icon from 'react-native-vector-icons/Feather';
import Clipboard from '@react-native-clipboard/clipboard';
import { selectUser } from '../redux/reducers/user';
import { useFocusEffect } from '@react-navigation/native';
function formatIDR(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

function getCurrentDate(dates) {
    let date = new Date(dates);
    date.setDate(date.getDate() + 1);
    const hariIndonesia = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const bulanIndonesia = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${hariIndonesia[date.getDay()]}, ${date.getDate()} ${bulanIndonesia[date.getMonth()]} ${date.getFullYear()} jam ${date.getHours()}:${date.getMinutes()} WIB`;
}  

const calculateRemaining = (date) => {
    const targetDate = new Date(date); 
    targetDate.setDate(targetDate.getDate() + 1); 

    const now = new Date();
    const remainingTime = Math.max((targetDate - now) / 1000, 0); 
    return remainingTime;
}

export default function Billing({ route, navigation }) {
    const {id} = route.params;
    const [car, setCar] = useState(null);
    const [order, setOrder] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector(selectUser);

    const copyToClipboard = (text) => {
        console.log("copy ini  ",text)
        Clipboard.setString(text);
        ToastAndroid.showWithGravity(
            text+' berhasil disalin',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    }

    const fetchOrderData = async () => {
        try {
            const res = await axios(`http://192.168.0.5:3000/api/v1/order/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
            })
            try {
                const res2 = await axios.get(`http://192.168.0.5:3000/api/v1/cars/${res.data.data.car_id}`);
                setCar(res2.data.data);
            } catch (error) {
                console.error("Error fetching order data:", error.response.data);                
            }
            setOrder(res.data.data)
        } catch (error) {
            console.error("Error fetching car data:", error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            console.log("masuk use focues callback");
            fetchOrderData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <View style={{flexDirection:"row", gap:5}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/picture/back.png')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <Text style={styles.headingTitle}>Pembayaran</Text>
                </View>
                <ProgressSteps activeStep={1}>
                    <ProgressStep label="Pilih Metode">
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 1!</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Bayar" previousBtnText={""} nextBtnText={""}>
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 2!</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Tiket">
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 3!</Text>
                        </View>
                    </ProgressStep>
                </ProgressSteps>
            </View>
            <ScrollView>

                <View style={styles.countdownContainer}>
                    <Text style={styles.descriptionTitleText}>Selesaikan Pembayaran Sebelum</Text>
                    {
                        order ? 
                            <CountDown
                                digitStyle={{backgroundColor:'red'}}
                                digitTxtStyle={{color:'white'}}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{ m: null, s: null }}
                                until={calculateRemaining(order?order.createdDt:24*60*60)}
                                onFinish={() => alert('Waktu pembayaran habis')}
                                size={15}
                            /> :
                            <Text>Loading...</Text>
                    }
                    
                </View>

                <Text style={styles.descriptionTitleText}>{getCurrentDate(order?order.createdDt:new Date().toISOString)}</Text>

                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    car && (
                        <CarItem
                            car={car}
                            onPress={() => navigation.navigate('CarDetail', { id: car.id })}
                            marginHorizontal={0}
                        />
                    )
                )}

                <Text style={styles.descriptionTitleText}>Lakukan Transfer ke</Text>
                <BankItem bank={"MANDIRI"} person="PT. Zenix Asia" />

                <View style={styles.boxContainer}>
                    <Text>Nomor Rekening</Text>
                    <TouchableOpacity style={styles.boxPayment} onPress={()=>copyToClipboard("1234567890")}>
                        <Text>1234567890</Text>
                        <Icon name="copy" size={24} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.boxContainer}>
                    <Text>Total Bayar</Text>
                    <TouchableOpacity style={styles.boxPayment} onPress={()=>copyToClipboard(formatIDR(car ? car.price : 0))}>
                        {isLoading ? <Text>Loading...</Text> : <Text>{formatIDR(car ? car.price : 0)}</Text>}
                        <Icon name="copy" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.paymentContainer}>
                <Text style={styles.priceValue}>Klik konfirmasi pembayaran untuk mempercepat proses pengecekan</Text>
                <Button
                    backgroundColor="green"
                    title="Konfirmasi Pembayaran"
                    onPress={() => navigation.navigate('ConfirmPayment', { id: id })}
                />
                <Button
                    backgroundColor="white"
                    titleColor="green"
                    title="Lihat Daftar Pesanan"
                    onPress={() => navigation.navigate('HomeTabs', { screen: 'ListOrder' })}
                />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        paddingBottom: 80, 
    },
    descriptionTitleText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        marginVertical: 10
    },
    descriptionText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        marginBottom: 10
    },
    promoContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#D0D0D0',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    promoTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
    },
    priceValue: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        color: 'black',
    },
    paymentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'white',
        gap: 10,
        backgroundColor: '#F5F5F5',
    },
    boxContainer:{
        marginBottom: 20,
    },
    boxPayment:{
        flexDirection:'row', 
        justifyContent:'space-between',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    }
});
