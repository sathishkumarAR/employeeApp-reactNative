import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from "expo-constants"

function Screen({children, style}) {
    return (
        <SafeAreaView 
            style={[styles.container, style]}
        >
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        paddingTop:Constants.statusBarHeight,
        flex:1
    }
})

export default Screen;