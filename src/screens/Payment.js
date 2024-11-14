import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import CarItem from '../components/CarItem';  
import axios from 'axios';
import BankItem from '../components/BankItem';
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetForm, selectForm, setForm } from '../redux/reducers/form';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';

function formatIDR(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

export default function Payment({ route, navigation }) {
    const { id } = route.params;
    const [state, setState] = useState(0);
    const [car, setCar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const formState = useSelector(selectForm); 

    const listBank = ['Mandiri', 'BCA', 'BNI'];

    const getCar = async () => {
        try {
            const res = await axios.get(`http://192.168.1.22:3000/api/v1/cars/${id}`);
            console.log("ini res res ",res.data.data)
            setCar(res.data.data);
        } catch (error) {
            console.error("Error fetching car data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (formState.id !== id) {
            console.log("Reset form", formState);
            dispatch(resetForm());
            dispatch(setForm({ id }));
        } else {
            console.log("Form state", formState);
        }
        getCar();
    }, [id, dispatch, formState.id]); 

    const handleBankSelect = (index) => {
        dispatch(setForm({ ...formState, bankType: listBank[index] }));
    };

    const handlePromoCodeChange = (text) => {
        dispatch(setForm({ ...formState, promoCode: text }));
    };

    const labels = ["1", "2", "3"];

    return (
        <View style={styles.container}>        
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/picture/back.png')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <StepIndicator
                currentPosition={state}
                labels={labels}
                onPress={(position) => setState(position)}
                stepCount={3}
            />
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
                        style={{ width:'70%',height: 40, paddingVertical: 0, fontFamily: 'Poppins-Regular', fontSize: 12, borderWidth: 1, borderRadius: 5, borderColor: '#D0D0D0', marginBottom: 10 }}
                    />
                    <TouchableOpacity 
                        disabled={!formState.promoCode} 
                        style={{ width: '30%', height: 40, backgroundColor: "green", alignContent: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: !formState.promoCode ? '#D0D0D0' : 'green' }}
                    >
                        <Text style={{textAlign:'center',fontFamily:'Poppins-Bold',fontSize:12,color:"white"}}>Terapkan</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.paymentContainer}>
                <Text style={styles.priceValue}>{formatIDR(car?car.price:0)}</Text>
                <Button 
                    disabled={!formState.bankType}
                    backgroundColor={!formState.bankType ? '#D0D0D0' : 'green'}
                    title="Lanjut Pembayaran" 
                    onPress={() => navigation.navigate('Payment',{id:car.id})}
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
});
