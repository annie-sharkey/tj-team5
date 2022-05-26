import { React, useState } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import {ListItem, ListItemIcon, ListItemText, IconButton, Divider} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import db from '../firebase.js'
import {collection, doc, getDocs, updateDoc, deleteDoc} from "firebase/firestore";

const EditStudent = (props) => {

    console.log(props);
    console.log("here")

    const [isOpen, setIsOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    function modalClick(e){
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    function deleteClick(e){
        e.preventDefault();
        setIsDeleteOpen(!isDeleteOpen);
    }

    function actuallyDeleteClick(firstName, lastName){
        deleteDoc(doc(db, "students", "student-"+firstName+"-"+lastName));    
        setIsDeleteOpen(!isDeleteOpen)
    }


    const hoverStyle = {
        bgcolor: '#ADD8E6',
        '&:hover $child': {
            color: 'blue'
        }
    };

    return (
        <>
        <div key={props.studentId}>
        <ListItem style={{ hoverStyle }}>
            <ListItemText primary={props.firstname} fontSize="0.7em"/>
            <ListItemIcon>
                <IconButton onClick={e => modalClick(e)} edge="end" style={{ color: 'white', backgroundColor: 'green'}}>
                    <EditIcon />
                </IconButton>
            </ListItemIcon>
            <ListItemIcon>
                <IconButton onClick = {e => deleteClick(e)} edge="end" style={{ color: 'white', backgroundColor: 'red'}}>
                    <PersonRemoveIcon />
                </IconButton>
            </ListItemIcon>
        </ListItem>
        <Divider light/>
        </div>

        <Dialog open={isOpen}>
            <DialogTitle>{props.firstname}</DialogTitle>
            <DialogContent>
                <TextField placeholder = "bruh" autoFocus margin="dense" id="firstname" label="First Name" type="text" fullWidth variant="standard"/>
                <TextField autoFocus margin="dense" id="lastname" label="Last Name" type="text" fullWidth variant="standard"/>
                <TextField autoFocus margin="dense" id="grade" label="Grade" type="text" fullWidth variant="standard"/>
                <TextField autoFocus margin="dense" id="birthday" label="Birthday" type="text" fullWidth variant="standard"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={modalClick}>Save</Button>
                <Button onClick={modalClick}>Exit</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={isDeleteOpen}>
            <DialogTitle>Are you sure you want to delete {props.firstname}?</DialogTitle>
            <DialogActions>
                <Button onClick={actuallyDeleteClick(props.firstname, props.lastname)}>Confirm</Button>
                <Button onClick={deleteClick}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
        
    );
};

export default EditStudent;