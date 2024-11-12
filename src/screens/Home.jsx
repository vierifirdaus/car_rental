import * as React from 'react';
import { Button, Text, View } from 'react-native';

// Home Screen Component
export default function Home({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen newwssss</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('login')}
            />
        </View>
    );
}
