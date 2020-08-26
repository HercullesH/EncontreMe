import React, { Component } from 'react';
import { View,Text, KeyboardAvoidingView, ScrollView,Platform } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import styles from './style';
import { add, update, pickImage,delImage } from '../../services/patientService';
import { startLoading, stopLoading  } from '../../actions/loading';
import { setPhoto } from '../../actions/photo'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer';


function Image(data, photo){
  if(data.activeCamera && photo !== null){
    return(
      <Avatar.Image size={140} style={styles.marginTop}  source={ {uri: photo } }/>
    )
    
  }
  if(data.photoUri){
    return(
      <Avatar.Image size={140} style={styles.marginTop}  source={ {uri: data.photoUri} }/>
    )
  }

  return (
    <Avatar.Image size={140} style={styles.marginTop}  source={require('../../assets/profile.png')}/>
  )
}

class Patient extends Component{
    constructor(props) {
        super(props);
        // Não chame this.setState() aqui!
        const initialState = {
            skin: '',
            height:'',
            weight: 0,
            gender: ''
            
        }
        this.state = {
          snackbar: false,
          photoUri:null,
          item : initialState,
          activeCamera: false
        };
        this.changeValues = this.changeValues.bind(this)
        this.submit = this.submit.bind(this)
        this.openGallery = this.openGallery.bind(this)
        this.prepareObjectSubmit = this.prepareObjectSubmit.bind(this)
        this.goCamera = this.goCamera.bind(this)
        this.clearPhoto = this.clearPhoto.bind(this)
        this.loadByRouteName = this.loadByRouteName.bind(this)
      }

      changeValues(name,value){
        this.setState({
            item: {
              ...this.state.item,
              [name] : value
            },
        })
      }

      clearPhoto(){
        if(!this.state.activeCamera && this.props.photo.photo !== null){
          this.props.actions.setPhoto(null)
        }
      }

      async resize(uriImage) {
        let photoUri = await ImageResizer.createResizedImage(uriImage, 300, 300, 'JPEG', 100)
        return photoUri
        
      }

      openGallery(){
        const options = {
          title: 'Selecione uma foto',
          chooseFromLibraryButtonTitle: 'Buscar foto do album...',
          mediaType: 'photo',
          quality: 0.7,
          noData: true
        }
        ImagePicker.launchImageLibrary(options, async (response) => {
          if(response.didCancel){
            return 
          } else if('Gerou algum erro ', response.error){
            alert('Gerou algum erro: ', response.error)
          } else{
            let photo = await this.resize(response.uri)
            await this.setState({ photoUri: photo.uri })
          }
        })

    
      }

      goCamera(){
        this.setState({ activeCamera: true })
        this.props.navigation.navigate('Camera')
      }

      loadByRouteName(){
        if(this.props.route.params.route === 'PatientEdit'){
          let data = this.props.route.params.data
          data.weight = `${data.weight}`,
          data.height = `${data.height}`
          this.setState({ item : data, photoUri: this.props.route.params.data.image })
        }
      }

      componentDidMount(){
        this.clearPhoto()
        this.loadByRouteName()
      }


      async submit(){
        this.props.actions.startLoading()
        let data = await this.prepareObjectSubmit(this.state.item)
        this.props.route.params.route === 'PatientEdit' ? await update(data) : await add(data)
        this.props.actions.stopLoading()
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }

      async prepareObjectSubmit(item){
        if(this.props.photo.photo !== null && this.state.activeCamera){
          await this.setState({ photoUri:  this.props.photo.photo})
        }

        if(this.props.route.params.route === 'PatientEdit'){
          if(this.props.route.params.data.image !== this.state.photoUri){
            await delImage(this.props.route.params.data.image)
          }  
        }
        
        let uri = await pickImage(this.state.photoUri)

        let data = item;
        data.height = parseFloat(data.height)
        data.weight = parseInt(data.weight)
        data.image = uri,
        data.userUid = this.props.user.uid
        return data
      }

      

    render(){
        return(
              <ScrollView showsVerticalScrollIndicator={false} style={styles.background}>
                <KeyboardAvoidingView  
                  behavior={Platform.OS === 'ios' ? 'padding' : ''}
                  enabled
                  style={[styles.container,styles.background]}
                  >
                    { Image(this.state, this.props.photo.photo) }
                    

                      <View style={{ flexDirection:'row', alignItems: 'center' }}>
                      <Button icon="camera" style={styles.buttonPhoto}  mode="text" onPress={this.goCamera}>
                        Câmera
                      </Button>

                      <Button icon="folder-image" style={styles.buttonPhoto}  mode="text" onPress={ this.openGallery }>
                        Galeria
                      </Button>
                      </View>

                      <TextInput
                      label="Sexo"
                      value={this.state.item.gender}
                      onChangeText={(value) => this.changeValues('gender',value)}
                      style={[styles.component,styles.textInput, styles.marginTop]}
                      
                      />

                      <TextInput
                      label="Pele"
                      value={this.state.item.skin}
                      onChangeText={(value) => this.changeValues('skin',value)}
                      style={[styles.component,styles.textInput]}
                      
                      />

                      <TextInput
                      label="Peso"
                      value={this.state.item.weight}
                      keyboardType="number-pad"
                      onChangeText={(value) => this.changeValues('weight',value)}
                      style={[styles.component,styles.textInput]}
                      
                      />

                  <TextInput
                      label="Altura"
                      value={this.state.item.height}
                      onChangeText={(value) => this.changeValues('height',value)}
                      style={[styles.component,styles.textInput]}
                      
                      />



                      <Button style={[styles.component]}  mode="contained" onPress={ this.submit }>
                          Salvar
                      </Button>
                      </KeyboardAvoidingView>
                    </ScrollView>
            
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loading.loading,
    user: state.user.user,
    photo: state.photo
  });
  
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({startLoading, stopLoading, setPhoto}, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Patient)