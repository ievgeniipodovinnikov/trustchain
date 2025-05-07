import React from 'react';

const Step1 = ({
                   category, subCategory, title, description, setCategory, setSubCategory,
                   setTitle, setDescription, isFirstStepValid, handleCreate,
                   fieldStyle, buttonStyle, buttonDisabledStyle, buttonHoverStyle
               }) => {

    const categories = {
        "Physical Assets": [
            "Electronics", "Vehicles", "Real Estate", "Furniture", "Art",
            "Jewelry", "Clothing", "Books", "Musical Instruments", "Tools",
            "Collectibles", "Watches", "Sports Equipment", "Antiques", "Home Appliances",
            "Technology", "Office Equipment", "Outdoor Gear", "Toys", "Photography Equipment",
            "Crafts & DIY", "Other"
        ],
        "Personal History": [
            "Life Events", "Medical History", "Employment", "Education", "Family",
            "Travel", "Career Milestones", "Hobbies", "Personal Growth", "Volunteer Work", "Pets"
        ]
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
        <>
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
                        placeholder="Description of the chain (max 500 chars)"
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
                style={isFirstStepValid ? buttonStyle : { ...buttonStyle, ...buttonDisabledStyle }}
                disabled={!isFirstStepValid}
                onMouseEnter={(e) => {
                    if (isFirstStepValid) e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = isFirstStepValid
                        ? buttonStyle.backgroundColor
                        : buttonDisabledStyle.backgroundColor;
                }}
            >
                Create TrustChain
            </button>
        </>
    );
};

export default Step1;