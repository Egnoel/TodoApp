import React, {useState, useEffect} from 'react';
import Todo from './Todo';
import { Button,Input, FormControl, InputLabel } from '@material-ui/core';
import './App.css';
import db from './firebase'
import firebase from 'firebase';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function App() {

  const [todos, setTodos] = useState(["Levar o cão a passear", "Fazer compras"]);
  const [input, setInput] = useState('');

  //when the app lodas, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    db.collection("todos").orderBy('timestamp', 'desc').onSnapshot(snapshot =>{
      setTodos(snapshot.docs.map(doc => ({id:doc.id ,todo:doc.data().todo})))
    })
   
  }, [])

  const addTodo = (event)=>{
    event.preventDefault();
    db.collection("todos").add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  }

  return (
    <div className="App">
      <h1>Hello Egnoel!!</h1>
      <form>
        <FormControl>
          <InputLabel>Write a ToDo List</InputLabel>
          <Input value={input} onChange={event =>setInput(event.target.value)}></Input>
        </FormControl>
        <AddCircleIcon disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}></AddCircleIcon>
      </form>
      <ul>
        {todos.map(todo=>(
          <Todo todo={todo}/>
          
        ))}
      </ul>
    </div>
  );
}

export default App;
