import React from 'react';

const Step3 = ({ password, email, setPassword, setEmail, buttonStyle, handleBack }) => {
    const isStepValid = password.length >= 6 && email.includes('@');

    return (
        <div>
            <h3>Step 3: Finalize TrustChain</h3>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ ...buttonStyle, width: '100%', marginBottom: '10px' }}
                />
            </div>

            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ ...buttonStyle, width: '100%', marginBottom: '10px' }}
                />
            </div>

            <button
                style={{
                    ...buttonStyle,
                    backgroundColor: isStepValid ? '#4CAF50' : '#d3d3d3',
                    cursor: isStepValid ? 'pointer' : 'not-allowed',
                }}
                disabled={!isStepValid}
            >
                Finalize TrustChain
            </button>

            <button
                onClick={handleBack}
                style={{
                    ...buttonStyle,
                    backgroundColor: '#f0f0f0',
                    color: '#333',
                    marginTop: '20px',
                }}
            >
                ← Back
            </button>
        </div>
    );
};

export default Step3;
