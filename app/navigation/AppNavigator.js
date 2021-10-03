import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import CreateEmployee from '../screens/CreateEmployee';


const Stack = createNativeStackNavigator();


function AppNavigator(props) {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{
                headerStyle:{
                    backgroundColor:"#4b7dcc"
                },
                headerTintColor:"white",
                animation:"slide_from_left"
            }} />
            <Stack.Screen name="Profile" component={Profile} 
                options={{
                    headerShown:false,
                    animation:"slide_from_right"
                }}
            />
            <Stack.Screen name="Create Employee" component={CreateEmployee} />
        </Stack.Navigator>
        
    );
}


export default AppNavigator;