import { Text, View, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';

export default function Profil({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Akun</Text>
            <View style={styles.detailContainer}>
                <Image source={require('../assets/picture/park.png')} />
                <Text style={styles.detailText}>
                    Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah
                </Text>
                <Button 
                    title="Registration" 
                    onPress={() => navigation.navigate('Register')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    detailContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        gap: 15,
    },
    detailText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 14,
        textAlign: 'center',
    }
});
