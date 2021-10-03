import React from 'react';
import { StyleSheet, View } from 'react-native';

function ListItemSeparator(props) {
    return (
        <View style={styles.container}></View>
    );
}

const styles = StyleSheet.create({
    container:{
        width:"80%",
        height:1,
        backgroundColor:"#e6e6e6",
        alignSelf:"center"
    }
})

export default ListItemSeparator;