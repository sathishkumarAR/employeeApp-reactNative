import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, StatusBar } from 'react-native';


import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import defaultStyles from '../config/defaultStyles';
import IconButton from '../components/IconButton';


function Home({navigation}) {

    const [employeeData, setEmployeeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        fetchData();
    },[])

    const fetchData=()=>{
        
        fetch("https://employee-app-node-server.herokuapp.com/",{
            method:"get"
        })
        .then(res=>res.json())
        .then(userData=>{
            setEmployeeData(userData);
            setLoading(false);
        })
        .catch(err=>{
            console.log(err);
        })
    }


    return (
        <Screen>
            <StatusBar 
                barStyle='light-content'
                // translucent={true}
                backgroundColor="#4b7dcc"
            />
            {
                <FlatList 
                    data={employeeData}
                    keyExtractor={(item)=>item._id}
                    renderItem={({item})=>(
                        <ListItem 
                            item={item}
                            onPress={()=>navigation.navigate("Profile", {item})}
                        />
                    )}
                    ItemSeparatorComponent={ListItemSeparator}
                    refreshing={loading}
                    onRefresh={()=>fetchData()}

                /> 
            }
            <IconButton 
                iconName="plus"
                color={defaultStyles.colors.primary}
                iconColor="white"
                onPress={()=>navigation.navigate("Create Employee")}
            />
        </Screen>
        
    );
}

const styles = StyleSheet.create({

})

export default Home;