import React, { useState } from 'react';
import {StyleSheet, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform, ScrollView, Dimensions, Keyboard } from 'react-native';
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker"
import { useHeaderHeight } from '@react-navigation/elements';
import Constants from "expo-constants"

import Screen from '../components/Screen';
import TextInputCustom from '../components/TextInputCustom';
import ModalCustom from '../components/ModalCustom';
import AppText from '../components/AppText';
import IconComponent from '../components/IconComponent';
import defaultStyles from '../config/defaultStyles';
import FormImagePicker from '../components/FormImagePicker';
import AppButton from '../components/AppButton';


const validationSchema=Yup.object().shape({
    name:Yup.string().required().min(2).label("Name"),
    role:Yup.string().required().min(2).label("Role"),
    email:Yup.string().email("Please enter valid email address").required().label("Email"),
    mobile:Yup.number().required().typeError("Mobile number can contain only numbers").positive().test("digits","Mobile number must be exactly 10 digits",(value)=>String(value).length===10).label("Mobile number"),
    salary:Yup.number().typeError("Salary can contain only numbers").positive().required().label("Salary")
})



function CreateEmployee({route, navigation}) {
    const headerHeight = useHeaderHeight();
    
    const getDetails=(fieldName)=>{
        if(route.params){
            return route.params[fieldName]
        }
        else{
            return undefined;
        }
    }
    
    const [name, setName] = useState(getDetails("name"));
    const [role, setRole] = useState(getDetails("role"));
    const [email, setEmail] = useState(getDetails("email"));
    const [mobile, setMobile] = useState(getDetails("mobile"));
    const [salary, setSalary] = useState(getDetails("salary"));
    const [image, setImage] = useState(getDetails("image"));
    let [errors,setErrors]= useState({});
    
    const [modalVisible, setModalVisible] = useState(false);


    const openGallery= async ()=>{

        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if(granted){
            let imageData = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                aspect:[1,1],
                quality:0.5
            });

            if(!imageData.cancelled){

                let imageFile={ 
                    uri:imageData.uri,
                    type:`test/${imageData.uri.split(".")[1]}`,
                    name:`test.${imageData.uri.split(".")[1]}`
                }
                setModalVisible(false)
                handleUpload(imageFile);
            }
            
        }
        else{
            alert("You must give storage permission to upload image");
        }
    }

    const openCamera =async()=>{

        try {
            const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
            const storagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if(cameraPermission.granted && storagePermission.granted){
                const imageData = await ImagePicker.launchCameraAsync({
                    mediaTypes:ImagePicker.MediaTypeOptions.Images,
                    allowsEditing:true,
                    aspect:[1,1],
                    quality:0.5
                });
                console.log(imageData);
                
                if(!imageData.cancelled){

                    let imageFile={ 
                        uri:imageData.uri,
                        type:`image/${imageData.uri.split(".")[1]}`,
                        name:`image.${imageData.uri.split(".")[1]}` 
                    }
                    setModalVisible(false);
                    handleUpload(imageFile);
                }
            }else if(!cameraPermission.granted){
                Alert.alert("You must give camera permission to take picture");
            }
            else{
                Alert.alert("You must give storage permission to upload image")
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    const validateAll=async(userData)=>{
        
        const errorValidations={};
        var isValid=undefined;

        await validationSchema.validate(userData,{abortEarly:false})
            .then(value=>{
                // console.log("value:",value);
                isValid=true;
            })
            .catch(err=>{
                err.inner.forEach(e => {
                    errorValidations[e.path]=e.message;
                });
                isValid=false;
            })
            setErrors(errorValidations);
            console.log(userData);
            console.log(errorValidations);
            return isValid;
            
    }
    // const validateField=async(fieldName)=>{
    //     console.log("test",name);
    //     await validationSchema.validateAt(fieldName,name)
    //         .then(value=>{
    //             console.log(fieldname,value);
    //         })
    //         .catch(err=>{
    //             console.log(err);
    //         })

    // }

    function handleUpload(imageFile){

        const data = new FormData();
        data.append("file",imageFile);
        data.append("upload_preset", "employeeApp");
        data.append("cloud_name","wings06");

        return(
            fetch("https://api.cloudinary.com/v1_1/wings06/image/upload",{
                method:"post",
                body:data
            })
            .then(res=>res.json())
            .then(result=>{
                // console.log(result);
                setImage(result.secure_url);
            })
            .catch(err=>{
                console.log(err);
                Alert.alert("Error uploading the image. Please try again");
            }) 

        )
    }

    const updateEmployee=()=>{
        const userData={
            name,
            role,
            email,
            salary,
            mobile,
            image
        }

        validateAll(userData)
            .then(isValid=>{
                if(isValid){
                    fetch(`https://employee-app-node-server.herokuapp.com/updateEmployee`,{
                        method:'put',
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            id:route.params._id,
                            userData
                        })
                    })
                    .then(res=>res.json())
                    .then(result=>{
                        Alert.alert(name+"'s record updated successfully!");
                        navigation.navigate("Home");
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
            }
        )
        .catch(err=>{
            console.log(err);
        })
    }

    const submitEmployee=()=>{
        const userData={
            name,
            role,
            email,
            salary,
            mobile,
            image
        }

        validateAll(userData)
            .then(isValid=>{
                if(isValid){
                    fetch(`https://employee-app-node-server.herokuapp.com/addEmployee`,{
                        method:"post",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(userData)
                    })
                    .then(data=>{
                        Alert.alert(userData.name+"'s record is saved!");
                        navigation.navigate("Home");
                        
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            }
            
        })
        .catch(err=>{
            console.log(err);
        })
        
    } 

    return (
        <Screen style={styles.container}>
            
            <KeyboardAvoidingView enabled keyboardVerticalOffset = {headerHeight + Constants.statusBarHeight} style={styles.scrollViewContainer} behavior={Platform.OS==='ios'?"padding":""} >
                <ScrollView >
                    <FormImagePicker 
                        style={styles.image}
                        imageStyle={{borderRadius:80}}
                        onPress={()=>setModalVisible(true)}
                        imageURI={image!==undefined? image:defaultStyles.image.noProfilePicture}
                    />
                    
                    <TextInputCustom 
                        fieldName="name"
                        label="Name"
                        mode="outlined"
                        autoCorrect={false}
                        value={name}
                        onChangeText={(text)=>setName(text)}
                        errors={errors}
                        
                    />
                    <TextInputCustom 
                        fieldName="role"
                        label="Role"
                        mode="outlined"
                        autoCorrect={false}
                        value={role}
                        onChangeText={(text)=>setRole(text)}
                        errors={errors}
                        
                    />
                    <TextInputCustom 
                        fieldName="email"
                        label="Email"
                        mode="outlined"
                        autoCorrect={false}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                        errors={errors}
                        
                    />
                    <TextInputCustom 
                        fieldName="mobile"
                        label="Mobile"
                        mode="outlined"
                        keyboardType="numeric"
                        maxLength={10}
                        value={mobile && mobile.toString()}
                        onChangeText={(text)=>setMobile(text)}
                        errors={errors}
                    />
                    <TextInputCustom 
                        fieldName="salary"
                        label="Salary per annum (INR)"
                        mode="outlined"
                        keyboardType="numeric"
                        value={salary && salary.toString()}
                        onChangeText={(text)=>setSalary(text)}
                        errors={errors}
                        
                    />
                    
                    <AppButton title={route.params?"Update":"Save"} onPress={route.params?updateEmployee: submitEmployee} />

                    <ModalCustom
                        visible={modalVisible}
                        close={()=>setModalVisible(false)}
                        animationType="slide"
                        transparent={true}
                    >
                        
                        <View style={styles.modalContent}>
                            <AppText style={styles.modalHeader}> Photo </AppText>

                            <View style={styles.iconsContainer}>
                                <TouchableOpacity style={styles.icon}>
                                    <IconComponent 
                                        iconName="delete"
                                        iconColor="white"
                                        size={50}
                                        backgroundColor="tomato"
                                    />
                                    <AppText style={styles.modalText}>Remove Photo</AppText>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.icon} onPress={
                                    ()=> openGallery()
                                }>
                                    <IconComponent 
                                        iconName="image"
                                        iconColor="white"
                                        size={50}
                                        backgroundColor="#8b10a3"
                                    />
                                    <AppText style={styles.modalText}>Gallery</AppText>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.icon} onPress={()=>openCamera()}>
                                    <IconComponent 
                                        iconName="camera"
                                        iconColor="white"
                                        size={50}
                                        backgroundColor="#298c3e"
                                    />
                                    <AppText style={styles.modalText}>Camera</AppText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ModalCustom>
                </ScrollView>

            </KeyboardAvoidingView>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        padding:20,
    },
    image:{
        height:150,
        width:150,
        alignSelf:"center",
        marginTop:20,
        marginBottom:10,
    },
    modalContainer:{
        width:"100%",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex:1,
        justifyContent:"flex-end",
        
    },
    modalHeader:{
        fontSize:19,
        fontWeight:"bold",
        marginBottom:20
    },
    modalContent:{
        width:"100%",
        backgroundColor:"white",
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingHorizontal:20,
        paddingVertical:30,
        
    },
    iconsContainer:{
        flexDirection:"row",
        marginHorizontal:10,
        justifyContent:"space-between",
    },
    modalText:{
        fontSize:16,
        color:defaultStyles.colors.lightGrey,
        marginTop:5,
        textAlign:"center"
    },
    icon:{
        paddingHorizontal:10,
        alignItems:"center",
        width:"33%"
    },
    scrollViewContainer:{
        width:"100%",
        flex:1,
        position: 'absolute',
        top: 0,
        bottom:0,
    }
    
})

export default CreateEmployee;