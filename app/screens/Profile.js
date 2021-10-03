import React from 'react';
import { Image, StyleSheet, View, Linking, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title } from 'react-native-paper';

import AppText from '../components/AppText';
import Screen from '../components/Screen';
import defaultStyles from '../config/defaultStyles';
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import IconComponent from '../components/IconComponent';

function Profile({route, navigation}) {
    const {_id, name, role, salary, email, mobile, image}=route.params.item;
    const deleteEmployee=()=>{
        fetch(`https://employee-app-node-server.herokuapp.com/removeEmployee?id=${_id}`,{
            method:"delete",
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            Alert.alert(`${name}'s profile is deleted permanently`)
            navigation.navigate("Home");
        })
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <Screen style={styles.screen}>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="#7ba8e3"
            />
            
            <LinearGradient colors={['#7ba8e3','#f5f5f7']} style={styles.container}>
                <View style={{alignItems:"center"}}>
                    <Image 
                        style={styles.image}
                        source={{uri:image}}
                    />
                    <View style={styles.userInfo}>
                        <Title style={{color:"black"}}>{name}</Title>
                        <AppText style={styles.subtitle}>{role}</AppText>
                    </View>

                </View>
            </LinearGradient>
            
            <View style={styles.detailsContainer}>
                
                <TouchableOpacity style={styles.flatItem} onPress={()=>Linking.openURL("mailto:"+email)}>
                    <MaterialCommunityIcons 
                        name="email"
                        color={defaultStyles.colors.primary}
                        size={30}
                    />
                    <View  style={{marginLeft:20}}>
                        <AppText style={styles.subtitle}>Email</AppText>
                        <AppText>{email}</AppText>
                    </View>
                </TouchableOpacity>

                <View style={[styles.flatItem,{justifyContent:"space-between"}]}>
                    <View style={styles.mobileInfo}>
                        <MaterialCommunityIcons 
                            name="cellphone"
                            color={defaultStyles.colors.primary}
                            size={30}
                        />
                        <View  style={{marginLeft:20}}>
                            <AppText style={styles.subtitle}>Mobile</AppText>
                            <AppText>{mobile}</AppText>
                        </View>

                    </View>

                    <View style={styles.mobileActions}>
                        <IconComponent 
                            iconName="phone"
                            iconColor="#6b6b6b"
                            backgroundColor="#e6e6e6"
                            size={30}
                            onPress={()=>Linking.openURL("tel:"+mobile)}
                        />
                        <IconComponent 
                            iconName="message"
                            iconColor="#6b6b6b"
                            backgroundColor="#e6e6e6"
                            size={30}
                            onPress={()=>Linking.openURL("sms:"+mobile)}
                        />
                    </View>
                </View>

                <View style={styles.flatItem}>
                    <MaterialIcons 
                        name="attach-money"
                        color={defaultStyles.colors.primary}
                        size={30}
                    />
                    <View  style={{marginLeft:20}}>
                        <AppText style={styles.subtitle}>Salary</AppText>
                        <AppText>{salary} INR</AppText>
                    </View>
                </View>

                <View style={styles.actions}>

                    <TouchableOpacity style={styles.icon} onPress={()=>navigation.navigate("Create Employee",route.params.item)}>
                        <IconComponent 
                            iconName="account-edit"
                            iconColor="white"
                            backgroundColor="#73ced1"
                            size={45}
                        />
                        <AppText style={styles.iconText}>Edit</AppText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.icon} onPress={deleteEmployee} >
                        <IconComponent 
                            iconName="location-exit"
                            iconColor="white"
                            backgroundColor="#eb6365"
                            size={45}
                        />
                        <AppText style={styles.iconText}>Remove</AppText>
                    </TouchableOpacity>
                    
                </View>
            </View>

            
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen:{
        paddingTop:0,
        backgroundColor:"#8585cc",
    },
    container:{
        justifyContent:"center",
        alignItems:"center",
        paddingTop:30,
        textAlign:"center",
        // backgroundColor:"#e6e6fa",
        height:"50%"
    },
    userInfo:{
        alignItems:"center",
        margin:10
    },
    subtitle:{
        color:"#6e6e6e",
        fontSize:15,
        // color:"white"
        // color:"#f0f0f0"
    },
    image:{
        height:150,
        width:150,
        borderRadius:100,
    },
    detailsContainer:{
        backgroundColor:"white",
        width:"100%",
        padding:30,
        position:"absolute",
        bottom:0,
        height:"55%",
        borderTopRightRadius:25,
        borderTopLeftRadius:25,
        elevation:50,
        marginTop:10
        
    },
    flatItem:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:20,
        width:"100%"
        
    },
    actions:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        padding:20

    },
    icon:{
        width:"50%",
        textAlign:"center",
        alignItems:"center",
        paddingHorizontal:10
    },
    iconText:{
        fontSize:16,
        color:"#6e6e6e",
        marginTop:5,
        textAlign:"center"
    },
    mobileInfo:{
        flexDirection:"row",

    },
    mobileActions:{
        flexDirection:"row",
        alignSelf:"center",
        width:"30%",
        justifyContent:"space-between",
        marginLeft:10
    }
})

export default Profile;