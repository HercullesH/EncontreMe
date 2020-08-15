import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home'




const Stack = createStackNavigator();

export default function AppRoute(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{
            headerStyle:{
                backgroundColor: '#6200ee',
            },
            headerTintColor: '#FFF',
            headerTitle: 'Home'
        }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}