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
import Edgecase from './components/Other/Edgecase.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import ResetPassword from './components/Auth/ResetPassword.jsx'
import ForgetPassword from './components/Auth/ForgotPassword.jsx'
import { ToastProvider } from "./components/Other/ToastContext.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      {/* Standalone Route: Home loads WITHOUT the Layout (No Header/Footer) */}
      <Route path='' element={<Home />} />
      {/* Authentication Routes: Usually also standalone (No Header/Footer) */}
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="forget-password" element={<ForgetPassword />} />
      <Route path="reset-password" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
      {/* Protected Routes: Wrapped INSIDE the Layout (Header + Outlet + Footer) */}
      <Route element={<Layout />}>
        <Route path='dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='resources' element={<ProtectedRoute><Resources /></ProtectedRoute>} />
        <Route path='learning-paths' element={<ProtectedRoute><LearningPaths /></ProtectedRoute>} />
        <Route path='achievements' element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
        <Route path='community' element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path='get-started' element={<ProtectedRoute><GetStarted /></ProtectedRoute>} />
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