import { useState, useContext } from 'react';
import { Input, Text, Button, Card } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import axios, { AxiosError } from "axios";
import { AppContext, ContextType } from '../../../Provider';
import { useNavigate } from 'react-router-dom';

interface DataProps {
    name: string;
    email: string;
    password: string;
}

const Register = () => {

  const navigate = useNavigate();
  const context = useContext<ContextType>(AppContext);
  const setOpen = context?.setOpen;
  const setMessage = context?.setMessage;


  const handleError = (message: string) => {
      setOpen?.(true)
      setMessage?.(message)
  }

  const [selectedUser] = useState<DataProps>();

  const formMik = useFormik ({
    initialValues: selectedUser ?? {
        name: '',
        email: '',
        password: '',
    },
    onSubmit: async (data: DataProps) => {
        try {
            await axios.post('https://mock-api.arikmpt.com/api/user/register', {
                name: data.name,
                email: data.email,
                password: data.password
            })

            navigate('/list');
        } catch (error) {
            const err = error as AxiosError as any
            const errors = err.response?.data?.errors
            if(Array.isArray(errors)) {
                return
            }
            handleError(errors)
        }
        
    },

    validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().email('Email is not valid').required('Email is required'),
            password: yup
              .string()
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character'
              )
              .required('Please enter the password'),
          }),
        });
      
  return (
    <Card border = {false}>
      <form onSubmit={formMik.handleSubmit} className="color-red mx-auto max-w-md block border-neutral-400 border w-full p-2">
        <Text className="text-blue-500 text-2xl font-bold p-4">{'Please Register To Have Account'}</Text>
        <div>
          <Text>{'Name'}</Text>
          <Input
            name={'name'}
            value={formMik.values.name}
            onChange={formMik.handleChange('name')}
              />
            {formMik.errors.name && (
              <Text className="text-red-600 text-xs">{formMik.errors.name}</Text>
          )}
        </div>
        <div>
          <Text>{'Email'}</Text>
          <Input
            className="block border-neutral-400 border w-full p-2"
            name={'email'}
            value={formMik.values.email}
            onChange={formMik.handleChange('email')}
          />
          {formMik.errors.email && (
            <Text className="text-red-600 text-xs">{formMik.errors.email}</Text>
          )}
        </div>
        <div>
          <Text>{'Password'}</Text>
          <Input
            className="block border-neutral-400 border w-full p-2"
            name={'password'}
            value={formMik.values.password}
            onChange={formMik.handleChange('password')}
            type="password"
          />
          {formMik.errors.password && (
            <Text className="text-red-600 text-xs">{formMik.errors.password}</Text>
          )}
        </div>
        <Button label={'Register'} type={'submit'} disabled={!formMik.isValid} />
      </form>
    </Card>
  );
};

export default Register;
