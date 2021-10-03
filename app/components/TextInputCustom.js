import React from 'react';
import { useFormikContext } from 'formik';
import { StyleSheet, View } from 'react-native';
import { TextInput } from "react-native-paper";

import AppText from './AppText';
import ErrorValidation from './ErrorValidation';
import defaultStyles from '../config/defaultStyles';

function TextInputCustom({fieldName,onChangeText,label,value,onBlur,errors,...otherProps}) {


    return (
        <View style={styles.container}>
            <TextInput 
                label={label}
                onChangeText={onChangeText}              
                onBlur={onBlur}
                value={value}
                theme={{colors:{primary:defaultStyles.colors.primary}}}
                {...otherProps}
            />
            {errors[fieldName] && <ErrorValidation >{errors[fieldName]}</ErrorValidation>}
            
           

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        width:"100%"
    }
})

export default TextInputCustom;