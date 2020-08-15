import React, { Component } from 'react';
import { View, StyleSheet,Image, TouchableOpacity,Text, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import styles from './style';
import { signUp } from '../../services/authService';
import { startLoading, stopLoading  } from '../../actions/loading';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Title } from 'react-native-paper';



class SignUp extends Component{
    constructor(props) {
        super(props);
        // Não chame this.setState() aqui!
        const initialState = {
            name: '',
            email:'',
            password: '',
            confirmPassword: '',
            snackbar: false
        }
        this.state = initialState;
        this.changeValues = this.changeValues.bind(this)
        this.submit = this.submit.bind(this)
      }

      changeValues(name,value){
        this.setState({
            ...this.state,
            [name] : value
        })
      }

      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      async submit(){
        this.props.actions.startLoading()
        await signUp(this.state)
        this.props.actions.stopLoading()
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'SignIn'}],
          });
      }

      

    render(){
        return(

            <View style={styles.background}>
              <KeyboardAvoidingView  style={styles.background} 
                enabled
                >
                <View style={styles.containerTitle}>
                  <Title style={styles.textTitle}>Cadastro de Usuário</Title>
                </View>
                


                  <View style={[styles.bodyFlex,styles.container]} behavior="padding" enabled >
                    <TextInput
                    label="Nome"
                    value={this.state.login}
                    onChangeText={(value) => this.changeValues('name',value)}
                    style={[styles.component,styles.textInput, styles.marginTop]}
                    
                    />

                    <TextInput
                    label="Email"
                    value={this.state.login}
                    onChangeText={(value) => this.changeValues('email',value)}
                    style={[styles.component,styles.textInput]}
                    
                    />

                    <TextInput
                    label="Senha"
                    value={this.state.password}
                    onChangeText={(value) => this.changeValues('password',value)}
                    style={[styles.component,styles.textInput]}
                    secureTextEntry={ true }
                    
                    />

                    
                    <TextInput
                    label="Confirmar Senha"
                    value={this.state.login}
                    onChangeText={(value) => this.changeValues('confirmPassword',value)}
                    style={[styles.component,styles.textInput]}
                    secureTextEntry={ true }
                    
                    />

                    <Button style={styles.component}  mode="contained" onPress={ this.submit }>
                        Salvar
                    </Button>
                    
                    
                    </View>
                    </KeyboardAvoidingView>
                    {/* <ActivityIndicator size="large"  color="blue" style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            justifyContent:'center',
            alignItems:'center',
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)'}}/>     */}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loading.loading
  });
  
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({startLoading, stopLoading}, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp)