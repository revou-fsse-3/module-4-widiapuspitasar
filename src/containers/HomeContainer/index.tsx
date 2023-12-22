
import { Input, Text, Button, Card } from "../../components";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const HomeContainer = () => {
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (step === 3) {
      return;
    }
    setStep((prevState) => prevState + 1);
  };

  const handlePrevious = () => {
    if (step === 1) {
      return;
    }
    setStep((prevState) => prevState - 1);
  };

  const formMik = useFormik({
    initialValues: {
      name: "",
      email: "",
      datebirth: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      username: "",
      password: "",
    },
    onSubmit: (values, {resetForm}) => {
        console.log(values);
        resetForm();
        alert("Form submitted successfully!");
    },
    validationSchema: yup.object({
      name: yup.string().required(),
      email: yup.string().email("Email is not valid").required("Email is required"),
      datebirth: yup.date().max(new Date(),'Please enter the correct birth date').required('Please enter your birth date'),
      address: yup.string().required(),
      city: yup.string().min(4,'Please enter the correct city').required('Please enter your city'),
      state: yup.string().min(4,'Please enter the correct state').required('Please enter your state'),
      zip: yup.string().matches(/^\d{5}$/,'Please enter the valid zip code ex:12345').required('Please enter your zip code'),
      username: yup.string().min(8,'Username should be at least 8 characters').required('Please enter the username'),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character').required('Please enter the password'),
    }),
  });

  return (
    <Card border>
      <form onSubmit={formMik.handleSubmit} className="color-red mx-auto max-w-md">
        {step === 1 && (
          <div>
            <Text className="text-blue-500 text-center text-2xl font-bold p-4">{'Personal Information'}</Text>
            <div>
              <Text>{'Name'}</Text>
              <Input
                name={'name'}
                value={formMik.values.name}
                onChange={formMik.handleChange('name')}
              />
              {formMik.errors.name && (
                <Text className="text-red-600">{formMik.errors.name}</Text>
              )}
            </div>
            <div>
              <Text>{'Email'}</Text>
              <Input
                name={'email'}
                value={formMik.values.email}
                onChange={formMik.handleChange('email')}
              />
              {formMik.errors.email && (
                <Text className="text-red-600">{formMik.errors.email}</Text>
              )}
            </div>
            <div>
              <Text>{'Date of Birth'}</Text>
              <Input
                name={'datebirth'}
                type="date"
                value={formMik.values.datebirth}
                onChange={formMik.handleChange('datebirth')}
              />
              {formMik.errors.datebirth && (
                <Text className="text-red-600">{formMik.errors.datebirth}</Text>
              )}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <Text className="text-blue-500 text-2xl font-bold p-4">{'Address Information'}</Text>
            <div>
              <Text>{'Street Address'}</Text>
              <Input
                className="block border-neutral-400 border w-full p-2"
                name={'address'}
                value={formMik.values.address}
                onChange={formMik.handleChange('address')}
              />
              {formMik.errors.address && (
                <Text className="text-red-600">{formMik.errors.address}</Text>
              )}
            </div>
            <div>
              <Text>{'City'}</Text>
              <Input
                className="block border-neutral-400 border w-full p-2"
                name={'city'}
                value={formMik.values.city}
                onChange={formMik.handleChange('city')}
              />
              {formMik.errors.city && (
                <Text className="text-red-600">{formMik.errors.city}</Text>
              )}
            </div>
            <div>
              <Text>{'State'}</Text>
              <Input
                className="block border-neutral-400 border w-full p-2"
                name={'state'}
                value={formMik.values.state}
                onChange={formMik.handleChange('state')}
              />
              {formMik.errors.state && (
                <Text className="text-red-600">{formMik.errors.state}</Text>
              )}
            </div>
            <div>
              <Text>{'ZIP Code'}</Text>
              <Input
                className="block border-neutral-400 border w-full p-2"
                name={'zip'}
                value={formMik.values.zip}
                onChange={formMik.handleChange('zip')}
              />
              {formMik.errors.zip && (
                <Text className="text-red-600">{formMik.errors.zip}</Text>
              )}
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <Text className="text-blue-500 text-2xl font-bold p-4">{'Account Information'}</Text>
            <div>
              <Text>{'Username'}</Text>
              <Input
                className="block border-neutral-400 border w-full p-2"
                name={'username'}
                value={formMik.values.username}
                onChange={formMik.handleChange('username')}
              />
              {formMik.errors.username && (
                <Text className="text-red-600">{formMik.errors.username}</Text>
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
                <Text className="text-red-600">{formMik.errors.password}</Text>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-center">
          {step > 1 && (
            <Button label={'Previous'} onClick={handlePrevious} />
          )}
          {step === 3 ? (
            <Button label={'Submit'} type="submit" />
          ) : (
            <Button label={'Next'} onClick={handleNext} />
          )}
        </div>
      </form>
    </Card>
  );
};

export default HomeContainer;
