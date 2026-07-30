import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'
import ResetPassword from './components/Auth/ResetPassword.jsx'
import ForgotPassword from './components/Auth/ForgotPassword.jsx'
import Home from './pages/Home/Home.jsx'
import Resources from './pages/Resources/Resources.jsx'
import LearningPaths from './pages/LearningPaths/LearningPaths.jsx'
import Achievements from './pages/Achievements/Achievements.jsx'
import Community from './pages/Community/Community.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Courses from './pages/Courses/Courses.jsx'
import MyCourses from './pages/Mycourse/MyCourses.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Settings  from './pages/Settings/AccountSettings.jsx'
import Loader from './components/Other/Loader.jsx'
import Edgecase from './components/Other/Edgecase.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { ToastProvider } from "./components/Other/ToastContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      {/* Standalone Route: Home loads WITHOUT the Layout (No Header/Footer) */}
      <Route path='' element={<Home />} />
      {/* Authentication Routes: Usually also standalone (No Header/Footer) */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path='loader' element={<Loader />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
      {/* Protected Routes: Wrapped INSIDE the Layout (Header + Outlet + Footer) */}
      <Route element={<Layout />}>
        <Route path='dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='resources' element={<ProtectedRoute><Resources /></ProtectedRoute>} />
        <Route path='learningpaths' element={<ProtectedRoute><LearningPaths /></ProtectedRoute>} />
        <Route path='achievements' element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
        <Route path='courses' element={<ProtectedRoute><Courses /></ProtectedRoute>} />
        <Route path='mycourses' element={<ProtectedRoute><MyCourses /></ProtectedRoute>} />
        <Route path='community' element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path='settings' element={<ProtectedRoute><Settings /></ProtectedRoute>}/>
        <Route path='profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
      </Route>
      {/* 404 */}
      <Route path='*' element={<Edgecase />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>,
)