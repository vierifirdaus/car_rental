import * as React from 'react';
import { Button, Text, View } from 'react-native';

export default function SplashScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is splashscreen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('home')}
            />
        </View>
    );
}
