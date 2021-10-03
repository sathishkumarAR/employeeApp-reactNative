import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

function IconComponent({iconName, iconColor="white", backgroundColor="black", size=40, onPress}) {
    return (
        <View style={{
            backgroundColor:backgroundColor,
            width:size,
            height:size,
            borderRadius:size/2,
            justifyContent:"center",
            alignItems:"center"
        }}>
            <MaterialCommunityIcons 
                name={iconName}
                size={size/2}
                color={iconColor}
                onPress={onPress}
            />
        </View>
    );
}

export default IconComponent;