import React from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from '../config/defaultStyles';

function AddImageButton({ onPress }) {
    return (
        <TouchableWithoutFeedback 
            
            // underlayColor={defaultStyles.colors.light}
            onPress={onPress}
        >
        <View style={styles.iconContainer} >

            <MaterialCommunityIcons 
                name ="camera-plus" 
                size={20} 
                color="white"
            />
        </View>

        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    iconContainer:{
        position:"relative",
        left:100,
        top:107,
        backgroundColor:defaultStyles.colors.primary,
        borderRadius:30,
        borderWidth:2,
        borderColor:"white",
        width:40,
        height:40,
        alignItems:"center",
        justifyContent:"center"
    }
})

export default AddImageButton;