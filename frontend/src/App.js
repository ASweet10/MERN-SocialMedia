import './index.css'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import ProfilePage from 'pages/ProfilePage'
import RegisterPage from 'pages/RegisterPage'
import { useSelector } from 'react-redux'

function App() {
  const mode = useSelector((state) => state.mode)
  const authorized = Boolean(useSelector((state) => state.token))

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<LoginPage />} />
          
          <Route path="/home" element={ authorized ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/register" element={ authorized ? <HomePage /> : <RegisterPage />} />
          <Route path="/profile/:userId" element={ authorized ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
