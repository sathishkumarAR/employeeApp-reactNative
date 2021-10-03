import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import defaultStyles from '../config/defaultStyles';

function IconButton({iconName, color, iconColor, onPress }) {
    return (
        <TouchableOpacity style={[styles.container, {backgroundColor:color}]} onPress={onPress}>
                <MaterialCommunityIcons style={styles.icon} name={iconName} size={35} color={iconColor} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:defaultStyles.colors.primary,
        width: 55,
        height:55,
        borderRadius:30,
        justifyContent:"center",
        alignItems:"center",
        position:"absolute",
        margin: 16,
        right: 10,
        bottom: 10,
    }
})

export default IconButton;