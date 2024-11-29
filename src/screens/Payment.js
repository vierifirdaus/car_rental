import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import CarItem from '../components/CarItem';  
import axios from 'axios';
import BankItem from '../components/BankItem';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm, selectForm, setForm } from '../redux/reducers/form';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { selectUser } from '../redux/reducers/user';
import ModalPopup from '../components/ModalPopup';

function formatIDR(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

export default function Payment({ route, navigation }) {
    const { id } = route.params;
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();
    const formState = useSelector(selectForm); 
    const user = useSelector(selectUser);

    const listBank = ['Mandiri', 'BCA', 'BNI'];

    const fetchCar = async () => {
        try {
            const res = await axios.get(`http://192.168.0.5:3000/api/v1/cars/${id}`);
            setCar(res.data.data);
        } catch (error) {
            console.error("Error fetching car data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const paymentProcess = async () => {
        setIsSubmitting(true);
        const startDate = new Date(); 
        const endDate = new Date(startDate); 
        endDate.setDate(endDate.getDate() + 1);

        const formData = { 
            car_id: car.id,
            start_time: startDate.toISOString(),
            end_time: endDate.toISOString(), 
            is_driver: false,
            promo: formState.promoCode,
            payment_method: formState.bankType ? formState.bankType : null,
        };

        try {
            const res = await axios.post(
                "http://192.168.0.5:3000/api/v1/order",
                JSON.stringify(formData),
                {
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (res?.data?.data?.id) {
                setModalVisible(true);
                setErrorMessage(null);

                setTimeout(() => {
                    setModalVisible(false);
                    navigation.navigate('Billing', { id: res.data.data.id });
                }, 1000);
            } else {
                setModalVisible(true);
                setErrorMessage("Invalid response data.");

                setTimeout(() => {
                    setModalVisible(false);
                }, 2000);
            }
        } catch (e) {
            setModalVisible(true);
            setErrorMessage(e.response?.data?.message || 'Kode salah atau sudah tidak berlaku');

            setTimeout(() => {
                setModalVisible(false);
            }, 2000);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (formState.id !== id) {
            if (formState.id) {
                dispatch(resetForm());
            }
            dispatch(setForm({ id }));
        }
    }, [id, dispatch]);

    useEffect(() => {
        fetchCar();
    }, [id]);

    const handleBankSelect = (index) => {
        dispatch(setForm({ ...formState, bankType: listBank[index] }));
    };

    const handlePromoCodeChange = (text) => {
        dispatch(setForm({ ...formState, promoCode: text }));
    };

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <View style={{flexDirection:"row", gap:5}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/picture/back.png')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <Text style={styles.headingTitle}>Pembayaran</Text>
                </View>
                <ProgressSteps>
                    <ProgressStep label="Pilih Metode">
                        <View style={{ alignItems: 'center' }}>
                            <Text>This is the content within step 1!</Text>
                        </View>
                    </ProgressStep>
                    <ProgressStep label="Bayar">
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
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    car && (
                        <CarItem
                            car={car}
                            marginHorizontal={0}
                        />
                    )
                )}
                <Text style={styles.descriptionTitleText}>Pilih Bank Transfer</Text>
                <Text style={styles.descriptionText}>Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau Mobile Banking</Text>
                {listBank.map((bank, index) => (
                    <BankItem
                        key={index}
                        bank={bank}
                        clicked={formState.bankType === bank}
                        onPress={() => handleBankSelect(index)}
                    />
                ))}
                <View style={styles.promoContainer}>
                    <Text style={styles.promoTitle}><Icon name="percent" size={24} color="black" /> Pakai kode promo</Text>
                    <View style={{ flexDirection: 'row', }}>
                        <TextInput
                            placeholder="Tulis catatanmu di sini"
                            value={formState.promoCode || ''} 
                            onChangeText={handlePromoCodeChange}
                            style={{ width:'70%', height: 40, paddingVertical: 0, fontFamily: 'Poppins-Regular', fontSize: 12, borderWidth: 1, borderRadius: 5, borderColor: '#D0D0D0', marginBottom: 10 }}
                        />
                        <TouchableOpacity 
                            disabled={!formState.promoCode} 
                            style={{ width: '30%', height: 40, backgroundColor: "green", alignContent: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: !formState.promoCode ? '#D0D0D0' : 'green' }}
                        >
                            <Text style={{textAlign:'center', fontFamily:'Poppins-Bold', fontSize:12, color:"white"}}>Terapkan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            {/* Modal for Success or Error */}
            <ModalPopup visible={modalVisible}>
                <View style={styles.modalBackground}>
                    {errorMessage ? (
                        <>
                            <Icon name="x-circle" size={32} color="red" />
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        </>
                    ) : (
                        <>
                            <Icon name="check-circle" size={32} color="green" />
                            <Text style={styles.successMessage}>Berhasil Order</Text>
                        </>
                    )}
                </View>
            </ModalPopup>
            <View style={styles.paymentContainer}>
                <Text style={styles.priceValue}>{formatIDR(car ? car.price : 0)}</Text>
                <Button
                    disabled={!formState.bankType || isSubmitting}
                    backgroundColor={!formState.bankType || isSubmitting ? '#D0D0D0' : 'green'}
                    title={isSubmitting ? "Processing..." : "Lanjut Pembayaran"}
                    onPress={paymentProcess}
                >
                    {isSubmitting && <ActivityIndicator size="small" color="white" />}
                </Button>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    headingTitle:{
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        textAlign:'center',
    }, 
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
        marginBottom: 10,
    },
    paymentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'white',
        backgroundColor: '#F5F5F5',
    },
    buttonLoading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalBackground: {
        width: '90%',
        backgroundColor: '#fff',
        elevation: 20,
        borderRadius: 4,
        padding: 20,
        alignItems: 'center',
    },
});
