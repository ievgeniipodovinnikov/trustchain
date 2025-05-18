import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const TrustChainView = () => {
    const { id } = useParams();
    const [chainData, setChainData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const titleRef = useRef(null);

    useEffect(() => {
        setLoading(true);
        setError('');
        fetch(`http://localhost:8080/api/trustchain/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Not found or server error: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setChainData(data);
                setLoading(false);
                setTimeout(() => {
                    if (titleRef.current) {
                        titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 300);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', marginTop: 50 }}>Loading TrustChain...</div>;
    if (error) return <div style={{ color: 'red', fontWeight: 'bold', marginTop: 50, textAlign: 'center' }}>Error: {error}</div>;

    return (
        <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h2
                ref={titleRef}
                style={{
                    textAlign: 'center',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: '#1f2937',
                    marginBottom: 20,
                    lineHeight: 1.4,
                }}
            >
  <span role="img" aria-label="verified" style={{ fontSize: '1.8rem', verticalAlign: 'middle' }}>
    ✅
  </span>
                <br />
                This TrustChain has been<br />
                <span style={{ color: '#2563eb', fontWeight: 700 }}>
    securely verified on the blockchain
</span>

            </h2>

            <div style={{ position: 'relative', width: 150, height: 150, margin: '20px auto 10px' }}>
                <QRCodeSVG value={chainData.qrCodeUrl} size={150} level="H" />
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
                    <span role="img" aria-label="chain link" style={{ fontSize: 28, lineHeight: 1, userSelect: 'none' }}>
                        🔗
                    </span>
                </div>
            </div>

            <p style={{ maxWidth: 500, margin: '0 auto 25px', fontSize: 14, color: '#444', lineHeight: 1.5 }}>
                This TrustChain is based on blockchain technology. It <strong>cannot be deleted or altered</strong>, only <strong>appended with new events</strong>.
                Each event is cryptographically linked by hashes ensuring <em>immutability</em> and <em>trustworthiness</em>.
                Anyone scanning the QR code can verify this chain’s authenticity and integrity.
            </p>

            <div style={{ marginBottom: 15, textAlign: 'center', fontWeight: 'bold', color: '#333' }}>
                Category: {chainData.category} / {chainData.subCategory}
            </div>

            <div style={{ marginBottom: 20, fontSize: 16, color: '#555', padding: '0 10px', textAlign: 'center' }}>
                {chainData.description}
            </div>

            <div style={{ marginBottom: 20, fontWeight: 'bold', fontSize: 18, color: '#2563eb' }}>
                Chain Events:
            </div>

            {chainData.links?.map((link, idx) => (
                <React.Fragment key={link.id || idx}>
                    <div
                        style={{
                            backgroundColor: '#d6f5d6',
                            borderRadius: 8,
                            padding: 15,
                            marginBottom: 10,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div style={{ marginBottom: 8 }}>
                            <strong>{idx + 1}.</strong> {link.description}
                        </div>
                        <div style={{ marginBottom: 8, fontSize: 14, color: '#333' }}>
                            <strong>Date:</strong> {link.date}
                        </div>
                        {link.imageUrl && (
                            <img
                                src={link.imageUrl}
                                alt="chain event"
                                style={{ maxWidth: '100%', borderRadius: 8 }}
                            />
                        )}
                        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                            <em>Previous hash:</em> {link.previousHash || '—'}
                            <br />
                            <em>Current hash:</em> {link.currentHash || '—'}
                        </div>
                    </div>
                    {idx !== chainData.links.length - 1 && (
                        <div
                            aria-hidden="true"
                            style={{
                                textAlign: 'center',
                                fontSize: 24,
                                marginBottom: 20,
                                userSelect: 'none',
                            }}
                        >
                            <span role="img" aria-label="chain link">🔗</span>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default TrustChainView;