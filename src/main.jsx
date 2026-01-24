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
import Edgecase from './components/ZEdgecase/Edgecase.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* Public Routes */}
      <Route path='' element={<Home />} />
      <Route path='community' element={<Community />} />
      <Route path='get-started' element={<GetStarted />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      {/* Protected Routes */}
      <Route path='resources' element={<ProtectedRoute><Resources /></ProtectedRoute>} />
      <Route path='learningpaths' element={<ProtectedRoute><LearningPaths /></ProtectedRoute>} />
      <Route path='achievements' element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
      <Route path='dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      {/* 404 */}
      <Route path='*' element={<Edgecase />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)