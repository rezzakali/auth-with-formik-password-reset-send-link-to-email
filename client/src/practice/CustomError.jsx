import { ErrorMessage } from 'formik';
import React from 'react';

function CustomError({ name }) {
  return (
    <div style={{ color: 'red' }}>
      <ErrorMessage name={name} />
    </div>
  );
}

export default CustomError;
