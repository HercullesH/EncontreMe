import React, { Component } from 'react';
import { View, StyleSheet,Image, TouchableOpacity,Text, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import { Button, Snackbar, TextInput } from 'react-native-paper';
import { signUp } from '../../services/authService';
import { startLoading, stopLoading  } from '../../actions/loading';
import { setUser } from '../../actions/user'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Title } from 'react-native-paper';
import { signOut } from '../../services/authService'
import styles from './style'



class Home extends Component{
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

        this.state = {
          test: 'oi'
        }

        this.logout = this.logout.bind(this)
      }

      async logout(){

        await signOut()
        this.props.actions.setUser(null, false)

      }

    render(){
        return(

            <View style={styles.background}>
              <Text>oi</Text>

              <Button style={styles.component}  mode="contained" onPress={ this.logout }>
                        Salvar
              </Button>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loading.loading
  });
  
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({startLoading, stopLoading, setUser}, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)