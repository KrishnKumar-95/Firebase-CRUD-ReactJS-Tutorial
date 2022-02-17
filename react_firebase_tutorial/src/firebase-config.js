import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "#######################################",
    authDomain: "##################################",
    projectId: "##################",
    storageBucket: "##############################",
    messagingSenderId: "919518297071",
    appId:   "1:718096656575:web:881125d3f148f8f84dfe0a",
    measurementId: "############"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);