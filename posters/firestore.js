import { app } from './auth.js';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore-lite.js";

export const writeOrder = async (order) => {
    try{
        const db = await getFirestore(app);
        const orders_collection = await collection(db, "/orders");
        console.log(orders_collection);
        await addDoc(orders_collection, order);
    }
    catch(error){
        const errorCode = error.code;
        const errorMessage = error.message;
      
        console.log(errorCode, errorMessage);
    }
}