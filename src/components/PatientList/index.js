import React from 'react';
import { View, StyleSheet,Image, TouchableOpacity,Text, ImageBackground } from 'react-native';
import {  Card, Divider, Paragraph } from 'react-native-paper';
import styles from './styles'

export default function PatientList( {data} ){
    return(

        <View>
            <Card  style={styles.card}>
            
            {/* <Card.Cover resizeMode="stretch"  style={{ height: 100, width: '90%'}} source={{ uri: data.image }} /> */}
            
            <Image source={{ uri: data.image }} resizeMode="contain"  style={{height:350}} />
            <Card.Content>
                <Paragraph><Text style={ styles.fontText}>Sexo: </Text>{data.gender}</Paragraph>
                <Paragraph><Text style={ styles.fontText}>Pele: </Text>{data.skin}</Paragraph>
                
                <Paragraph><Text style={ styles.fontText}>Peso: </Text>{data.weight}</Paragraph>
                <Paragraph><Text style={ styles.fontText}>Altura: </Text>{data.height}</Paragraph>
            </Card.Content>
            
        </Card>
        {/* <Image source={{ width:'90%',height:200,uri: `data:image/jpeg;base64,${data.image}` }}/> */}
        </View>
        
    )
}