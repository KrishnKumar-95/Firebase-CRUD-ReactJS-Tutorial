// FIREBASE CRUD TUTORIAL WITH REACTJS
import { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebase-config';
import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "firebase/firestore"

function App() {
  const [users,setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0)
  // CHANGE THE BUTTON WHEN TO UPDATE
  const [isUpdate,setIsUpdate] = useState(false)
  // GIVES THE POSITION OF WHICH DOCUMENT IS TO BE UPDATED
  const [posEdit, setPosEdit] = useState(null)

  // collection(imported_db, collection_name)
  const usersCollectionRef = collection(db,"users");

  // CREATE
  const createUser = async(e)=>{
    e.preventDefault();
    // addDoc takes two arguments first : Collection reference and 2nd is data
    const newDoc = {name: newName,age: Number(newAge)}
    await addDoc(usersCollectionRef, newDoc)
    setUsers([...users,newDoc])
    setNewName("")
    setNewAge(0)
  }

  // UPDATE
  const updateUser = async(id,age)=>{
    // if we want to pick single data and make changes or any other operation then we have to use << doc >>
    // userDoc takes three arguments first is the imported db 2nd is the collection name 3rd is the id of the particular document
    const userDoc = doc(db,"users",id)
    const newFields = {age: Number(age) + 1}
    await updateDoc(userDoc, newFields) 
  }

  // DELETE
  const deleteUser = async(id)=>{
    const userDoc = doc(db,"users",id)
    await deleteDoc(userDoc)
    users.splice(id,1)
    setUsers([...users])
  }

  // CLASS TO READ THE DATA FROM THE FIRESTORE
  class ShowData{
    constructor(collectionRef){
      this.Ref = collectionRef
    }
    async show(){
      this.data = await getDocs(this.Ref)
      setUsers(this.data.docs.map(
        (doc)=>(
          {...doc.data(),id: doc.id}
        )
      ))
    }
  }

  const editDoc = async(user,pos)=>{
    setIsUpdate(true)
    setPosEdit(pos)
    setNewName(user.name)
    setNewAge(user.age)
    const id = user.id
    localStorage.setItem("UserID",id);
  }
  
  const editUser = async()=>{
    const id = localStorage.getItem("UserID")
    const pos = posEdit
    const userDoc = doc(db,"users",id)

    const newDoc = { 
      name: newName,
      age: newAge
    }

    await updateDoc(userDoc, newDoc);

    const showNewUsers = async()=>{
      // const newData = new ShowData(usersCollectionRef)
      // await newData.show()

      users.splice(pos,1,newDoc);
      setUsers(users)
      setIsUpdate(false)
      setNewName("")
      setNewAge(0)
      localStorage.removeItem("UserID");
    }
    showNewUsers()
  }

  // READ
  useEffect(()=>{
    const getUsers = async()=>{
      const newData = new ShowData(usersCollectionRef)
      await newData.show()
    }
    getUsers();
  })

  return (
    <div className="App">
      <h1>This is Firebase React Tutorial</h1>
      <input type="text" value={newName} onChange={(event)=>{setNewName(event.target.value)}} placeholder='Enter Name...'/>
      <input type="number" value={newAge} onChange={(event)=>{setNewAge(event.target.value)}} placeholder='Enter Age'/>
      {isUpdate ? <button onClick={editUser}>Update User</button> : <button onClick={createUser}>Create User</button> }

      {users.map((user,pos)=>{
        return (
        <div key={pos}>
          <h3> Name : {user.name}</h3>
          <h3> Age : {user.age}</h3>
          <button onClick={()=>{updateUser(user.id,user.age)}}>Increase Age</button>
          <button onClick={()=>{deleteUser(user.id)}}>Delete User</button>
          <button onClick={()=>{editDoc(user,pos)}}>Edit</button>
        </div>
        )
      }
      )}
    </div>
  );
}

export default App;