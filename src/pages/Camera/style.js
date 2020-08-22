import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    preview:{
        flex:1,
        justifyContent:'flex-end',
        alignItems: 'center'
    },
    capture:{
        flex: 0,
        alignSelf: 'center',
        backgroundColor: '#6200ee'
    },
    back:{
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 0,
        backgroundColor: 'white'
    },
    swapButton:{
        position: 'absolute',
        margin: 16,
        right: 0,
        top: 150,
        backgroundColor: '#6200ee'
    }
})

export default styles