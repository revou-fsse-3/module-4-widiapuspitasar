import { useState, useContext } from 'react';
import { Input, Text, Button, Card } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { AppContext, ContextType } from '../../../Provider';

interface DataProps {   
  email: string;
  password: string;

}
const Login = () => {
  const [selectedUser] = useState<DataProps>();
  const context = useContext<ContextType>(AppContext)
  const setOpen = context?.setOpen
  const setMessage = context?.setMessage


  const handleError = (message: string) => {
      setOpen?.(true)
      setMessage?.(message)
  }

  const navigate = useNavigate();

  // Setelah berhasil login
    const handleLogin = async (data: DataProps) => {
        try {
            const response = await axios.post('https://mock-api.arikmpt.com/api/user/login', {
                email: data.email,
                password: data.password
            });

            // Simpan token di local storage
            window.localStorage.setItem('token', response.data.data.token);

            navigate('/list');
        } catch (error) {
            const err = error as AxiosError as any;
            const errors = err.response?.data?.errors;
            if (Array.isArray(errors)) {
                return;
            }
            handleError(errors);
        }
    }; 

  const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleLogin,
        validationSchema: yup.object({
            email: yup.string().email("Email is not valid").required("Email is required"),
            password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character').required('Please enter the password'),
        }),
        enableReinitialize: true
    });

    const handleRegister = () => {
      navigate('/register');
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <Card border={false} >
      <form onSubmit={formik.handleSubmit} className="color-red mx-auto max-w-md">
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
        
      </form>
    </Card>
    </div>
    
  );
};

export default Login;
