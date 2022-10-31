import { Box } from '@chakra-ui/react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Login from './components/Login';
import NewPassword from './components/NewPassword';
import Register from './components/Register';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Box m={[3, 5]}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password/:id/:token" element={<NewPassword />} />
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/" replace={true} />}
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Box>
  );
}

export default App;
