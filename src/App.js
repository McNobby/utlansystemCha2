import React from 'react'
import TopBar from './Components/topBar'
import './styles/main.css'
import Routes from './Components/Routes';
import { useLogin } from './loginContext';

import TeacherLogin from './Components/TeacherLogin';
import Plassering from './Components/Plassering';


function App() {

  const isLoggedIn = useLogin()

  return (
  <div className="app">
      
        <TopBar />
          {isLoggedIn.plassering ? "" : <Plassering />}
          {isLoggedIn.teacher ? <Routes /> : <TeacherLogin />}
       
      
  </div>
  );
}

export default App;
