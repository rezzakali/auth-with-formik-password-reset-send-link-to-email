import { AtSignIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const forgotPassword = () => {
    navigate('/forgot-password');
  };

  const goRegister = () => {
    navigate('/register');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      // rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email required!'),

      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'Enter the registed password!'
        )
        .required('Password is required!'),
    }),

    onSubmit: (values) => {
      axios
        .post('http://localhost:5000/user/login', values, {
          withCredentials: 'include',
        })
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          if (res.status === 200) {
            Swal.fire({
              icon: 'success',
              title: 'Logged in success!',
            });
            setTimeout(() => {
              window.location.reload(true);
              navigate('/home');
            }, 500);
          }
          if (res.status === 400) {
            Swal.fire({
              icon: 'warning',
              title: 'Every field must be filled!',
            });
          }
          if (res.status === 404) {
            Swal.fire({
              icon: 'error',
              title: 'User does not exists!',
            });
          }
          if (res.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Invalid password!',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Logged in failed!',
          });
        });
    },
  });
  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading
              size={useBreakpointValue({ base: 'xs', md: 'sm', lg: 'xl' })}
            >
              Sign in to your account
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          bg={useColorModeValue('gray.50', 'gray.700')}
        >
          <Stack spacing="6">
            <Stack spacing="5">
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={4} align="flex-start">
                  <FormControl
                    isInvalid={formik.errors.email && formik.touched.email}
                    isRequired
                  >
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <InputGroup>
                      <Input
                        name="email"
                        type="email"
                        variant="filled"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        placeholder="your email address"
                      />
                      <InputRightElement h={'full'}>
                        <Box variant={'ghost'}>
                          <AtSignIcon />
                        </Box>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={
                      formik.errors.password && formik.touched.password
                    }
                    isRequired
                  >
                    <FormLabel htmlFor="password">Password</FormLabel>
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
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  </FormControl>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox
                      name="rememberMe"
                      onChange={formik.handleChange}
                      isChecked={formik.values.rememberMe}
                      colorScheme="purple"
                    >
                      Remember me?
                    </Checkbox>

                    <Link color={'blue.400'} ml="70px" onClick={forgotPassword}>
                      Forgot Password
                    </Link>
                  </div>
                  <Button type="submit" colorScheme="purple" width="full">
                    Sign in
                  </Button>
                </VStack>
              </form>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Don't have an account ?{' '}
              <Link color={'blue.400'} onClick={goRegister}>
                sign up
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default SignUp;
