import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import defaultStyles from '../config/defaultStyles';
import AppText from './AppText';

function AppButton({title, style, onPress}) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:defaultStyles.colors.primary,
        marginVertical:10,
        borderRadius:10,
        padding:15,
        alignItems:"center",
    },
    text:{
        color:"white",
        fontWeight:"bold"
    }
})

export default AppButton;