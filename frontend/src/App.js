import React, { useState } from 'react'
import Footer from './component/Footer/Footer'
import Header from './component/Header/Header'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import MyNotes from './MyNotes/MyNotes';
import LandingPage from './Screen/LandingPage/LandingPage'
import LoginScreen from './Screen/LoginScreen/LoginScreen';
import RegisterScreen from './Screen/RegisterScreen/RegisterScreen';
import CreateNote from './Screen/CreateNote/CreateNote';
import SingleNote from './Screen/SingleNote/SingleNote';
import ProfileScreen from './Screen/ProfileScreen/ProfileScreen';

function App () {
  const [ search, setSearch ] = useState( "" );
  return (
    <div className='app'>
      <BrowserRouter>
        <Header setSearch={ setSearch } />
        <main>
          <Routes>
            <Route path="/" element={ <LandingPage /> } />
            <Route path="/login" element={ <LoginScreen /> } />
            <Route path="/profile" element={ <ProfileScreen /> } />
            <Route path="/register" element={ <RegisterScreen /> } />
            <Route path="/mynotes/createnote" element={ <CreateNote /> } />
            <Route path="/note/:id" element={ <SingleNote /> } />
            <Route path="/mynotes" element={ <MyNotes search={ search } /> } />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App