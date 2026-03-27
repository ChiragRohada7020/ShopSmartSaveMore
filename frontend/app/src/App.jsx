import { useState } from 'react'
import Home from './components/Home/Home'
import Login from "./components/Auth/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Auth/Register';
import { AuthProvider } from './components/Context/AuthContext';
import  ProtectedRoute from "./components/Context/ProtectedRoute"
import CompareNow from "./components/Pages/CompareNow"

import HowItWorks from './components/Products/HowItWorks';
import SupportedStores from './components/Pages/SupportedStores';
import Cart from './components/Pages/Cart';
import Logout from './components/Auth/Logout';
import Navbar from './components/Header/Navbar';

import ForgotPassword from "./components/Auth/ForgotPassword"
import VerifyOTP from "./components/Auth/VerifyOTP"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AuthProvider>
      <Router>
        <Navbar /> {/* Navbar outside Routes to show on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<CompareNow />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/stores" element={<SupportedStores />} />
          <Route path="/cart" element={<Cart />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/verify-otp" element={<VerifyOTP />} />


          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoute />}>
       //ProtectedRoute will we here
        </Route>
      </Routes>
      </Router>
    </AuthProvider>
   
    </>
  )
}

export default App
