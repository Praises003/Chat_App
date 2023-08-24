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
import CreateGroupComponent from './components/CreateGroupComponent'
import GroupProfile from './components/GroupProfile'


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
        <Route path='/group' element={<CreateGroupComponent />} />
        <Route path='/groupprofile' element={<GroupProfile />} />
    </Routes>

    

    </>
  )
}

export default App
