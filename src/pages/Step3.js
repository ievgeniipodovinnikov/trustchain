import React from 'react';

const buttonBase = {
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
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

const inputStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    fontSize: '16px',
    margin: '8px 0',
    width: 'calc(100% - 20px)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
};

const Step3 = ({ password, email, setPassword, setEmail, buttonStyle, handleBack }) => {
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isStepValid = password.length === 6 && isValidEmail(email);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        if (/^\d{0,6}$/.test(newPassword)) {
            setPassword(newPassword);
        }
    };

    return (
        <div>
            <h3>Step 3: Finalize TrustChain</h3>

            <p>
                Please choose a 6-digit PIN to add new events in the future.
            </p>

            <div>
                <label>PIN (6 digits)</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    maxLength="6"
                    inputMode="numeric"
                    pattern="\d*"
                    style={inputStyle}
                />
            </div>

            <p>
                We also need your email for recovery purposes.
            </p>

            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                />
            </div>

            <div style={{ clear: 'both', marginTop: '20px' }}>
                <button
                    onClick={handleBack}
                    style={backButtonStyle}
                >
                    ← Back
                </button>

                <button
                    onClick={() => {}}
                    style={isStepValid ? finalizeButton : finalizeButtonDisabled}
                    disabled={!isStepValid}
                >
                    Finalize TrustChain
                </button>
            </div>
        </div>
    );
};

export default Step3;