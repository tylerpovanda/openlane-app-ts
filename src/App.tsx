import React from 'react';
import './App.css';
import Login from './components/login';
import SignUp from './components/signup';
import Profile from './components/profile';
import EditProfile from './components/editProfile';
import {
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
  );
}

export default App;
