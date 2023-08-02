import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomeScreen from './screens/HomeScreen'
import RegisterScreen from './screens/RegisterScreen'
import { Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/LoginScreen'
import ChatPage from './screens/ChatPage'
import SideDrawer from './components/SideDrawer'
import store from './store'
import { register } from './slices/userSlice'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path='login' element={<LoginScreen /> } />

        <Route path='/chat' element={<ChatPage/>} />
        <Route path='/sd' element={<SideDrawer />} />
    </Routes>

    

    </>
  )
}

export default App
