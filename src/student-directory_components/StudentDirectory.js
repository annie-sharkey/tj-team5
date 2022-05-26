import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../Navbar.js';
import {List, IconButton, Grid} from '@mui/material';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import db from '../firebase.js'
import {collection, doc, getDocs, updateDoc, deleteDoc, setDoc} from "firebase/firestore";
import { useLocation } from "react-router-dom";
import EditStudent from './EditStudent.js';

const StudentDirectory = () => {

    const {state} = useLocation();
    const { username } = state; /*the user */

    const [students, setStudents] = useState([])
    const [isAddOpen, setIsAddOpen] = useState(false)

    const firstnameForm = useRef();
    const lastnameForm = useRef();
    const birthdayForm = useRef();
    const gradeForm = useRef();

    const printStudents = async () => {
        const documents = await getDocs(collection(db, "students"));
        console.log(documents);
        let list = [];
        documents.forEach((student) => list.push({id: student.id, ...student.data()}));
        setStudents(list);
    }

    useEffect(() => {
        printStudents();
    }, []);

    const commonStyles = {
        bgcolor: '#ADD8E6',
        borderColor: 'text.primary',
        m: 1,
        border: 1,
        width: '80vh',
    };

    console.log(students)

    function addClick(e){
        e.preventDefault();
        setIsAddOpen(!isAddOpen);
    }

    const addStudent = async() => {
        let obj = {
            firstname: firstnameForm.current.value,
            lastname: lastnameForm.current.value,
            grade: gradeForm.current.value,
            birthday: birthdayForm.current.value
        }
        console.log(obj);
        await setDoc(doc(db, "students", "ok"), obj);
    }

    return (
        <>
        <Navbar />
        <h1>Student Directory</h1>
        <Grid container direction="row" alignItems="center" justifyContent="center">
            <p>Add Student: </p>
            <IconButton onClick={e => addClick(e)}>
                <AddReactionIcon />
            </IconButton>
        </Grid>
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '10vh' }}>
            <List sx={{ ...commonStyles, borderRadius: '4px'}} component="nav" aria-label="mailbox folders">
                {
                    students.map((student) => {
                        console.log(student)
                        return (<EditStudent studentId={student.id} firstname={student.firstname} 
                            lastname={student.lastname} birthday={student.birthday} grade={student.grade}/>)
                    })
                }
            </List>
        </Grid>
        <Dialog open={isAddOpen}>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" inputRef={firstnameForm}
                id="firstname" label="First Name" type="text" fullWidth variant="standard"/>
                <TextField autoFocus margin="dense" inputRef={lastnameForm}
                id="lastname" label="Last Name" type="text" fullWidth variant="standard"/>
                <TextField autoFocus margin="dense" inputRef={gradeForm}
                id="grade" label="Grade" type="text" fullWidth variant="standard"/>
                <TextField autoFocus margin="dense" inputRef={birthdayForm}
                id="birthday" label="Birthday" type="text" fullWidth variant="standard"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={addClick}>Save</Button>
                <Button onClick={addClick}>Exit</Button>
            </DialogActions>
            </Dialog>
        </>
    );
}

export default StudentDirectory;