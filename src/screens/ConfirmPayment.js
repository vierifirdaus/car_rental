import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import Button from '../components/Button';
import CountDown from 'react-native-countdown-fixed';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/reducers/user';
export default function ConfirmPayment({ route, navigation }) {
    const { id } = route.params;

    const [imageUri, setImageUri] = useState(null);

    const user = useSelector(selectUser);

    const chooseImage = async () => {
        await launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets) {
                setImageUri(response.assets[0].uri);
                console.log(imageUri);
            }
        });
    };

    const openCamera = async () => {
        await launchCamera({ mediaType: 'photo',saveToPhotos:true }, (response) => {
            if (response.assets) {
                setImageUri(response.assets[0].uri);
                console.log(imageUri);
            }
        });
    };


    const handleUpload = async () => {
        if (!imageUri) {
            alert('Pilih gambar terlebih dahulu!');
            return;
        }

        try {
            // Membuat FormData untuk mengirim file
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                name: imageUri.split('/').pop(), // Nama file dari URI
                type: 'image/jpeg', // Sesuaikan dengan tipe file Anda
            });

            console.log('Uploading image:', imageUri);

            // Kirim POST request untuk upload file
            const uploadResponse = await axios.post(
                'http://192.168.0.5:3000/api/v1/upload/local',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Upload response:', uploadResponse.data);
            console.log('user token:', user.token);

            // Setelah upload berhasil, kirim PUT request untuk update data
            const putResponse = await axios.put(
                `http://192.168.0.5:3000/api/v1/order/${id}/payment`,
                {}, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );


            console.log('PUT response:', putResponse.data);

            // Navigasi ke halaman lain setelah PUT berhasil
            navigation.navigate('Ticket', { id });
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);

            // Tampilkan error ke pengguna
            alert('Terjadi kesalahan saat mengunggah atau memperbarui pembayaran.');
        }
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/picture/back.png')} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            <ScrollView>
                
                <Text style={styles.descriptionTitleText}>Konfirmasi Pembayaran s s</Text>
                <Text style={styles.descriptionTitleText}>Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan konfirmasi.</Text>
                <CountDown
                    key={10*60} 
                    digitStyle={{backgroundColor:'red'}}
                    digitTxtStyle={{color:'white'}}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    until={10*60}
                    onFinish={() => alert('Waktu pembayaran habis')}
                    size={15}
                />
                <Text style={styles.descriptionTitleText}>Upload Bukti Pembayaran</Text>
                <Text style={styles.descriptionTitleText}>Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa upload bukti bayarmu</Text>

                <View style={styles.buttonContainer}>
                    <Button title="Pilih Gambar" onPress={chooseImage} />
                    <Button title="Buka Kamera" onPress={openCamera} />
                </View>
                {imageUri && (
                    <View>
                        <Image
                            style={{
                                width: '80%',
                                height: '80%',
                                resizeMode: 'contain',
                            }}
                            source={{ uri: imageUri }} 
                        />
                    </View>
                )}
            </ScrollView>

            <View style={styles.paymentContainer}>
                <Button 
                    backgroundColor={'green'}
                    title="Upload" 
                    onPress={handleUpload}
                />
                <Button 
                    backgroundColor='white'
                    titleColor='green'
                    title="Lihat Daftar Pesanan" 
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
        marginVertical: 10,
        textAlign:'center'
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
