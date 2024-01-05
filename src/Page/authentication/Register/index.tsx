import React, { useState } from 'react';
import { Input, Text, Button, Card } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import axios, { AxiosError } from "axios";

interface RegisterProps {
  data: { name: string; email: string; password: string };
  onChange: (data: any) => void;
  onSubmit: () => void;
}

const Register: React.FC<RegisterProps> = ({ data, onSubmit }) => {
  const [apiError, setApiError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: data.name || '',
      email: data.email || '',
      password: data.password || '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('https://mock-api.arikmpt.com/api/user/register', {
          username: values.name,
          email: values.email,
          password: values.password,
        });
        console.log(response.data);
        resetForm();
        onSubmit(); 
      } catch (error) {
        console.error(error);
      
        const err = error as AxiosError<any>;
        if (err.response) {
          if (err.response.status === 400) {
            const validationErrors = err.response.data.errors;
            if (validationErrors) {
              console.error(validationErrors);
              setApiError('Validation error. Please check your input.');
              return;
            }
          }
      
          setApiError(err.response.data.message || 'An error occurred');
        } else {
          setApiError('An unexpected error occurred.');
        }
      }
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().email("Email is not valid").required("Email is required"),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character').required('Please enter the password'),
    }),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null); 
    formik.handleSubmit();
  };

  return (
    <Card border = {false}>
      <form onSubmit={handleFormSubmit} className="color-red mx-auto max-w-md">
        <Text className="text-blue-500 text-2xl font-bold p-4">{'Please Register To Have Account'}</Text>
        <div>
          <Text>{'Name'}</Text>
          <Input
            name={'name'}
            value={formik.values.name}
            onChange={formik.handleChange('name')}
              />
            {formik.errors.name && (
              <Text className="text-red-600 text-xs">{formik.errors.name}</Text>
          )}
        </div>
        <div>
          <Text>{'Email'}</Text>
          <Input
            className="block border-neutral-400 border w-full p-2"
            name={'email'}
            value={formik.values.email}
            onChange={formik.handleChange('email')}
          />
          {formik.errors.email && (
            <Text className="text-red-600 text-xs">{formik.errors.email}</Text>
          )}
        </div>
        <div>
          <Text>{'Password'}</Text>
          <Input
            className="block border-neutral-400 border w-full p-2"
            name={'password'}
            value={formik.values.password}
            onChange={formik.handleChange('password')}
            type="password"
          />
          {formik.errors.password && (
            <Text className="text-red-600 text-xs">{formik.errors.password}</Text>
          )}
        </div>
        <Button label={'Register'} type={'submit'} disabled={!formik.isValid} />
        {apiError && (
          <Text className="text-red-600 text-xs">{apiError}</Text>
        )}
      </form>
    </Card>
  );
};

export default Register;
