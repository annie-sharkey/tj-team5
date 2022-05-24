import React from "react";
import Navbar from "../Navbar.js";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TJES from './images/TJES.JPG'
import {Grid, Button, Card} from '@mui/material';

const Home = (props) => {

    const btn = {
        border: "2px solid black",
        backgroundColor: "white",
        color: "dodgerblue",
        padding: "14px 28px",
        fontSize: "16px",
        cursor: "pointer",
        borderColor: "#2196F3",
    };

    return (
        <>
            <Navbar/>
            <h1>Home Page</h1>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Button style={btn}>Testing</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button style={btn}>Testing</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button style={btn}>Testing</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button style={btn}>Testing</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Home;