import { StyleSheet } from "react-native";
const styles = StyleSheet.create({

    containerTitle:{
      backgroundColor: '#6200ee',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      backgroundColor: '#6200ee',
      color: 'white'
    },
    container: {
      backgroundColor: '#E5E7E9',
      //backgroundColor: '#FFF',
      flex: 1
    },
    component:{
        width:'90%',
        marginTop: 15     
    },

    button:{
      borderRadius:20
  },
  blue:{
        color: '#6200ee'
    },
  buttonHeader:{
      width:'30%',
      marginTop: 8
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  marginLeft:{
    marginLeft: 15
},
    touchable:{
        width: '90%',
        marginTop: 5
    },
    marginTop:{
      marginTop: 15
    },
    marginButtonDialog:{
      marginRight: 10
    }
    
  });

  export default styles