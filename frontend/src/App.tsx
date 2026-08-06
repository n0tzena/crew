import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Chat from "./pages/Chat.tsx";
import PrivateRoute from './components/PrivateRoute.tsx';
import { useUser } from './context/UserContext.tsx';
import './App.css';
import SetupIdentity from './pages/SetupIdentity.tsx';

function Navbar()
{

  const { user } = useUser();

  function renderUser()
  {
    if(!user) return null;

    return (
      <a href='/setup' className='navbarProfile'>
        <span>{user.username}</span>
        <img src={user.avatar}></img>
      </a>
    );
  }

  return (
    <nav>
      <h1>crew</h1>
      {renderUser()}
    </nav>
  )
}

function App() {

  const { user } = useUser();

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element=
          {
            user ? <Navigate to="/chat"/> : <Navigate to="/setup"/>
          }
        />
        <Route path='/setup' element={<SetupIdentity />}/>
        <Route path='/chat' element={
          <PrivateRoute>
            <Chat />            
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
