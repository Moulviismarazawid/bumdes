import app from "./init";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'

const firestore = getFirestore(app);

export async function retrieveData(collectionName:string){
    const snapshot = await getDocs(collection(firestore, collectionName));
    const data = snapshot.docs.map((doc) => ({
        id : doc.id,
        ...doc.data()
    }))
    return data;
}

export async function retrieveDataById (collectionName:string, id:string){
    const snapshot = await getDoc(doc(firestore, collectionName,id));
    const data = snapshot.data();
    return data ;
}

export async function retrieveDataByField(collectionName:string, field:string, value:string) {
    const q = query(collection(firestore, collectionName), where(field, '==', value));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id : doc.id,
        ...doc.data()
    }))

    return data
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export async function addData(collectionName:string, data:unknown,callback:Function){
 await addDoc(collection(firestore, collectionName), data)
.then(() => {
    callback(true)
}).catch((error) => {    
    callback(false)
    console.log(error)
})
}


