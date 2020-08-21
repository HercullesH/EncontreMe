import React, { Component } from 'react';
import { View, ScrollView, ImageBackground, FlatList,Text  } from 'react-native';
import { Button, Appbar,FAB } from 'react-native-paper';

import { startLoading, stopLoading  } from '../../actions/loading';
import { setUser } from '../../actions/user'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../../services/authService'
import { getAll } from '../../services/patientService'
import styles from './style'
import PatientList from '../../components/PatientList'
import { setPatientSelected } from '../../actions/patientSelected'


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
        this.props.actions.setPatientSelected([])
        await this.getPatients()
        this.props.actions.stopLoading()
        
      }



      

    render(){
        return(
          <>
          {this.props.patientsSelected.patientsSelected.length === 0 && <Appbar style={{backgroundColor:'white'}}>
          <Appbar.Content  title="Pacientes" subtitle={this.props.user.name} color="#6200ee" />

          <Appbar.Action
            icon="logout"
            color="#6200ee"
            onPress={ this.logout }
            style={{ marginRight: 15 }}
           />

         </Appbar>}

         {this.props.patientsSelected.patientsSelected.length > 0 && 
          <Appbar >
          <Appbar.Content  title={`${this.props.patientsSelected.patientsSelected.length} selecionado(s)`}   />

          {this.props.patientsSelected.patientsSelected.length === 1 && <Appbar.Action
            icon="pencil"
            onPress={ () => console.log('edit') }
            style={{ marginRight: 15 }}
           /> }

          <Appbar.Action
            icon="delete"
            onPress={ () => console.log('delete') }
            style={{ marginRight: 15 }}
           />

         </Appbar>}

              {/* <ImageBackground source={require('../../assets/home.jpg')} resizeMode="stretch" style={{height:200, alignItems: 'flex-start', justifyContent: 'center', flexDirection:'row'}}>

              </ImageBackground> */}
              <View style={[ styles.container]}>

              {this.state.patientList.length > 0 && <PatientList patientList={this.state.patientList} />}
                
                <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => this.props.navigation.navigate('PatientNew')}
              />

                
              </View>
            </>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.loading.loading,
    user: state.user.user,
    patientsSelected: state.patientsSelected
  });
  
  
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({startLoading, stopLoading, setUser, setPatientSelected}, dispatch),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)