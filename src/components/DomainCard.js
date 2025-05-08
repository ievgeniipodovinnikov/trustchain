import React, { useState } from "react";
import BuyModal from "./BuyModal";
import './DomainCard.css'; // Подключаем файл стилей

const DomainCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardClosed, setIsCardClosed] = useState(false);

    const domain = "trustchain.online";
    const description = "TrustChain is a blockchain-based platform that creates transparent and secure chains of trust, allowing you to track the origin and history of products, services, or data with full accountability and integrity at every stage.";
    const price = 7999;

    if (isCardClosed) return null;

    return (
        <div className="domain-card">
            <h3 className="domain-title">
                This website is for sale: <span className="domain-name">{domain}</span>
            </h3>
            <p className="domain-description">{description}</p>
            <p className="domain-price">${price}</p>

            <button
                onClick={() => setIsModalOpen(true)}
                className="buy-now-button"
            >
                Buy Now
            </button>
            <button
                onClick={() => setIsCardClosed(true)}
                className="close-button"
            >
                &times;
            </button>

            <img
                src="/shark.png"
                alt="Shark Icon"
                className="shark-icon"
            />
            <div className="modal-footer">
                <p style={{ color: 'white', textAlign: 'center' }}>
                    By <a href="https://stacklead.pro" target="_blank" rel="noreferrer" style={{ color: 'white', fontWeight: 'bold' }}>
                    Stacklead.pro
                </a>
                </p>
            </div>
            <BuyModal domain={domain} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default DomainCard;