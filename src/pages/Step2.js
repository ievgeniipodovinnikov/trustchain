import React, { useEffect, useState } from 'react';

const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '16px',
    margin: '8px 0',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
};

const textareaStyle = {
    ...inputStyle,
    minHeight: '60px',
    resize: 'vertical',
    overflow: 'auto',
};

const fileInputStyle = {
    ...inputStyle,
    padding: '6px',
    backgroundColor: '#f9f9f9',
};

const dateInputStyle = {
    ...inputStyle,
    padding: '8px',
    fontFamily: 'inherit',
};

const linkCardStyle = {
    backgroundColor: '#f2fdf3',
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 0 5px rgba(0,0,0,0.05)',
};

const buttonBase = {
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

const addLinkButtonDisabled = {
    ...buttonBase,
    backgroundColor: '#e0f7e9',
    color: '#a2a2a2',
    cursor: 'not-allowed',
};

const addLinkButtonActive = {
    ...buttonBase,
    backgroundColor: '#b2f2bb',
    color: '#000',
};

const finalizeButton = {
    ...buttonBase,
    backgroundColor: '#4a90e2',
    color: 'white',
    float: 'right',
};

const finalizeButtonDisabled = {
    ...finalizeButton,
    backgroundColor: '#e0e0e0',
    cursor: 'not-allowed',
};

const backButtonStyle = {
    ...buttonBase,
    backgroundColor: '#f2f2f2',
    color: '#333',
    marginRight: '10px',
};

const errorTextStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '4px',
};

const Step2 = ({
                   additionalLinks,
                   setAdditionalLinks,
                   handleAddLink,
                   isSecondStepValid,
                   handleFinalize,
                   handleBack
               }) => {
    const [errors, setErrors] = useState([]);

    const isLinkValid = (link) =>
        link.image && link.description.trim() && link.date;

    const allLinksValid = additionalLinks.every(isLinkValid);

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!file) return;

        if (!validTypes.includes(file.type) || file.size > maxSize) {
            alert("Please select an image (jpeg/png/webp/gif) with a size of up to 5MB.");
            return;
        }

        const newLinks = [...additionalLinks];
        newLinks[index].image = file;
        setAdditionalLinks(newLinks);
    };

    const handleDescriptionChange = (e, index) => {
        const value = e.target.value.slice(0, 500);
        const newLinks = [...additionalLinks];
        newLinks[index].description = value;
        setAdditionalLinks(newLinks);
    };

    const handleDateChange = (e, index) => {
        const newLinks = [...additionalLinks];
        const newDate = e.target.value;
        const today = new Date().toISOString().split('T')[0];

        const newErrors = [];

        if (index > 0) {
            if (newDate < additionalLinks[index - 1].date) {
                newErrors.push("The date cannot be earlier than the previous event.");
            }
        }

        if (newDate > today) {
            newErrors.push("Date cannot be in the future.");
        }

        if (newErrors.length > 0) {
            setErrors(prevErrors => {
                const updatedErrors = [...prevErrors];
                updatedErrors[index] = newErrors;
                return updatedErrors;
            });
            return;
        }

        setErrors(prevErrors => {
            const updatedErrors = [...prevErrors];
            updatedErrors[index] = [];
            return updatedErrors;
        });

        newLinks[index].date = newDate;
        setAdditionalLinks(newLinks);
    };

    useEffect(() => {
        if (additionalLinks.length === 0) {
            handleAddLink();
        }
    }, [additionalLinks, handleAddLink]);

    return (
        <div>
            <h3 style={{ fontFamily: 'SF Pro Text, sans-serif' }}>
                Step 2: Add Events (Start with the earliest event)
            </h3>
            {additionalLinks.map((link, index) => (
                <div key={index} style={linkCardStyle}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        style={fileInputStyle}
                    />
                    <textarea
                        placeholder="Event description"
                        value={link.description}
                        onChange={(e) => handleDescriptionChange(e, index)}
                        style={textareaStyle}
                    />
                    <input
                        type="date"
                        value={link.date}
                        onChange={(e) => handleDateChange(e, index)}
                        style={dateInputStyle}
                    />
                    {errors[index] && errors[index].length > 0 && (
                        <div>
                            {errors[index].map((error, i) => (
                                <div key={i} style={errorTextStyle}>
                                    {error}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            <div style={{ marginBottom: '20px' }}>
                <button
                    style={allLinksValid ? addLinkButtonActive : addLinkButtonDisabled}
                    disabled={!allLinksValid}
                    onClick={handleAddLink}
                >
                    + Add Another Link
                </button>
            </div>

            <div style={{ clear: 'both' }}>
                <button
                    onClick={handleFinalize}
                    style={isSecondStepValid ? finalizeButton : finalizeButtonDisabled}
                    disabled={!isSecondStepValid}
                    onMouseEnter={(e) => {
                        if (isSecondStepValid) e.target.style.backgroundColor = '#0066ff';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = isSecondStepValid
                            ? finalizeButton.backgroundColor
                            : finalizeButtonDisabled.backgroundColor;
                    }}
                >
                    Finalize TrustChain
                </button>
            </div>

            <div>
                <button onClick={handleBack} style={backButtonStyle}>← Back</button>
            </div>
        </div>
    );
};

export default Step2;
