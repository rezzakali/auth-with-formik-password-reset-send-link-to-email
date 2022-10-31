import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email required!'),
    }),
    onSubmit: (values, { resetForm }) => {
      axios
        .post('http://localhost:5000/password/forgot-password', values, {
          withCredentials: 'include',
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          if (err.code === 'ERR_BAD_REQUEST') {
            Swal.fire({
              icon: 'success',
              title: 'We sent a password reset link to your email id!',
            });
            resetForm();
          }
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
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <FormControl
            id="email"
            isInvalid={formik.errors.email && formik.touched.email}
            isRequired
          >
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: 'gray.500' }}
              name="email"
              type="email"
              variant="filled"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <Stack spacing={6} mt="25px">
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
            >
              Request Reset
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
