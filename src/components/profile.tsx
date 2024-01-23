import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';

// Styling for Modal
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
  // State for modal
  const [open, setOpen] = useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);
  
  // Get location state from Login Screen
  const location = useLocation();
  const currentUser = JSON.parse(location.state.user); // Get object from locationState string
  const userList = JSON.parse(localStorage.getItem("users") || '[]'); // Get object from list of users in local storage
  const navigate = useNavigate();

  const handleLogout = (): void => {
    navigate('/');
  }

  const handleDelete = (): void => {
    // Iterate through array to delete current user from user array
    for (let i = 0; i < userList.length; i++) {
      if(currentUser.email === userList[i].email) { 
        userList.splice(i, 1);
        localStorage.setItem('users', JSON.stringify(userList)); // Store new list of users after delete
      }
    };
    handleLogout();
  };

  const handleEdit = (): void => {
    // Get index to send with navigation
    let index = 0;
    let emailFound:boolean = false;
    for (let i = 0; i < userList.length; i++) {
      if(currentUser.email === userList[i].email) { 
        index = i;
        emailFound = true;
      } 
    };
    // If email isn't found, then profile cannot be edited
    if(!emailFound) {
      return;
    }
    // Proceed to edit profile, passing index of the current user in user list
    navigate('/editprofile', { state: { user: JSON.stringify(currentUser), index: index } }); 
  };

  // ------------------------------
  // Create data table
  //
  function createData(
    name: string,
    value: string,
  ) {
    return { name, value };
  }
  
  const rows = [
    createData('Full Name', currentUser.fullName),
    createData('Email', currentUser.email),
    createData('Password', currentUser.password),
    createData('Phone Number', currentUser.phoneNumber),
    createData('Favorite Color', currentUser.favoriteColor)
  ];
  // ------------------------------
  
  return (
    <div>
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5" style={{color: currentUser.favoriteColor}}>
            {currentUser.fullName}'s Profile
          </Typography>

          <center>
            <TableContainer component={Paper}>
              <Table sx={{ maxWidth: 1200 }} aria-label="simple table">
                <TableHead>
                  <TableRow>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleEdit}>
              Edit Profile
            </Button>
            <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleOpen}>
                  Delete Profile
                </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Are you sure you want to delete your profile?
                </Typography>
                <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleDelete}>
                  Confirm
                </Button>
                <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            </Modal>
            <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleLogout}>
              Logout
            </Button>
            </TableContainer>
          </center>
        </Box>
    </div>
  )
}

export default Profile;