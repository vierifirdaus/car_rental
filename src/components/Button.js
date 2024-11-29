import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

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
            backgroundColor: backgroundColor, 
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
        <TouchableOpacity 
            onPress={onPress}
            style={styles.button}>
                <Text style={styles.buttonTitle}>{title}</Text>
        </TouchableOpacity>
    );
}
