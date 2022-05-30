import './App.css';
import React, { useState } from "react";

import MQTT from './components/MQTT';
import { Grid, Typography, Snackbar, Alert } from '@mui/material';



function App() {
  const [errorMsg, setErrorMsg] = useState("")
  const [open, setOpen] = useState(false);


  const snackBarOpen = (err) => {
    setErrorMsg(err)
    setOpen(true)
  }

  const snackBarClose = () => {
    setOpen(false);
  };

  return (
    <div className='App'>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={snackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert severity="error" variant="filled">
          {errorMsg}
        </Alert>
      </Snackbar>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" >MQTT Demonstration</Typography>
        </Grid>
        <Grid item xs={12}>
          <MQTT snackBar={snackBarOpen} />
        </Grid>

      </Grid>

    </div>
  );
}

export default App;
