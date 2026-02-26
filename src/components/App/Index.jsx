
import React from 'react'
import '../../App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../Header/Index'
import Landing from '../Landing/Index'
import Footer from '../Footer/Index'
import Welcome from '../Welcome/Index'
import Login from '../Login/Index'
import Signup from '../Signup/Index'
import ErrorPage from '../ErrorPage/Index'
import ForgetPassword from '../ForgetPassord'


function App() {


  return (
    <Router>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Landing/>} />
        <Route path='/Welcome' element={<Welcome/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Signup' element={<Signup/>} />
        <Route path='/ForgetPassword' element={<ForgetPassword/>}/>
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
      <Footer/>
    </Router>
    
  )
}

export default App
