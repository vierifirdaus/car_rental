import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

export default function BankItem({
    bank,
    clicked = false,
    onPress,
    person=""
}) {

    return (
        <TouchableOpacity style={styles.bankContainer} onPress={onPress}>
            <View style={styles.boxBank}>
                <View style={styles.containerBankName}>
                    <Text style={styles.bankName}>{bank}</Text>
                </View>
                <View>
                    {
                        person=="" ? 
                            (
                                <Text style={styles.bankTransferText}> {bank + " Transfer"}</Text>
                            ):
                            (
                                <>
                                    <Text style={styles.bankTransferText}> {bank + " Transfer"}</Text>
                                    <Text style={styles.bankTransferText}> {person}</Text>
                                </>
                            )
                    }
                
                </View>
            </View>
            {
                clicked ?
                    <Icon name="check" size={24} color="green" />
                    :
                    <Text></Text>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    bankContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#D0D0D0'
    },
    boxBank: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerBankName: {
        paddingHorizontal: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#D0D0D0',
        height: 40,
        width: 70,
        justifyContent: 'center',
        marginRight: 5
    },
    bankName: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        textAlign: 'center'
    },
    bankTransferText: {
        fontSize: 14,
        fontFamily: 'Poppins-Regular'
    }
});
