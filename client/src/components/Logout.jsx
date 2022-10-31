import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Logout() {
  const navigate = useNavigate();

  const logout = () => {
    axios
      .delete('http://localhost:5000/user/logout', {
        withCredentials: 'include',
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('token');
          Swal.fire({
            icon: 'success',
            title: 'Logout success!',
          });
          setTimeout(() => {
            navigate('/');
          }, 200);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Logout failed. Please try later!',
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Logout failed!',
          text: 'Logout failed. Please try later!',
        });
      });
  };
  return (
    <Box>
      <Button onClick={logout}>Logout</Button>
    </Box>
  );
}

export default Logout;
