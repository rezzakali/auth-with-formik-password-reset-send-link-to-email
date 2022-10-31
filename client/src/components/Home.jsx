import { Avatar, Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Logout from './Logout';

function Home() {
  const token = localStorage.getItem('token');
  const [pic, setPic] = useState('');

  const fetchUser = () => {
    fetch(`http://localhost:5000/user/loggedin-user/${token}`)
      .then((response) => response.json())
      .then((json) => setPic(json));
  };
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box>
      <Heading>Hoem page</Heading>
      <Logout />
      <Avatar src={`http://localhost:5000/${pic.profile}`} />
      <br />
      <Text>Name: {pic && pic.name}</Text>
      <Text>Email: {pic && pic.email}</Text>
      <Text>Phone: {pic && pic.phone}</Text>
    </Box>
  );
}

export default Home;
