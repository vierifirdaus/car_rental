import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {useDispatch, useSelector} from 'react-redux';
import Pdf from 'react-native-pdf';
import Icon from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import {selectUser} from '../redux/reducers/user';
import Button from '../components/Button';

export default function Ticket({route, navigation}) {
  const {id} = route.params;
  const [car, setCar] = useState(null);
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPdfLoading, setIsPdfLoading] = useState(true);
  const user = useSelector(selectUser);

  const downloadInvoice = async () => {
    const invoiceUrl = `http://192.168.0.5:3000/api/v1/order/${id}/invoice`;
    try {
      const response = await axios.get(invoiceUrl, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log('Downloaded invoice:', response);
      ToastAndroid.showWithGravity(
        'Invoice berhasil diunduh',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    } catch (error) {
      console.error('Error downloading invoice:', error);
      ToastAndroid.showWithGravity(
        'Gagal mendownload invoice',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    }
  };

  const fetchOrderData = async () => {
    try {
      const res = await axios.get(`http://192.168.0.5:3000/api/v1/order/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrder(res.data.data);

      const resCar = await axios.get(
        `http://192.168.0.5:3000/api/v1/cars/${res.data.data.car_id}`,
      );
      setCar(resCar.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      ToastAndroid.showWithGravity(
        'Gagal memuat data order',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrderData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/picture/back.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.headingTitle}>Ticket</Text>
            <Text style={styles.headingTitle}>
              Order ID: {order ? order.order_no : 'Memuat...'}
            </Text>
          </View>
        </View>
        {/* <ProgressSteps activeStep={2}>
          <ProgressStep label="Pilih Metode">
            <View style={{alignItems: 'center'}}>
              <Text>Konten Langkah 1</Text>
            </View>
          </ProgressStep>
          <ProgressStep label="Bayar">
            <View style={{alignItems: 'center'}}>
              <Text>Konten Langkah 2</Text>
            </View>
          </ProgressStep>
          <ProgressStep label="Tiket" previousBtnText={''} finishBtnText={''}>
            <View style={{alignItems: 'center'}}></View>
          </ProgressStep>
        </ProgressSteps> */}
      </View>
      <ScrollView>
        <View style={styles.boxContainer}>
          <Text>Invoice</Text>
          <TouchableOpacity
            style={styles.boxPayment}
            onPress={downloadInvoice}>
            <Text>{order ? order.order_no : 'Memuat...'}</Text>
            <Icon name="download" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
          <Text>E-Tiket</Text>
          {isPdfLoading && <ActivityIndicator size="large" color="#0000ff" />}
          <Pdf
            trustAllCerts={false}
            source={{
              uri: `http://192.168.0.5:3000/api/v1/order/${id}/invoice`,
              cache: true,
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
              setIsPdfLoading(false);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={(error) => {
              console.error('Error loading PDF:', error);
              setIsPdfLoading(false);
              ToastAndroid.showWithGravity(
                'Gagal memuat PDF',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
              );
            }}
            style={styles.pdf}
          />
        </View>
      </ScrollView>

      <View style={styles.paymentContainer}>
        <Button
          backgroundColor="white"
          titleColor="green"
          title="Lihat Daftar Pesanan"
          onPress={() => navigation.navigate('HomeTabs', {screen: 'ListOrder'})}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headingTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  orderId: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  boxContainer: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  boxPayment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  pdfContainer: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pdf: {
    height: 500,
    width: '100%',
  },
  paymentContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#34A853',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
