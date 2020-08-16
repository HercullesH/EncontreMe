import React, { Component } from 'react';
import { View,Text, KeyboardAvoidingView, ScrollView,Platform } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import styles from './style';
import { add } from '../../services/patientService';
import { startLoading, stopLoading  } from '../../actions/loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker'
import { cos } from 'react-native-reanimated';


function Image(data){
  if(data){
    return(
      <Avatar.Image size={140} style={styles.marginTop}  source={ {uri: data} }/>
    )
  }

  return (
    <Avatar.Image size={140} style={styles.marginTop}  source={require('../../assets/profile.png')}/>
  )
}

class PatientNew extends Component{
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
          photoBase64: '',
          item : initialState
        };
        this.changeValues = this.changeValues.bind(this)
        this.submit = this.submit.bind(this)
        this.openGallery = this.openGallery.bind(this)
        this.prepareObjectSubmit = this.prepareObjectSubmit.bind(this)
      }

      changeValues(name,value){
        this.setState({
            item: {
              ...this.state.item,
              [name] : value
            },
        })
      }

      openGallery(){
        const options = {
          title: 'Selecione uma foto',
          chooseFromLibraryButtonTitle: 'Buscar foto do album...',
          mediaType: 'photo',
          quality: 0.6
        }
        ImagePicker.launchImageLibrary(options, async (response) => {
          if(response.didCancel){
            return 
          } else if('Gerou algum erro ', response.error){
            alert('Gerou algum erro: ', response.error)
          } else{
            await this.setState({ photoUri: response.uri,photoBase64 : response.data })
          }
        })

    
      }


      async submit(){
        this.props.actions.startLoading()
        let data = this.prepareObjectSubmit(this.state.item)
        const status = await add(data)
        this.props.actions.stopLoading()
      }

      prepareObjectSubmit(item){
        let data = item;
        data.height = parseFloat(data.height)
        data.weight = parseInt(data.weight)
        data.image = this.state.photoBase64,
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
                    { Image(this.state.photoUri) }
                    

                      <View style={{ flexDirection:'row', alignItems: 'center' }}>
                      <Button icon="camera" style={styles.buttonPhoto}  mode="text" onPress={ this.submit }>
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
    user: state.user.user
  });
  
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({startLoading, stopLoading}, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PatientNew)