import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import ChatPlatform from './pages/ChatPlatform';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } 
          />
          <Route path="/chatting/:roomId/:userName" element={
          <PrivateRoute>
            <ChatPlatform />
          </PrivateRoute>
        } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
