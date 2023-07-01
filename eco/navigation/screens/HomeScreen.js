import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';

export default function HomeScreen({ navigation }) {
    
    const [currentUser,setCurrentUser] = useState(null)

    useEffect(() => {
        getUser()
    },[])

    const getUser = async () => {
        const user = await AsyncStorage.getItem("currentUser")
        setCurrentUser(user)
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {currentUser 
            
            ? 
            
            <Text onPress={() => alert('This is the "Home" screen.')} style={{ fontSize: 26, fontWeight: 'bold' }}>User Found</Text> 
            
            : 
            
            <Signup/>
                
            }
            
        </View>
    );
}
