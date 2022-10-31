import {
  Button,
  Center,
  Flex,
  FormControl,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmailForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    onSubmit: (values) => {
      console.log(values);
      navigate('/login');
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
        maxW={'sm'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: 'sm', sm: 'md' }}
          fontWeight="bold"
          color={useColorModeValue('gray.800', 'gray.400')}
        >
          username@mail.com
        </Center>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <Center>
              <HStack>
                <PinInput
                  autoFocus
                  isRequired
                  onChange={formik.handleChange}
                  type="number"
                >
                  <PinInputField
                    onChange={formik.handleChange}
                    value={formik.values.otp}
                  />
                  <PinInputField
                    onChange={formik.handleChange}
                    value={formik.values.otp}
                  />
                  <PinInputField
                    onChange={formik.handleChange}
                    value={formik.values.otp}
                  />
                  <PinInputField
                    onChange={formik.handleChange}
                    value={formik.values.otp}
                  />
                </PinInput>
              </HStack>
            </Center>
          </FormControl>
          <Stack spacing={6} mt="20px">
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              type="submit"
            >
              Verify
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
