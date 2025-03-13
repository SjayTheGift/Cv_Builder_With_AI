import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { AuthProvider } from './AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordRestPage from './pages/PasswordRestPage';
import PasswordConfirmPage from './pages/PasswordConfirmPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import Resume from './pages/Resume';
import Layout from './components/Layout'; // Import your Layout component
import ProtectedRoute from './utils/ProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<ProtectedRoute><HomePage /></ProtectedRoute>} /> 
              <Route path="/resume" element={<ProtectedRoute><Resume /></ProtectedRoute>}/>
              <Route path="/update-profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/password-rest" element={<PasswordRestPage />} />
          <Route path="/password-confirm-rest" element={<PasswordConfirmPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
}

export default App;