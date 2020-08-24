import React, { useState } from 'react'
import { PermissionsAndroid , Platform, View, Text, StatusBar } from 'react-native'
import { RNCamera } from 'react-native-camera'
import styles from './style'
import { IconButton, FAB } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPhoto } from '../../actions/photo'
import { useNavigation } from '@react-navigation/native';
import ImageResizer from 'react-native-image-resizer';

const typeFlashs = [
  {icon:'flash', flashMode: RNCamera.Constants.FlashMode.on},
  {icon:'flash-off', flashMode: RNCamera.Constants.FlashMode.off},
  {icon:'flash-auto', flashMode: RNCamera.Constants.FlashMode.auto}
]


function Camera(props){
    const [photo,setPhoto] = useState(null)
    const [canTakePicture,setCanTakePicture] = useState(true)
    const [type,setType] = useState(RNCamera.Constants.Type.back)
    const [flash,setFlash] = useState(0)
    const navigation = useNavigation();

    async function takePicture(camera){

        if(canTakePicture){
            setCanTakePicture(false)
            const options = {quality: 0.7, base64: true  }
            const data = await camera.takePictureAsync(options)

            let response = await resize(data.uri)
            setPhoto(response.uri)
            await props.actions.setPhoto(response.uri) 
            navigation.goBack()
        }
        
      }
    async function resize(uriImage) {
      let photoUri = await ImageResizer.createResizedImage(uriImage, 300, 300, 'JPEG', 100)
      return photoUri
      
    }

    function changeFlash(){
      flash === 2 ? setFlash( 0 ) : setFlash( flash + 1 )
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
            flashMode={typeFlashs[flash].flashMode}
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
            <FAB
                icon={typeFlashs[flash].icon} 
                color="white" 
                style={styles.flashButton}
                onPress={ changeFlash }
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