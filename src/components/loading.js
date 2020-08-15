import { ActivityIndicator } from 'react-native-paper';
import React from 'react'
import { View } from 'react-native';
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff'
    }

    
  });

export default function Loading(){

    return(
      <ActivityIndicator size="large"  color="#6200ee" animating={true} style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent:'center',
        alignItems:'center',
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)'}}/> 
        
    )

}