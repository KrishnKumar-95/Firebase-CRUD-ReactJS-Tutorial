import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "#######################################",
    authDomain: "##################################",
    projectId: "##################",
    storageBucket: "##############################",
    messagingSenderId: "919518297071",
    appId:   "#########################################",
    measurementId: "############"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
