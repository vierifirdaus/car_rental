import { Text, View, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, resetState as logout, selectUser } from '../redux/reducers/user';
import { useCallback, useEffect } from 'react';
import Button from '../components/Button';
import { useFocusEffect } from '@react-navigation/native';

export default function Profil({ navigation }) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const fetchUser = async () => {
        if(!user.data && user.token){
            dispatch(getProfile(user.token));
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUser();
        }, []),
    );

    return (
        <View style={styles.container}>
            {!user.data ? (
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Akun</Text>
                    <View style={styles.detailContainer}>
                        <Image
                            source={require('../assets/picture/park.png')}
                        />
                        <Text style={styles.detailText}>
                            Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah.
                        </Text>
                        <Button
                            title="Registrasi"
                            onPress={() => navigation.navigate('Register')}
                            titleColor="#FFFFFF"
                            backgroundColor="#007BFF"
                            style={styles.button}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.content}>
                    <Image
                        source={user.data?.avatar ? { uri: user.data.avatar } : require('../assets/picture/Profile.png')}
                        style={styles.profileImage}
                    />
                    <Text style={styles.sectionTitle}>Halo, {user.data?.fullname}</Text>
                    <Button
                        title="Logout"
                        onPress={() => dispatch(logout())}
                        titleColor="#FF0000"
                        backgroundColor="#FFFFFF"
                        style={styles.logoutButton}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
        paddingTop: 15,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-Bold',
        color: '#333333',
        marginBottom: 10,
    },
    detailContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 15,
    },
    detailText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 15,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 50,
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    logoutButton: {
        marginTop: 20,
        borderColor: '#FF0000',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
});
