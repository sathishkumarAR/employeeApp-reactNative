import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import defaultStyles from '../config/defaultStyles';
import AppText from './AppText';

function ListItem({item, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
                <View>
                    <Image 
                        style={styles.image}
                        source={{uri:item.image}} 
                    />
                </View>
                <View style={styles.text}>
                    <AppText>{item.name}</AppText>
                    <AppText style={styles.roleText}>{item.role}</AppText>
                </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        margin:10,
        padding:6,
        alignItems:"center"
    },
    image:{
        width:60,
        height:60,
        borderRadius:30
    },
    text:{
        marginLeft:10
    },
    roleText:{
        color:defaultStyles.colors.lightGrey,
        fontSize:16

    }
})

export default ListItem;