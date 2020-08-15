import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    background:{
      flex:1
    },
    containerTitle:{
      backgroundColor: '#6200ee',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTitle:{
      
      color:'#FFF',
      fontFamily: 'Trebuchet MS',
      fontSize: 20
    },
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    component:{
        width:'90%',
        marginBottom: 15,
        
    },
    textInput:{
        height: 45,
    },
    linkSignUp:{
        color: 'blue'
    },
    touchable:{
        width: '90%',
        marginTop: 5
    },
    marginTop:{
      marginTop: 15
    },
    bodyFlex:{
      flex:2.4,
      backgroundColor: '#fafafa'
    },
    loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
    
  });

  export default styles