import React from 'react';

const About = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '18px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '600', marginBottom: '24px' }}>About TrustChain</h2>
        <p style={{ marginBottom: '16px' }}>
            TrustChain is a platform designed to create verifiable chains of custody for both physical and digital goods.
            With TrustChain, every item, whether it's honey, electronics, or collectibles, gets a unique QR code that links
            to a transparent and traceable chain of trust created by its owners.
        </p>
        <p style={{ marginBottom: '16px' }}>
            The system leverages blockchain technology for its integrity, but is designed for simplicity, ensuring that anyone
            can easily track the journey of an item from production to end use, without the need for deep technical knowledge.
            The platform is ideal for businesses, consumers, and even collectors who want to ensure the legitimacy of products.
        </p>
        <p>
            With TrustChain, we aim to provide more transparency in the marketplace, build consumer trust, and combat counterfeiting
            by making product histories transparent. Every transaction in the chain is an opportunity to further verify and prove the
            authenticity of products.
        </p>

        <footer style={{ marginTop: '40px', fontSize: '16px', textAlign: 'center' }}>
            <p>
                Follow us on Twitter: <a href="https://x.com/trustchainx" target="_blank" style={{ textDecoration: 'underline' }}>@TrustChainX</a>
            </p>
            <p>
                Made by <a href="https://stacklead.pro" target="_blank" style={{ textDecoration: 'underline' }}>StackLead.pro</a>
            </p>
        </footer>
    </div>
);

export default About;
