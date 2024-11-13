import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function Button({
    backgroundColor = "green",
    title = "Sign In",
    titleColor = "white",
    onPress,
}) {
    const styles = StyleSheet.create({
        button: {
            padding: 10,
            alignItems: 'center',
            backgroundColor: backgroundColor, // set background color here
            borderRadius: 5
        },
        buttonTitle: {
            textAlign: 'center',
            fontFamily: 'Poppins-Bold',
            fontSize: 14,
            color:titleColor
        }
    });

    return (
        <Pressable 
            onPress={onPress}
            style={styles.button}>
                <Text style={styles.buttonTitle}>{title}</Text>
        </Pressable>
    );
}
