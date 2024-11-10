import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Sidenav from './components/Sidenav'
import Main from './components/Main'
import Signup from './components/Signup'
import Login from './components/Login'
import { BackendContext } from './context/BackendContext'





const App = () => {
     
    const {user} = useContext(BackendContext)
    console.log(user)
 
   

  return (
    <div>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={user ? <Main/>:<Login/>}></Route>
      </Routes>
    
    </div>
  )
}

export default App