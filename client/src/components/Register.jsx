import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
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
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import PreviewProfile from './PreviewProfile';

function SignUp() {
  const fileRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const goLogin = () => {
    navigate('/');
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      file: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(
          20,
          'Your name must be 5 characters long and less than 20 characters'
        )
        .required('Your must be required!'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email required!'),
      phone: Yup.string()
        .matches(
          /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/,
          'Phone number must be an indian'
        )
        .required('Phone number must be required!'),
      password: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          'password must be contain at least 8 characters with one upper case , one lower case, one digit ,one special character!'
        )
        .required('Password is required!'),
      file: Yup.string().required('Profile is required!'),
    }),

    onSubmit: (values) => {
      const formData = new FormData();

      formData.append('email', values.email);
      formData.append('password', values.password);
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('file', values.file);

      axios
        .post('http://localhost:5000/user/register', formData, {
          'Content-Type': 'multipart/form-data',
        })
        .then((res) => {
          if (res.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Registered success',
            });
            setTimeout(() => {
              navigate('/');
            }, 200);
          }
        })
        .catch((err) => {
          if (err.code === 'ERR_BAD_REQUEST') {
            Swal.fire({
              icon: 'error',
              title: 'Email id already exists!',
            });
          }
        });
    },
  });
  return (
    <Container maxW="lg" py={{ base: '', md: '5' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading
              size={useBreakpointValue({ base: 'xs', md: 'sm', lg: 'xl' })}
            >
              Sign up
            </Heading>
            <HStack spacing="1" justify="center">
              <Text>to enjoy all of our cool features ✌️</Text>
            </HStack>
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
                    isInvalid={formik.errors.name && formik.touched.name}
                    isRequired
                  >
                    <FormLabel htmlFor="name">Your Name</FormLabel>
                    <Input
                      name="name"
                      type="name"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      placeholder="your full name"
                    />
                    <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={formik.errors.email && formik.touched.email}
                    isRequired
                  >
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      placeholder="your email address"
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={formik.errors.phone && formik.touched.phone}
                    isRequired
                  >
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      name="phone"
                      type="phone"
                      variant="filled"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      onBlur={formik.handleBlur}
                      placeholder="+91"
                    />
                    <FormErrorMessage>{formik.errors.phone}</FormErrorMessage>
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
                  <FormControl isRequired>
                    <FormLabel htmlFor="file">Profile</FormLabel>
                    {formik.values.file && (
                      <PreviewProfile file={formik.values.file} />
                    )}

                    <input
                      hidden
                      ref={fileRef}
                      type="file"
                      name="file"
                      onChange={(event) => {
                        formik.setFieldValue('file', event.target.files[0]);
                      }}
                    />
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        float: 'right',
                        marginTop: '-40px',
                      }}
                    >
                      <Button
                        type="button"
                        onClick={() => {
                          fileRef.current.click();
                        }}
                      >
                        Upload Profile
                      </Button>
                    </Box>
                  </FormControl>
                  <Button type="submit" colorScheme="purple" width="full">
                    Sign up
                  </Button>
                </VStack>
              </form>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Already a user ?{' '}
              <Link color={'blue.400'} onClick={goLogin}>
                Login
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

export default SignUp;
