import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'




const Stack = createStackNavigator();

export default function AuthRoute(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}} />
                <Stack.Screen name="SignUp" component={SignUp} options={{
            headerStyle:{
                backgroundColor: '#FFF',
            },
            headerTintColor: '#6200ee',
            headerTitle: 'Cadastro'
        }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}