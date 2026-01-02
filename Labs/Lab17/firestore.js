import {db} from './firebase.js';

export const readEntried = async ()=>{
const records = await getDocs(collection(db, "entries"));
records.forEach((doc) => {
    console.log(doc.id)
  console.log(`${doc.id} => ${doc.data()}`);
});
}