
import { Input, Text, Button, Card  } from "../../../components";
import { useFormik } from "formik";
import React from 'react';
import * as yup from "yup";

interface PersonalInformationProps {
  data: { name: string, email: string, datebirth: string }; 
  onChange: (data: any) => void;
  onNext: () => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({data, onChange, onNext}) => {

    const formMik = useFormik ({
        initialValues: {
            name: data.name || '',
            email: data.email || '',
            datebirth: data.datebirth || '',
        },
        onSubmit: (values) => {
            console.log(values);
            onChange(values);
            onNext();
        },
        validationSchema: yup.object ({
            name: yup.string().required(),
            email: yup.string().email("Email is not valid").required("Email is required"),
            datebirth: yup.date().max(new Date(),'Please enter the correct birth date').required('Please enter your birth date'),
        })
    });

    return (
        <Card border >
            <form onSubmit={formMik.handleSubmit} className="color-red mx-auto max-w-md">
            <Text className="text-blue-500 text-center text-2xl font-bold p-4">{'Personal Information'}</Text>
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
                name={'email'}
                value={formMik.values.email}
                onChange={formMik.handleChange('email')}
              />
              {formMik.errors.email && (
                <Text className="text-red-600 text-xs">{formMik.errors.email}</Text>
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
                <Text className="text-red-600 text-xs">{formMik.errors.datebirth}</Text>
              )}
            </div>
            <Button label= {'Next'}/>
            </form>
        </Card>
    )
}

export default PersonalInformation

