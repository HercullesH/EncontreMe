import React, { useState } from 'react'
import { PermissionsAndroid , Platform, Image,Modal, View, Text, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import { RNCamera } from 'react-native-camera'
import styles from './style'
import { IconButton, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPhoto } from '../../actions/photo'
import { useNavigation } from '@react-navigation/native';


function Camera(props){
    const [photo,setPhoto] = useState(null)
    const [canTakePicture,setCanTakePicture] = useState(true)
    const [type,setType] = useState(RNCamera.Constants.Type.back)
    const navigation = useNavigation();

    async function takePicture(camera){

        if(canTakePicture){
            setCanTakePicture(false)
            const options = {quality: 0.6, base64: true }
            const data = await camera.takePictureAsync(options)
        
            setPhoto(data.uri)
            await props.actions.setPhoto(data.uri)
            navigation.goBack()
        }
        
      }

    function swapCam(){
        setType( type === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back)
    }

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


            

            <FAB
                icon="camera"
                color="white"
                style={styles.capture}
                onPress={() => takePicture(camera) }
              />
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

            <FAB
                icon="undo"
                color="#6200ee"
                style={styles.back}
                small
                onPress={() => navigation.goBack() }
              />

            <FAB
                icon={require('../../assets/camera-flip.png')}
                color="white" 
                style={styles.swapButton}
                onPress={ swapCam }
              />

        </View>
    )
}

const mapStateToProps = state => ({
    loading: state.loading.loading,
    user: state.user,
    patientsSelected: state.patientsSelected,
    photo: state.photo
  });
  
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ setPhoto }, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Camera)