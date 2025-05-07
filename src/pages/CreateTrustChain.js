import React, { useState } from 'react';
import axios from 'axios';

const CreateTrustChain = () => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [response, setResponse] = useState(null);

    const handleCreate = async () => {
        try {
            const res = await axios.post('https://your-backend.com/api/chains', { category, title });
            setResponse(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto'
    };

    const inputStyle = {
        border: '1px solid #ccc',
        padding: '12px',
        width: '100%',
        marginBottom: '16px'
    };

    const buttonStyle = {
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    };

    const buttonHoverStyle = {
        backgroundColor: '#2563eb'
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Create a TrustChain</h2>
            <input
                type="text"
                placeholder="Category (e.g. Electronics)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={inputStyle}
            />
            <input
                type="text"
                placeholder="Item Name (e.g. Used Gameboy)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={inputStyle}
            />
            <button
                onClick={handleCreate}
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
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