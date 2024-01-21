import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

const EditProfile = () => {
  // Get location state from Login Screen
  const location = useLocation();
  const locationState = location.state;
  const obj = JSON.parse(locationState.user);
  const navigate = useNavigate();
  
  // State for Favorite Color Selection
  const [favCol, setFavCol] = useState(obj.favoriteColor);

  const handleChange = (event: SelectChangeEvent) => {
    setFavCol(event.target.value as string);
  };

  const handleLogout = () => {
    navigate('/');
  }

  const handleCancel = () => {
    navigate('/profile', { state: { user: locationState.user } }); 
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
    // De-String User List
    const oldUsersObj = JSON.parse(localStorage.getItem('users') || '[]');

    // If User Array is empty
    if(oldUsersObj.length === 0) {
      // Push new User to User List
      oldUsersObj.push(newUser);
      // Stringify New User List
      localStorage.setItem('users', JSON.stringify(oldUsersObj));  
      // Redirect to Login Screen
      navigate('/profile', { state: { user: locationState.user } }); 
      return;
    }

    // Use index from locationState to update user details
    oldUsersObj[locationState.index] = newUser;
    localStorage.setItem('users', JSON.stringify(oldUsersObj));  
    navigate('/profile', { state: { user: JSON.stringify(newUser) } });  
  };

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
          <Typography component="h1" variant="h5" style={{color: obj.favoriteColor}}>
              Edit {obj.fullName}'s Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="full-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  autoFocus
                  defaultValue={obj.fullName}
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
                  defaultValue={obj.email}
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
                  defaultValue={obj.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phoneNumber"
                  label="Phone Number"
                  id="phoneNumber"
                  autoComplete="phone-number"
                  defaultValue={obj.phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="favoriteColor-label">Favorite Color</InputLabel>
                  <Select
                    required
                    defaultValue={obj.favoriteColor}
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
                  Save Changes
                </Button>
                <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleCancel}>
                  Cancel
            </Button>
            <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default EditProfile;