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
  additionalLinks, // массив с { description, date, image (File или URL) }
  email,
  pinCode,
  useBackend = true,
  uniqueLinkFromProps = '',
}) => {
  const [copySuccess, setCopySuccess] = useState('');
  const [uniqueLink, setUniqueLink] = useState('');
  const [randomTitle, setRandomTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState('');
  const titleRef = useRef(null);

  const requestSentRef = useRef(false);

  useEffect(() => {
    const index = Math.floor(Math.random() * finalTitles.length);
    setRandomTitle(finalTitles[index]);

    if (!useBackend) {
      const generatedLink =
        uniqueLinkFromProps ||
        `${window.location.origin}/trustchain/${encodeURIComponent(title)}-${Date.now()}`;

      setUniqueLink(generatedLink);
      setLoading(false);

      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);

      setErrorInfo('');
      return;
    }

    if (requestSentRef.current) return;
    requestSentRef.current = true;

    setLoading(true);
    setErrorInfo('');
    setUniqueLink('');

    const formData = new FormData();

    const chainData = {
      category,
      subCategory,
      title,
      description,
      creatorEmail: email,
      pinCode,
      links: additionalLinks.map((link) => ({
        description: link.description,
        date: link.date,
        imageUrl: link.image instanceof File ? link.image.name : '',
      })),
    };

    formData.append('chainData', new Blob([JSON.stringify(chainData)], { type: 'application/json' }));

    additionalLinks.forEach((link) => {
      if (link.image instanceof File) {
        formData.append('files', link.image, link.image.name);
      }
    });

//    fetch('http://localhost:8080/api/trustchain/create', {
    fetch('http://api.trustchain.online/api/trustchain/create', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!data.qrCodeUrl) throw new Error('Invalid response from server');
        setUniqueLink(data.qrCodeUrl);
        setLoading(false);
      })
      .catch((err) => {
        setErrorInfo(err.message || 'Unknown error occurred');
        setLoading(false);
      });

    setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }, [
    useBackend,
    uniqueLinkFromProps,
    category,
    subCategory,
    title,
    description,
    additionalLinks,
    email,
    pinCode,
  ]);

  const copyToClipboard = () => {
    if (!uniqueLink) return;
    navigator.clipboard.writeText(uniqueLink).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 50 }}>Creating your TrustChain...</div>;
  }

  if (errorInfo) {
    return (
      <div style={{ color: 'red', fontWeight: 'bold', marginTop: 50, textAlign: 'center' }}>
        Error: {errorInfo}
      </div>
    );
  }

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
          <span role="img" aria-label="chain link" style={{ fontSize: 28, lineHeight: 1, userSelect: 'none' }}>
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
        {copySuccess && <span style={{ marginLeft: 10, color: 'green' }}>{copySuccess}</span>}
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
              src={link.image instanceof File ? URL.createObjectURL(link.image) : link.image}
              alt="link"
              style={{ maxWidth: '100%', borderRadius: 8 }}
            />
          )}
        </div>
      ))}

      <div style={{ marginTop: 30, padding: 15, backgroundColor: '#eef6ff', borderRadius: 8 }}>
        <p>
          <strong>Email for recovery:</strong> {email} <br />
          (Used to recover access if you forget your PIN code)
        </p>
        <p>
          <strong>PIN Code:</strong> {pinCode} <br />
          (Needed to add new events to your TrustChain in the future)
        </p>
      </div>
    </div>
  );
};

export default StepFinal;