import React, {useState} from 'react'
import {List, ListItem, ListItemAvatar, ListItemText, Modal, Button } from '@material-ui/core';
import './Todo.css'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import db from './firebase'

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function Todo(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
    const handleOpen = ()=>{
        setOpen(true);
    }

    const updateTodo = ()=>{
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge:true});
        setOpen(false);
    }

    return (
        <>
            <Modal
            open={open}
            onClose={e=>setOpen(false)}>
                <div className={classes.paper}>
                    <h1>Modal to put some css</h1>
                    <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                    <Button onClick={updateTodo}>Update</Button>
                </div>
            </Modal>
            <List> 
                <ListItem>
                    <ListItemAvatar>

                    </ListItemAvatar>
                    <ListItemText primary={props.todo.todo} secondary="Task" />
                </ListItem>
                <EditIcon onClick={e=>setOpen(true)} ></EditIcon>
                <DeleteIcon onClick= {event => db.collection('todos').doc(props.todo.id).delete()}></DeleteIcon>
            </List>
        </>
    )
}

export default Todo
