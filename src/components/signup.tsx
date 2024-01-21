import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

const defaultTheme = createTheme();

const SignUp = () => {
  const [favCol, setFavCol] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validFullName, setValidFullName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [missingRequiredFields, setMissingRequiredFields] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setFavCol(event.target.value as string);
  };

  // State for checking against invalid Email Address
  const [invalidEmail, setInvalidEmail] = useState(false)
  const navigate = useNavigate();

  const validateEmail = (event:any) => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }

  const validateFullName = (event:any) => {
    if(event.target.value.length<4) {
      setValidFullName(true);
    } else {
      setValidFullName(false);
    }
  }

  const validatePassword = (event:any) => {
    let pw = event.target.value;
    let pwLowerCaseCt = pw.length - pw.replace(/[a-z]/g, '').length;
    let pwUpperCaseCt = pw.length - pw.replace(/[A-Z]/g, '').length;
    let pwNumCt = pw.replace(/[^0-9]/g,"").length;
    let pwSpecialCt = pw.length - pwLowerCaseCt - pwUpperCaseCt  - pwNumCt;

    if(pw.length<10 || 
        pw.length>32 ||
        pwUpperCaseCt<2 ||
        pwNumCt<2 ||
        pwSpecialCt<=0
        ) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent Default
    const data = new FormData(event.currentTarget); // Get data from form
    // New User object
    const newUser = {
      fullName: data.get('fullName'),
      email: data.get('email'),
      password: data.get('password'),
      phoneNumber: data.get('phoneNumber'),
      favoriteColor: favCol
    }
     
    // Missing Required Fields
    if(newUser.fullName === '' ||
        newUser.email === '' ||
        newUser.password === '' ||
        newUser.favoriteColor === '') { 
      setMissingRequiredFields(true);
      return;
    }

    // If all required fields are present:
    setMissingRequiredFields(false);
    // De-String User List
    const oldUsersObj = JSON.parse(localStorage.getItem('users') || '[]');

    // If User Array is empty
    if(oldUsersObj.length === 0) {
      // Push new User to User List
      oldUsersObj.push(newUser);
      // Stringify New User List
      localStorage.setItem('users', JSON.stringify(oldUsersObj));  
      // Redirect to Login Screen
      navigate('/'); 
      return;
    }

    // Check if email has already been used
    for (let i = 0; i < oldUsersObj.length; i++) {
      if(newUser.email === oldUsersObj[i].email) { 
        console.log("Email is already in use!");
        setInvalidEmail(true);
        return;
      } 
    };

    // If it hasn't been used, then the user can sign up
    oldUsersObj.push(newUser); // Push new User to User List
    // Stringify New User List
    localStorage.setItem('users', JSON.stringify(oldUsersObj));  
    // Redirect to Login Screen
    navigate('/');
  };
  
  // ------------------------
  // Debugging
  // 
  const getLocalStorage = () => {
    const getUser = localStorage.getItem("users");
    console.log(getUser);
  }
  const clearLocalStorage = () => {
    localStorage.setItem('users', '[]');
    console.log(localStorage.getItem('users')); 
  }
  // ------------------------

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              {invalidEmail &&
                <center>
                  <span style={{color:'red', fontSize: '12px'}}>
                    Email is already in use, please choose another
                  </span>
                </center>
              }
              {missingRequiredFields &&
                <center>
                  <span style={{color:'red', fontSize: '12px'}}>
                    Please enter all required fields
                  </span>
                </center>
              }
                <TextField
                  autoComplete="full-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  onChange={validateFullName}
                  error={validFullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={validateEmail}
                  error={validEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={validatePassword}
                  error={validPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="phone-number"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="favoriteColor-label">Favorite Color</InputLabel>
                  <Select
                    required
                    labelId="favoriteColor-label"
                    id="favoriteColor"
                    value={favCol}
                    label="Favorite Color"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Blue'}>Blue</MenuItem>
                    <MenuItem value={'Red'}>Red</MenuItem>
                    <MenuItem value={'Green'}>Green</MenuItem>
                    <MenuItem value={'Yellow'}>Yellow</MenuItem>
                    <MenuItem value={'Purple'}>Purple</MenuItem>
                    <MenuItem value={'Black'}>Black</MenuItem>
                    <MenuItem value={'Orange'}>Orange</MenuItem>
                  </Select>
                </FormControl>

              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={getLocalStorage}
            >
              get local storage
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={clearLocalStorage}
            >
              clear local storage
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <br/>
    </ThemeProvider>
  );
}

export default SignUp;