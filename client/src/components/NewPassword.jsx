/* eslint-disable react-hooks/exhaustive-deps */
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { id, token } = useParams();

  const fetchResetPasswordUserResponseViaParams = async () => {
    const res = await axios.get(
      `http://localhost:3000/change-password/${id}/${token}`
    );
    console.log(res);
  };

  useEffect(() => {
    fetchResetPasswordUserResponseViaParams();
  }, []);

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'password must be contain at least 8 characters with one upper case , one lower case, one digit ,one special character!'
        )
        .required('Password is required!'),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(
          `http://localhost:5000/password/change-password/${id}/${token}`,
          values,
          {
            withCredentials: 'include',
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'password changed successfully!',
            });
            setTimeout(() => {
              navigate('/');
            }, 200);
          }
          if (res.status === 404 || 400) {
            Swal.fire({
              icon: 'success',
              title: 'password updated successfully!',
            });
          }
        })
        .catch((err) => {
          if (err.code === 'ERR_BAD_REQUEST')
            Swal.fire({
              icon: 'success',
              title: 'password updated successfully!',
            });
        });
    },
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Enter new password
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            id="password"
            isInvalid={formik.errors.password && formik.touched.password}
            isRequired
          >
            <FormLabel>New Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                placeholder="********"
              />
              <InputRightElement h={'full'}>
                <Box
                  variant={'ghost'}
                  onClick={() =>
                    setShowPassword((showPassword) => !showPassword)
                  }
                >
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Box>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <br />
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
