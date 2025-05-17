import React, { useState, useEffect, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const StepFinal = ({
                       category,
                       subCategory,
                       title,
                       description,
                       additionalLinks,
                   }) => {
    const [copySuccess, setCopySuccess] = useState('');
    const [uniqueLink] = useState(`https://trustchain.online/chain/${encodeURIComponent(title)}-${Date.now()}`);
    const qrRef = useRef(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uniqueLink).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            if (qrRef.current) {
                qrRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    }, []);

    return (
        <div>
            <div ref={qrRef}>
                <h2>Review Your TrustChain</h2>

                <div style={{ marginBottom: 20 }}>
                    <QRCodeSVG value={uniqueLink} size={150} />
                </div>

                <div style={{ marginBottom: 20 }}>
                    <button
                        style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        onClick={copyToClipboard}
                    >
                        Copy Link
                    </button>
                    {copySuccess && <span style={{ marginLeft: 10, color: 'green' }}>{copySuccess}</span>}
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <strong>Category:</strong> {category} / {subCategory}
            </div>

            <div style={{ marginBottom: 20 }}>
                <strong>Title:</strong> {title}
            </div>

            <div style={{ marginBottom: 20 }}>
                <strong>Description:</strong> {description}
            </div>

            <div style={{ marginBottom: 12 }}>
                <strong>Chain Events (Links):</strong>
            </div>

            {additionalLinks.length === 0 ? (
                <div>No chain events added</div>
            ) : (
                additionalLinks.map((link, i) => (
                    <div
                        key={i}
                        style={{
                            backgroundColor: '#d6f5d6',
                            borderRadius: 8,
                            padding: 15,
                            marginBottom: 20,
                        }}
                    >
                        <div style={{ fontWeight: 'bold', marginBottom: 10 }}>
                            {i + 1}.
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <strong>Description:</strong> {link.description}
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <strong>Date:</strong> {link.date}
                        </div>
                        {link.image && (
                            <img
                                src={
                                    typeof link.image === 'string'
                                        ? link.image
                                        : URL.createObjectURL(link.image)
                                }
                                alt="link"
                                style={{ maxWidth: '100%', borderRadius: 8 }}
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default StepFinal;