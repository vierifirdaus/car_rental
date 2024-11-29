import {useCallback} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import CarItem from '../components/CarItem';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import {selectUser} from '../redux/reducers/user';
import {useDispatch, useSelector} from 'react-redux';
import {getCars, selectCars} from '../redux/reducers/cars';
import {getProfile} from '../redux/reducers/user';
import GeoLoc from '../components/GeoLocation';

export default function Home({navigation}) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cars = useSelector(selectCars);

  const fetchCars = async () => {
    await dispatch(
      getCars({
        page: 1,
      }),
    );
  };

  const fetchUser = async () => {
    await dispatch(getProfile(user.token));
  };

  useFocusEffect(
    useCallback(() => {
      fetchCars();
      // fetchUser();
      // fetchLocation();
    }, []),
  );
  const buttonItems = [
    {type: 'Sewa', icon: 'truck'},
    {type: 'Oleh-Oleh', icon: 'box'},
    {type: 'Penginapan', icon: 'key'},
    {type: 'Wisata', icon: 'camera'},
  ];

  return (
    <SafeAreaView>
      <FlatList
        style={styles.container}
        data={cars.cars}
        ListHeaderComponent={
          <>
            {/* Header Section */}
            <View style={styles.header}>
              <View>
                <Text style={styles.greeting}>
                  Hi, {user.data ? user.data.fullname : 'Guest'}
                </Text>
                <GeoLoc/>
              </View>
              <Image
                style={styles.profileImage}
                source={require('../assets/picture/Profile.png')}
              />
            </View>

            {/* Banner Section */}
            <View style={styles.banner}>
              <View style={styles.bannerText}>
                <Text style={styles.bannerTitle}>
                  Sewa Mobil Berkualitas di kawasanmu
                </Text>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Sewa Mobil</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.bannerImage}
                  source={require('../assets/picture/zenix.png')}
                />
              </View>
            </View>

            {/* Category Icons */}
            <View style={styles.categoryContainer}>
              {buttonItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.category}>
                  <View style={styles.iconWrapper}>
                    <Icon name={item.icon} size={20} color="white" />
                  </View>
                  <Text style={styles.categoryText}>{item.type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        }
        renderItem={({item, index}) => (
          <CarItem
            key={index}
            car={item}
            onPress={() => navigation.navigate('CarDetail', {id: item.id})}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}
// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
    backgroundColor: '#A43333',
  },
  greeting: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  location: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#AF392F',
    paddingLeft: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: -50,
    marginBottom: 20,
    borderRadius: 10,
  },
  bannerText: {
    width: '40%',
    justifyContent: 'center',
  },
  bannerTitle: {
    fontFamily: 'Poppins-Regular',
    color: '#FFFFFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 14,
  },
  imageContainer: {
    justifyContent: 'center',
    marginBottom: -10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  carList: {
    marginHorizontal: 20,
  },
  category: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: '#A43333',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});
