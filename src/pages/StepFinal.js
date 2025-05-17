import React, { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const finalTitles = [
    '✅ Your TrustChain is Ready',
    '🔗 TrustChain Successfully Created',
    '🎉 Chain Created! Share It with Confidence',
    '🧩 Your Chain of Trust Has Been Built',
    '🚀 Chain Published Successfully',
    '🔐 Your Trust Record is Live',
];

const StepFinal = ({
                       category,
                       subCategory,
                       title,
                       description,
                       additionalLinks,
                   }) => {
    const [copySuccess, setCopySuccess] = useState('');
    const [uniqueLink] = useState(
        `https://trustchain.online/chain/${encodeURIComponent(title)}-${Date.now()}`
    );
    const [randomTitle, setRandomTitle] = useState('');
    const titleRef = useRef(null);

    useEffect(() => {
        const index = Math.floor(Math.random() * finalTitles.length);
        setRandomTitle(finalTitles[index]);

        setTimeout(() => {
            if (titleRef.current) {
                titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 300);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(uniqueLink).then(() => {
            setCopySuccess('Copied!');
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    return (
        <div>
            <h2 ref={titleRef}>{randomTitle}</h2>

            <div style={{ position: 'relative', width: 150, height: 150, marginBottom: 20 }}>
                <QRCodeSVG value={uniqueLink} size={150} level="H" />

                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 4px rgba(0,0,0,0.15)',
                        pointerEvents: 'none',
                        userSelect: 'none',
                    }}
                    aria-label="chain"
                    role="img"
                >
                    <span
                        role="img"
                        aria-label="chain link"
                        style={{ fontSize: 28, lineHeight: 1, userSelect: 'none' }}
                    >
                        🔗
                    </span>
                </div>
            </div>

            <div style={{ marginBottom: 10 }}>
                <button
                    style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        marginBottom: '20px',
                    }}
                    onClick={copyToClipboard}
                >
                    Copy Link
                </button>
                {copySuccess && (
                    <span style={{ marginLeft: 10, color: 'green' }}>{copySuccess}</span>
                )}
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

            <div style={{ marginBottom: 20 }}>
                <strong>Chain Events (Links):</strong>
            </div>

            {additionalLinks.map((link, i) => (
                <div
                    key={i}
                    style={{
                        backgroundColor: '#d6f5d6',
                        borderRadius: 8,
                        padding: 15,
                        marginBottom: 20,
                    }}
                >
                    <div style={{ marginBottom: 10 }}>
                        <strong>{i + 1}.</strong> {link.description}
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
            ))}
        </div>
    );
};

export default StepFinal;