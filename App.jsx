import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, configureFonts, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Provider, useSelector } from 'react-redux';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import List from './src/screens/List';
import CarDetail from './src/screens/CarDetail';
import Profil from './src/screens/Profil';
import Payment from './src/screens/Payment';
import { persistor, store } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import Billing from './src/screens/Billing';
import ConfirmPayment from './src/screens/ConfirmPayment';
import ListOrder from './src/screens/ListOrder';
import Ticket from './src/screens/Ticket';
import { selectUser } from './src/redux/reducers/user';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function Tabs() {
  const user = useSelector(selectUser);
  return (
    <Tab.Navigator>
      <Tab.Screen 
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={25} color={focused ? "#A43333" : "#000000"} />
          ),
        })}
        name="Home"
        component={Home}
      />
      <Tab.Screen 
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="list" size={25} color={focused ? "#A43333" : "#000000"} />
          ),
        })}
        name="List"
        component={List}
      />
      {
        user.token && (
          <Tab.Screen 
            options={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <Icon name="shopping-cart" size={25} color={focused ? "#A43333" : "#000000"} />
              ),
            })}
            name="ListOrder"
            component={ListOrder}
          />
        )
      }
      
      <Tab.Screen 
        options={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon name="user" size={25} color={focused ? "#A43333" : "#000000"} />
          ),
        })}
        name="Profil"
        component={Profil}
      />
      
    </Tab.Navigator>
  );
}


// Main App Component
export default function App() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator/>} persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="HomeTabs" 
                component={Tabs} 
              />
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="Login" 
                component={Login} 
              />
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="Register" 
                component={Register} 
              />
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="Home" 
                component={Home} 
              />
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="CarDetail" 
                component={CarDetail} 
              />
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="Payment" 
                component={Payment} 
              />
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="Billing" 
                component={Billing} 
              />
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="ConfirmPayment" 
                component={ConfirmPayment} 
              />
              <Stack.Screen
                options={{
                  headerShown:false
                }} 
                name="Ticket" 
                component={Ticket} 
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
}
