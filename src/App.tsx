import React from 'react';
import logo from './logo.svg';
import { Link, Outlet} from 'react-router-dom';
import './App.css';
import Main from './Routes/Main';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import 'tailwindcss/tailwind.css';



function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
