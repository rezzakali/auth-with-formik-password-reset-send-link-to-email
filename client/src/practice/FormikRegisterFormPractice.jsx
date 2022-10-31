// Render Prop
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import PreviewProfile from '../components/PreviewProfile';
import CustomError from './CustomError';

const validationSchema = Yup.object({
  name: Yup.string()
    .max(20, 'Your name must be 5 characters long and less than 20 characters')
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
});

const Register = () => {
  const fileRef = useRef(null);

  const handleSubmit = (values, { resetForm }) => {
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          email: '',
          password: '',
          phone: '',
          file: null,
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <label htmlFor="name">Full Name</label>
            <br />
            <Field type="text" name="name" placeholder="enter your name" />

            <CustomError name="name" />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <Field
              type="email"
              name="email"
              placeholder="enter your email address"
            />
            <CustomError name="email" />

            <br />
            <label htmlFor="phone">Phone</label>
            <br />
            <Field type="number" name="phone" placeholder="+91" />
            <CustomError name="phone" />

            <br />
            <label htmlFor="passwrod">Password</label>
            <br />
            <Field type="password" name="password" placeholder="password" />
            <CustomError name="password" />

            {values.file && <PreviewProfile file={values.file} />}
            <br />
            <input
              hidden
              ref={fileRef}
              type="file"
              name="file"
              onChange={(event) => {
                setFieldValue('file', event.target.files[0]);
              }}
            />
            <button
              type="button"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Upload Profile
            </button>
            <br />
            <br />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
