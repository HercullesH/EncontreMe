import React, { Component} from 'react';
import { View, StyleSheet,Image, TouchableOpacity,Text, ImageBackground, FlatList } from 'react-native';
import {  Card, Divider, Paragraph, Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles'
import { setPatientSelected, setPatientsList } from '../../actions/patientSelected'

class PatientList extends Component { 

    constructor(props) {
        super(props);
        // Não chame this.setState() aqui!

        this.state = {
            patientList: this.props.patientList
        }

        this.selectItem = this.selectItem.bind(this)
      }

      selectItem(item, index){
        let patientList = this.props.patientsSelected.patientList
        let patientsSelected = this.props.patientsSelected.patientsSelected
        if(item.isSelect){
        item.selectedClass = {}
        item.isSelect = false
        const index = patientsSelected.map(e => e.key).indexOf(item.key);
        //const index = patientsSelected.indexOf(item.key);
        patientsSelected.splice(index, 1);
        } else {

        item.isSelect = true
        item.selectedClass = {backgroundColor: '#00FFFF'}
        patientsSelected.push(item)
        
        }
        patientList[index] = item
        this.props.actions.setPatientSelected(patientsSelected)
        this.props.actions.setPatientsList(patientList)
      }

      pressItem(item, index){
        if( this.props.patientsSelected.patientsSelected.length > 0){
            this.selectItem(item, index)
        }
        
      }
      longpressItem(item, index){
        if( this.props.patientsSelected.patientsSelected.length === 0){
            this.selectItem(item, index)
        }
      }
    //   onPress={() => patientList[index].item.selectedClass = {backgroundColor: '#000'}}
    render(){
        return(

            <FlatList
                      showsVerticalScrollIndicator={false}
                      data={this.props.patientsSelected.patientList}
                      keyExtractor={item => item.key}
                      extraData={this.props.patientsSelected.patientList}
                      renderItem={( {item, index} ) => ( 
                      <View>
                        <TouchableOpacity onPress={() => this.pressItem(item, index)}  onLongPress={() => this.longpressItem(item, index ) }>
                        <Card  style={[styles.card,item.selectedClass]}>
                        
                        
                        
                        
                        
                        <Card.Content >
                            <View style={styles.containerCard}>
                                <Avatar.Image source={{ uri: item.image }} size={110} />
                                <View style={styles.contentCard}>
                                <Paragraph>Sexo: <Text style={styles.text}>{item.gender}</Text></Paragraph>
                                <Paragraph>Pele: <Text style={styles.text}>{item.skin}</Text></Paragraph>
                                
                                <Paragraph>Peso:  <Text style={styles.text}>{item.weight}</Text> </Paragraph>
                                <Paragraph>Altura: <Text style={styles.text}>{item.height}</Text></Paragraph>
                                </View>
                            </View>
                        </Card.Content>
                        
                        
                        
                    </Card>
                    </TouchableOpacity>
                    {/* <Image source={{ width:'90%',height:200,uri: `data:image/jpeg;base64,${data.image}` }}/> */}
                    </View>
                    )}
                      style={{marginBottom: 2}}
            />
            
            
        )
    }
    
}


const mapStateToProps = state => ({
    patientsSelected: state.patientsSelected
  });
  
  
const mapDispatchToProps = dispatch => ({
actions: bindActionCreators({setPatientSelected, setPatientsList}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PatientList)