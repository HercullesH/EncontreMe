import firebase from './firebaseConnection';
export async function add(data){
    let status = true;
    let key = await firebase.database().ref('patients').push().key;
    await firebase.database().ref('patients').child(key).set(data)
    .then(() => {
        status = true;
    }).catch((error) => {
        status = false;
    })

    return status;
}