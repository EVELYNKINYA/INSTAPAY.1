import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from './pages/RegisterPage';
function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className='container'>
        <h1 className="page-header text-center">Login and Register</h1>

        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />}/>
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;