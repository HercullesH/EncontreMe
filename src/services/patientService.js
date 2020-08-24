import firebase from './firebaseConnection';
import RNFetchBlob, { RNFetchBlobSession } from 'react-native-fetch-blob';
import { Platform } from 'react-native'
import 'firebase/storage';

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

export function delImage(image){
  console.log('olha a url da imagem ', image)
  let storage = firebase.storage()
  let refImage = storage.refFromURL(image)
  refImage.delete().then(function() {
  }).catch(function(error) {
    alert('erro ao excluir imagem')
  });
}

export async function update(data){
  //https://firebasestorage.googleapis.com
  
  let status = true
  let key = data.key
  delete data.key
  await firebase.database().ref('patients').child(key).update(data)
  .then(() => {
      status = true;
  }).catch((error) => {
      status = false;
  })

  return status;
}

export async function del(items){
  let status = true;
  let storage = firebase.storage()
  items.forEach( async (item) =>{
    let refImage = storage.refFromURL(item.image)
    refImage.delete().then(function() {
        
    }).catch(function(error) {
      
    });

    await firebase.database().ref('patients').child(item.key).remove()
    .then(() => {
        status = true;
    }).catch((error) => {
        alert(error)
    })
  })
  

}

export async function getAll(){
    let data = [];
    let count = 0
    await firebase.database().ref('patients')
      .once('value', (snapshot)=>{

        if(snapshot.val()){
            let keys = Object.keys(snapshot.val())
            snapshot.forEach((item, index) => {
            let patient = {...item.val(), key: keys[count],isSelect : false,selectedClass : {} }
            data.push( patient )    
            count += 1       
          })
        }
        
          
        })
    return data
}

async function uploadImage(uri, mime = 'application/octet-stream') {
    const storage = firebase.storage();
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime();
    const imageRef = storage.ref('images').child(`${sessionId}`);

    let blob = await uriToBlob(uploadUri)

    var uploadTask = await imageRef.put(blob, { contentType: mime })

    let link = await uploadTask.ref.getDownloadURL()

    return link
      

  
}

  function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
  }

  export async function pickImage(uri) {
      let data = await uploadImage(uri)
      return data
  }