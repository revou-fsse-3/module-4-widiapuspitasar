import React, { useState } from 'react';
import { Input, Text, Button, Card } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

interface LoginProps {
  data: { email: string; password: string };
  onChange: (data: any) => void;
  onSubmit: () => void;
}

const Login: React.FC<LoginProps> = ({ data, onSubmit }) => {
  const [apiError, setApiError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: data.email || '',
      password: data.password || '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post('https://mock-api.arikmpt.com/api/user/login', {
          email: values.email,
          password: values.password,
        });

        // Assuming the API returns a success message or token
        console.log(response.data);
        
        // Reset the form
        resetForm();
        
        // Trigger the parent component's onSubmit
        onSubmit(); 
      } catch (error) {
        const err = error as AxiosError<any>; // Use 'any' as the error response type
        setApiError(err.response?.data?.message || 'An error occurred');
      }
    },
    validationSchema: yup.object({
      email: yup.string().email("Email is not valid").required("Email is required"),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character').required('Please enter the password'),
    }),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null); // Clear previous API error
    formik.handleSubmit();
  };

  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <Card border={false} >
      <form onSubmit={handleFormSubmit} className="color-red mx-auto max-w-md">
        <Text className="text-blue-500 text-2xl font-bold p-4">{'Please Login To Continue'}</Text>
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
        <Button label={'Log In'} type={'submit'} disabled={!formik.isValid} />
        <h1>OR</h1>
        <Button label={'Sign Up'} onClick={handleRegister} additionalStyle="bg-white text-black border border-black" />
        
        {apiError && (
            <Text className="text-red-600 text-xs">{apiError}</Text>
          )}
        
      </form>
    </Card>
    </div>
    
  );
};

export default Login;
