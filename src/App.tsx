import React, { useState } from 'react';
import { Card } from './components';
import './App.css';
import { AccountInformation, AddressInformation, PersonalInformation } from './containers/HomeContainer';

const App: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    personalInfo: { name: '', email: '', datebirth: '' },
    addressInfo: { address: '', state: '', city: '', zip: '' },
    accountInfo: { username: '', password: '' },
  });

  const handleNext = () => {
    if (step === 3) {
      handleFormSubmit();
    } else {
      setStep((prevState) => prevState + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevState) => Math.max(prevState - 1, 1));
  };

  const handleFormSubmit = () => {
    console.log('Form submitted', formData);
    // Add logic for form submission
  };

  const handlePersonalInfoChange = (data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      personalInfo: { ...prevData.personalInfo, ...data },
    }));
  };

  const handleAddressInfoChange = (data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      addressInfo: { ...prevData.addressInfo, ...data },
    }));
  };

  const handleAccountInfoChange = (data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      accountInfo: { ...prevData.accountInfo, ...data },
    }));
  };

  return (
    <div>
      <Card border={false}>
        <div>
          {step === 1 && <PersonalInformation data={formData.personalInfo} onChange={handlePersonalInfoChange} onNext={handleNext} />}
        </div>
        <div>
          {step === 2 && (
            <AddressInformation
              data={formData.addressInfo}
              onChange={handleAddressInfoChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}
        </div>
        <div>
          {step === 3 && (
            <AccountInformation
              data={formData.accountInfo}
              onChange={handleAccountInfoChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default App;
