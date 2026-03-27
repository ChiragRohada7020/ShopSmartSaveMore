import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext'; // Assuming you have an auth context

const Logout = () => {
 const navigate = useNavigate();
const { logout } = useAuth();
logout();
navigate('/');

}

export default Logout;