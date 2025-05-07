import React, { useEffect, useState } from 'react';
import './AnimatedSteps.css';

const AnimatedSteps = () => {
    const steps = [
        'Step 1: Create a new TrustChain',
        'Step 2: Add chain segments (verified events)',
        'Step 3: Generate a unique QR code',
        '✅ A tamper-proof public history is now securely stored on the blockchain'
    ];

    const [highlightedIndex, setHighlightedIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightedIndex(prev => (prev + 1) % steps.length);
        }, 1500);

        return () => clearInterval(interval);
    }, [steps.length]);

    return (
        <div className="steps-full-wrapper">
            {steps.map((text, index) => (
                <div
                    key={index}
                    className={`step-line fade-transition ${
                        index === highlightedIndex
                            ? index === steps.length - 1
                                ? 'highlight-final'
                                : 'highlight'
                            : ''
                    }`}
                >
                    {text}
                </div>
            ))}
        </div>
    );
};

export default AnimatedSteps;
