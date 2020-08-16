import React, { Component } from 'react'
import { View, Image, TouchableOpacity,Text, KeyboardAvoidingView} from 'react-native'
import styles from './style'
import { TextInput, Button, Snackbar  } from 'react-native-paper';
import { signIn } from '../../services/authService';
import { startLoading, stopLoading  } from '../../actions/loading';
import { setUser  } from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class SignIn extends Component{
    constructor(props) {
        super(props);
        // Não chame this.setState() aqui!
        const initialState = {
            login:'',
            password: '',
            visible: false
        }
        this.state = initialState;
        this.changeValues = this.changeValues.bind(this)
        this.login = this.login.bind(this)
        this.showSnackBar = this.showSnackBar.bind(this)
        this.hideSnackBar = this.hideSnackBar.bind(this)
      }

      changeValues(name,value){
        this.setState({
            ...this.state,
            [name] : value
        })
      }

      showSnackBar(){
        this.setState({visible : true})
      }

      hideSnackBar(){
        this.setState({visible : false})
      }

      async login(){
        this.props.actions.startLoading()
        let user = await signIn(this.state.login, this.state.password)
        this.props.actions.stopLoading()
        user ? this.props.actions.setUser( user, true ) : this.showSnackBar()
      }

      

    render(){
        return(
            <View style={styles.background}>
                
                    <KeyboardAvoidingView style={styles.container}>
                        <Image source={require('../../assets/logo.png')}/>
                        <TextInput
                        label="Email"
                        value={this.state.login}
                        onChangeText={(value) => this.changeValues('login',value)}
                        style={[styles.component,styles.textInput]}
                        
                        />

                        <TextInput
                        label="Senha"
                        value={this.state.password}
                        onChangeText={(value) => this.changeValues('password',value)}
                        style={[styles.component,styles.textInput]}
                        secureTextEntry={ true }
                        
                        />

                        <Button style={styles.component}  mode="contained" onPress={this.login}>
                            Entrar
                        </Button>

                        <Snackbar
                        visible={this.state.visible}
                        onDismiss={this.hideSnackBar}
                        duration={2500}
                        theme={{colors: {onSurface : '#CB4335'} }}>
                        Dados inválidos
                      </Snackbar>

                        <TouchableOpacity style={styles.touchable} onPress={() => this.props.navigation.navigate('SignUp')}>
                            <Text style={styles.linkSignUp}>Não sou cadastrado</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loading.loading,
    user: state.user
  });
  
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({startLoading, stopLoading, setUser}, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignIn)