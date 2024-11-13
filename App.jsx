import * as React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureFonts, MD3LightTheme, PaperProvider } from 'react-native-paper';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import List from './src/screens/List';
import CarDetail from './src/screens/CarDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs(){
  return (
    <Tab.Navigator>
      <Tab.Screen 
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={"home"} size={25} color="#A43333" />
        }} 
        name="Home" 
        component={Home} 
      />
      <Tab.Screen 
        options={{
          headerShown: false,
          tabBarIcon: () => <Icon name={"list"} size={25} color="#A43333" />
        }} 
        name="List" 
        component={List} 
      />
      <Tab.Screen 
        options={{
          title: 'Akun',
          tabBarIcon: () => <Icon name={"user"} size={25} color="#A43333" />
        }} 
        name="Profile" 
        component={Home} 
      />
    </Tab.Navigator>
  )
}


// Main App Component
export default function App() {
    return (
        <PaperProvider>
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
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
