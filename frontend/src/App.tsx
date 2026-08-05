import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Chat from "./pages/Chat.tsx";
import PrivateRoute from './components/PrivateRoute.tsx';
import './App.css'
import SetupIdentity from './pages/SetupIdentity.tsx';

const hasUser = localStorage.getItem("username") !== null;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element=
          {
            hasUser ? <Navigate to="/chat"/> : <Navigate to="/setup"/>
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
