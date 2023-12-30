import { useEffect, useState } from 'react';
import './App.css'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { Chat, Header } from '../utils/import.js';
import { getToken, getUser } from '../utils/localStorage.js';
import { Navigate } from 'react-router-dom';

function App() {
  // get user data from localStorage
  const [user, setUser] = useState(getUser());
  return (
    <>
      <AuthContextProvider value={user}>
        <Header />
        <Chat />
      </AuthContextProvider>
    </>
  )
}

export default App
