import React from 'react';
import { Input, Text, Button, Card } from "../../../components";
import { useFormik } from "formik";
import * as yup from "yup";

interface AddressInformationProps {
  data: { address: string, city: string, state: string, zip: string }; 
  onChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const AddressInformation: React.FC<AddressInformationProps> = ({ onNext, onPrevious, data, onChange }) => {
    const formMik = useFormik({
        initialValues: {
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            zip: data.zip || '',
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            onChange(values);
            onNext();
            resetForm(); // Reset the current form
        },
        validationSchema: yup.object({
            address: yup.string().required(),
            city: yup.string().min(4, 'Please enter the correct city').required('Please enter your city'),
            state: yup.string().min(4, 'Please enter the correct state').required('Please enter your state'),
            zip: yup.string().matches(/^\d{5}$/, 'Please enter the valid zip code ex:12345').required('Please enter your zip code'),
        })
    });

    return (
        <Card border>
            <form onSubmit={formMik.handleSubmit}>
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
                        <Text className="text-red-600 text-xs">{formMik.errors.address}</Text>
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
                        <Text className="text-red-600 text-xs">{formMik.errors.city}</Text>
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
                        <Text className="text-red-600 text-xs">{formMik.errors.state}</Text>
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
                        <Text className="text-red-600 text-xs">{formMik.errors.zip}</Text>
                    )}
                </div>
                <Button label={'Previous'} type='button' onClick={onPrevious} />
                <Button label={'Next'}   />
            </form>
        </Card>
    );
}

export default AddressInformation;
