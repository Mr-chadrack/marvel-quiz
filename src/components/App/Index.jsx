
import React from 'react'
import '../../App.css'
import Header from '../Header/Index'
import Landing from '../Landing/Index'
import Footer from '../Footer/Index'
import Welcome from '../Welcome/Index'
import Login from '../Login/Index'
import Signup from '../Signup/Index'
import ErrorPage from '../ErrorPage/Index'


function App() {


  return (
    <div>
      <Header/>
      <Welcome/>
      <Landing/>
      <Login/>
      <Signup/>
      <ErrorPage/>
      <Footer/>

    </div>
  )
}

export default App
