import React, { useState } from 'react'
import { PermissionsAndroid , Platform, Image,Modal, View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import styles from './style'


export default function Camera(){
    const [photo,setPhoto] = useState(null)
    const [type,setType] = useState(RNCamera.Constants.Type.back)

    return(
        <View style={ styles.container }>
            <StatusBar hidden={true} />

            <RNCamera
            style={ styles.preview }
            type={type}
            flashMode={RNCamera.Constants.FlashMode.auto}
            androidCameraPermissionOptions={{
            title: 'Permissão para usar a câmera',
            message: 'Nós precisamos usar a sua câmera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancelar'
            }}
            >
            
                {({camera, status, recordAudioPermissionStatus}) => {
                if(status !== 'READY') return <View/>;
                return(
                    <View style={{marginBottom: 35, flexDirection: 'row', alignItems: 'flex-end',justifyContent:'space-between'}}
                    >
                    {/* <TouchableOpacity 
                    onPress={() => takePicture(camera) }
                    style={styles.capture}
                    >
                        <Text>Tirar Foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    onPress={openAlbum}
                    style={styles.capture}
                    >
                        <Text>Album</Text>
                    </TouchableOpacity> */}

                    </View>
                )

                }}
            </RNCamera>
        </View>
    )
}