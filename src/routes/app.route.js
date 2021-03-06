import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IconButton, Colors } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../pages/Home'
import Patient from '../pages/Patient';
import Camera from '../pages/Camera'
import Profile from '../pages/Profile'



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const icons = {
    Home: {
      name: 'ios-home'
    },
    Perfil:{
      name: 'md-person'
    }
  };

function Tabs(){
    return(
        <Tab.Navigator
        screenOptions={ ({route}) => ({
          tabBarIcon: ({ color, size}) => {
            const { name } = icons[route.name];
            return <Icon name={name} color={color} size={size} />
          } 
        }) }
        tabBarOptions={{
          style:{
            backgroundColor: '#FFF'
          },
          activeTintColor: '#6200ee',
        }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Perfil" component={Profile} />
        </Tab.Navigator>
    );
  }
export default function AppRoute(){

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Tabs} options={{
                headerShown: false,
                headerStyle:{
                    backgroundColor: '#6200ee',
                },
                headerTintColor: '#FFF',
                headerTitle: 'Pacientes'
                }}/>

                <Stack.Screen name="PatientNew" component={Patient} options={{
                    headerStyle:{
                        backgroundColor: '#FFF',
                    },
                    headerTintColor: '#6200ee',
                    headerTitle: 'Cadastro de paciente'
                    }}/>
                <Stack.Screen name="PatientEdit" component={Patient} options={{
                    headerStyle:{
                        backgroundColor: '#FFF',
                    },
                    headerTintColor: '#6200ee',
                    headerTitle: 'Atualização de paciente'
                    }}/>
                <Stack.Screen name="Camera" component={Camera} options={{
                headerShown: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}