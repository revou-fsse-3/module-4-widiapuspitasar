import { useState, useContext } from 'react';
import { Input, Text, Button, Card } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { AppContext, ContextType } from '../../../Provider';

// interface LoginProps {
//   data: { email: string; password: string };
//   onChange: (data: any) => void;
//   onSubmit: () => void;
// }

// const Login: React.FC<LoginProps> = ({ data, onSubmit }) => {
//   const [apiError, setApiError] = useState<string | null>(null);

//   const formik = useFormik({
//     initialValues: {
//       email: data.email || '',
//       password: data.password || '',
//     },
//     onSubmit: async (values, { resetForm }) => {
//       try {
//         const response = await axios.post('https://mock-api.arikmpt.com/api/user/login', {
//           email: values.email,
//           password: values.password,
//         });

//         // Assuming the API returns a success message or token
//         console.log(response.data);
        
//         // Reset the form
//         resetForm();
        
//         // Trigger the parent component's onSubmit
//         onSubmit(); 
//       } catch (error) {
//         const err = error as AxiosError<any>; // Use 'any' as the error response type
//         setApiError(err.response?.data?.message || 'An error occurred');
//       }
//     },
//     validationSchema: yup.object({
//       email: yup.string().email("Email is not valid").required("Email is required"),
//       password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character').required('Please enter the password'),
//     }),
//   });

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setApiError(null); // Clear previous API error
//     formik.handleSubmit();
//   };

//   const navigate = useNavigate();

//   const handleRegister = () => {
//     navigate('/register');
//   }

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
  const handleRegister = () => {
        navigate('/register');
      }

  const formMik = useFormik ({
    initialValues: selectedUser ?? {
        email: '',
        password: '',
    },
    onSubmit: async (data: DataProps) => {
      try {
          const response = await axios.post('https://mock-api.arikmpt.com/api/user/login', {
              email: data.email,
              password: data.password
          })

          window.localStorage.setItem('token', response.data.data.token)
          navigate('/list')

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
          email: yup.string().email("Email is not valid").required("Email is required"),
          password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character').required('Please enter the password'),
  }),
  enableReinitialize: true
});

  

  return (
    <div className="color-red mx-auto max-w-md block border-neutral-400 border w-full p-2">
    <Card border={false} >
      <form onSubmit={formMik.handleSubmit} className="color-red mx-auto max-w-md">
        <Text className="text-blue-500 text-2xl font-bold p-4">{'Please Login To Continue'}</Text>
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
        <Button label={'Log In'} type={'submit'} disabled={!formMik.isValid} />
        <h1>OR</h1>
        <Button label={'Sign Up'} onClick={handleRegister} additionalStyle="bg-white text-black border border-black" />
        
      </form>
    </Card>
    </div>
    
  );
};

export default Login;
