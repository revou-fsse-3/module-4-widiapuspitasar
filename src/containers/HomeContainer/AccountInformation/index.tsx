import React from 'react';
import { Input, Text, Button, Card } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";

interface AccountInformationProps {
  data: { username: string; password: string };
  onChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

const AccountInformation: React.FC<AccountInformationProps> = ({ data, onPrevious, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: data.username || '',
      password: data.password || '',
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values)
      resetForm();
      alert("Form success submitted");
      onSubmit(); 
    },
    validationSchema: yup.object({
      username: yup.string().min(8, 'Username should be at least 8 characters').required('Please enter the username'),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character').required('Please enter the password'),
    }),
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <Card border>
      <form onSubmit={handleFormSubmit} className="color-red mx-auto max-w-md">
        <Text className="text-blue-500 text-2xl font-bold p-4">{'Account Information'}</Text>
        <div>
          <Text>{'Username'}</Text>
          <Input
            className="block border-neutral-400 border w-full p-2"
            name={'username'}
            value={formik.values.username}
            onChange={formik.handleChange('username')}
          />
          {formik.errors.username && (
            <Text className="text-red-600 text-xs">{formik.errors.username}</Text>
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
        <Button label={'Previous'} type='button' onClick={onPrevious} className="mr-2" />
        <Button label={'Submit'} type={'submit'} disabled={!formik.isValid} />
      </form>
    </Card>
  );
};

export default AccountInformation;
