import React from "react";
import './BuyModal.css'; // Подключаем файл стилей

const BuyModal = ({ domain, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">
                    Contact to buy {domain}
                </h3>
                <p className="modal-description">Select a contact option:</p>
                <div className="modal-buttons">
                    <a
                        href="https://t.me/Kaiserkrab"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-button telegram"
                    >
                        Telegram
                    </a>
                    <a
                        href="https://wa.me/40765263983"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-button whatsapp"
                    >
                        WhatsApp
                    </a>
                    <a
                        href="https://www.namecheap.com/domains/registration/results/?domain=trustchain.online"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="modal-button buy"
                    >
                        Buy on Namecheap
                    </a>
                    <button
                        className="modal-button close"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BuyModal;
