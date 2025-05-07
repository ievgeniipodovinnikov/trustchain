import React, { useState, useEffect } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const CreateTrustChain = () => {
    const [step, setStep] = useState(1);
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [additionalLinks, setAdditionalLinks] = useState([]);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (step === 1) {
            const formElements = [category, subCategory, title, description];
            if (formElements.some(field => field)) {
                setTimeout(() => {
                    window.scrollTo({
                        top: document.body.scrollHeight,
                        behavior: 'smooth',
                    });
                }, 300);
            }
        }
    }, [category, subCategory, title, description, step]);

    useEffect(() => {
        if (step === 2) {
            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth',
                });
            }, 300); 
        }
    }, [step]);

    const handleCreate = () => {
        if (category && subCategory && title && description) {
            setStep(2);
        }
    };

    const handleAddLink = () => {
        setAdditionalLinks([...additionalLinks, { image: null, description: '', date: '' }]);
    };

    const handleFinalize = () => {
        setStep(3);
    };

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else if (step === 3) {
            setStep(2);
        }
    };

    const isFirstStepValid =
        category && subCategory && title.length >= 2 && description.length >= 5;

    const isSecondStepValid = additionalLinks.length > 0 &&
        additionalLinks.every(
            (link) => link.image && link.description.trim() && link.date
        );

    const isFinalizeButtonActive = () => {
        const isValidLinks = additionalLinks.every(link => link.image && link.description.trim() && link.date);
        return isValidLinks && additionalLinks.length > 0;
    };

    const fieldStyle = {
        border: '1px solid #ccc',
        padding: '12px',
        width: '100%',
        marginBottom: '16px',
        borderRadius: '8px',
        boxSizing: 'border-box'
    };

    const buttonStyle = {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    };

    const buttonDisabledStyle = {
        backgroundColor: '#a3bffa',
        cursor: 'not-allowed'
    };

    const buttonHoverStyle = {
        backgroundColor: '#2563eb'
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2>Create a TrustChain</h2>

            {step === 1 && (
                <Step1
                    category={category}
                    subCategory={subCategory}
                    title={title}
                    description={description}
                    setCategory={setCategory}
                    setSubCategory={setSubCategory}
                    setTitle={setTitle}
                    setDescription={setDescription}
                    isFirstStepValid={isFirstStepValid}
                    handleCreate={handleCreate}
                    fieldStyle={fieldStyle}
                    buttonStyle={buttonStyle}
                    buttonDisabledStyle={buttonDisabledStyle}
                    buttonHoverStyle={buttonHoverStyle}
                />
            )}

            {step === 2 && (
                <Step2
                    additionalLinks={additionalLinks}
                    setAdditionalLinks={setAdditionalLinks}
                    handleAddLink={handleAddLink}
                    isSecondStepValid={isSecondStepValid}
                    handleFinalize={handleFinalize}
                    handleBack={handleBack}
                    isFinalizeButtonActive={isFinalizeButtonActive}
                />
            )}

            {step === 3 && (
                <Step3
                    password={password}
                    email={email}
                    setPassword={setPassword}
                    setEmail={setEmail}
                    buttonStyle={buttonStyle}
                    handleBack={handleBack} 
                />
            )}
        </div>
    );
};

export default CreateTrustChain;
