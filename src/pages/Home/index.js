import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, FlatList,Text  } from 'react-native';
import { Button, Appbar } from 'react-native-paper';

import { startLoading, stopLoading  } from '../../actions/loading';
import { setUser } from '../../actions/user'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../../services/authService'
import { getAll } from '../../services/patientService'
import styles from './style'
import PatientList from '../../components/PatientList'



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
            patientList: []
        }

        this.logout = this.logout.bind(this)
        this.getPatients = this.getPatients.bind(this)
      }

      async logout(){

        await signOut()
        this.props.actions.setUser(null, false)

      }

      async getPatients(){
        let patients = await getAll()
        this.setState({patientList : patients})
      }

      async componentDidMount(){
        this.props.actions.startLoading()
        await this.getPatients()
        this.props.actions.stopLoading()
        
      }

      setHeaderRight() {
        //console.log("setHeaderRight", this.state.secureTextEntry);
        return (
          <IconButton
          icon="camera"
          color={Colors.red500}
          size={20}
          onPress={() => this.props.navigation.navigate('PatientNew') }
          />
        );
      };

      

    render(){
        return(
          <>
          <Appbar >
          <Appbar.Content title="Pacientes" />
          <Appbar.Action
            icon="plus-thick"
            style={{ marginRight: 12 }}
            onPress={() => this.props.navigation.navigate('PatientNew')}
           />

          <Appbar.Action
            icon="logout"
            onPress={ this.logout }
            style={{ marginRight: 15 }}
           />

         </Appbar>
              {/* <ImageBackground source={require('../../assets/home.jpg')} resizeMode="stretch" style={{height:200, alignItems: 'flex-start', justifyContent: 'center', flexDirection:'row'}}>

              </ImageBackground> */}
              <View style={[ styles.container]}>

              <FlatList
                  showsVerticalScrollIndicator={false}
                  data={this.state.patientList}
                  keyExtractor={item => item.key}
                  renderItem={( {item} ) => (<PatientList data={item} />)}
                  style={{marginBottom: 10}}
                  />

                
              </View>
            </>
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