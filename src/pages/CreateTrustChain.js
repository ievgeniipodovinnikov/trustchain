import React, { useState } from 'react';
import axios from 'axios';

const categories = {
    "Physical Assets": [
        "Electronics",
        "Vehicles",
        "Real Estate",
        "Furniture",
        "Art",
        "Jewelry",
        "Clothing",
        "Books",
        "Musical Instruments",
        "Tools",
        "Collectibles",
        "Watches",
        "Sports Equipment",
        "Antiques",
        "Home Appliances",
        "Technology",
        "Office Equipment",
        "Outdoor Gear",
        "Toys",
        "Photography Equipment",
        "Crafts & DIY",
        "Other"
    ],
    "Personal History": [
        "Life Events",
        "Medical History",
        "Employment",
        "Education",
        "Family",
        "Travel",
        "Career Milestones",
        "Hobbies",
        "Personal Growth",
        "Volunteer Work",
        "Pets"
    ]
};

const CreateTrustChain = () => {
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [response, setResponse] = useState(null);

    const handleCreate = async () => {
        try {
            const res = await axios.post('https://your-backend.com/api/chains', {
                category,
                subCategory,
                title: sanitizeInput(title),
                description: sanitizeInput(description),
            });
            setResponse(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const sanitizeInput = (str) => {
        const clean = str.replace(/<[^>]*>?/gm, '');
        return clean.trim().slice(0, 500);
    };

    const isFormValid = category && subCategory && title.length >= 2 && description.length >= 5;

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto'
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

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setSubCategory('');
    };

    const itemPlaceholder =
        category === "Personal History" && subCategory === "Pets"
            ? "Pet Name (e.g. Bella)"
            : category === "Personal History"
                ? "Your Name"
                : "Item Name (e.g. Used Gameboy)";

    return (
        <div style={containerStyle}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Create a TrustChain</h2>

            <select
                value={category}
                onChange={handleCategoryChange}
                style={fieldStyle}
            >
                <option value="">Select Category</option>
                <option value="Physical Assets">Physical Assets</option>
                <option value="Personal History">Personal History</option>
            </select>

            {category && (
                <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    style={fieldStyle}
                >
                    <option value="">Select Subcategory</option>
                    {categories[category].map((subCat) => (
                        <option key={subCat} value={subCat}>{subCat}</option>
                    ))}
                </select>
            )}

            {category && subCategory && (
                <>
                    <input
                        type="text"
                        placeholder={itemPlaceholder}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={fieldStyle}
                        maxLength={100}
                    />

                    <textarea
                        placeholder="Initial description of the chain (max 500 chars)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        style={{
                            ...fieldStyle,
                            height: '100px',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            fontSize: '16px',
                            color: '#333',
                        }}
                        maxLength={500}
                    />
                </>
            )}

            <button
                onClick={handleCreate}
                style={isFormValid ? buttonStyle : { ...buttonStyle, ...buttonDisabledStyle }}
                disabled={!isFormValid}
                onMouseEnter={(e) => {
                    if (isFormValid) e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = isFormValid
                        ? buttonStyle.backgroundColor
                        : buttonDisabledStyle.backgroundColor;
                }}
            >
                Create Chain
            </button>

            {response && (
                <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#d1fae5', color: '#16a34a', borderRadius: '8px' }}>
                    Chain created: <a href={`/chain/${response.slug}`} style={{ textDecoration: 'underline' }}>{response.slug}</a>
                </div>
            )}
        </div>
    );
};

export default CreateTrustChain;
