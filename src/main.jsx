import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Resources from './components/Resources/Resources.jsx'
import LearningPaths from './components/Learning Paths/LearningPaths.jsx'
import Achievements from './components/Achievements/Achievements.jsx'
import Community from './components/Community/Community.jsx'
import GetStarted from './components/Get Started/GetStarted.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='resources' element={<Resources />} />
      <Route path='learningpaths' element={<LearningPaths />} />
      <Route path='achievements' element={<Achievements />} />
      <Route path='community' element={<Community />} />
      <Route path='get-started' element={<GetStarted />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path='*' element={<div>Not Found</div>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)