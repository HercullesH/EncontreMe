import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Colors } from 'react-native-paper';

import Home from '../pages/Home'
import PatientNew from '../pages/PatientNew';




const Stack = createStackNavigator();

export default function AppRoute(){

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{
                headerShown: false,
                headerStyle:{
                    backgroundColor: '#6200ee',
                },
                headerTintColor: '#FFF',
                headerTitle: 'Pacientes'
                }}/>

                <Stack.Screen name="PatientNew" component={PatientNew} options={{
                    headerStyle:{
                        backgroundColor: '#6200ee',
                    },
                    headerTintColor: '#FFF',
                    headerTitle: 'Cadastro de paciente'
                    }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}