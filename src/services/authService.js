import firebase from './firebaseConnection';


export async function signUp(item){
    console.log(item)
    await firebase.auth().createUserWithEmailAndPassword(item.email,item.password)
    .then(async (value)=>{

        console.log('deu tudo certo')
        let uid = value.user.uid;
        await firebase.database().ref('users').child(uid).set({
            email: value.user.email,
            name: item.name
        })
        .then(()=>{

            console.log('deu certo dnv')
            // let data = {
            //     uid: uid,
            //     nome: nome,
            //     email: value.user.email,
            // };
            // setUser(data);
            // storageUser(data);
            // setLoadingAuth(false);
        })
    })
    .catch((error)=> {
        console.log('deu merda')
        console.log('vamo la')
    });
}

export async function signIn(email, password){
    let data = null
    await firebase.auth().signInWithEmailAndPassword(email,password)
    .then(async (value)=>{
        let uid = value.user.uid;
        await firebase.database().ref('users').child(uid).once('value')
        .then((snapshot)=>{
            data = {
              uid: uid,
              name: snapshot.val().name,
              email: value.user.email,
            };

        })
    })
    .catch((error)=> {

        data = null
    });

    return data

}

export async function signOut(){
    await firebase.auth().signOut();
}