import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import defaultStyles from '../config/defaultStyles';
import AddImageButton from './AddImageButton';

function FormImagePicker({style,imageStyle,imageURI,onPress}) {
    return (
        <ImageBackground
                    style={style} 
                    imageStyle={imageStyle}
                    source={{uri:imageURI}}>

                    <AddImageButton
                        onPress={onPress}
                    />

        </ImageBackground>
    );
}

export default FormImagePicker;