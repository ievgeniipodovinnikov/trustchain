import React, { useState } from 'react';
import './CaseStudy.css';

const CaseStudy = () => {
    const [expandedCard, setExpandedCard] = useState(null);  // Стейт для отслеживания раскрытых карточек

    const scenarios = [
        {
            title: "Honey Production",
            description:
                "The journey of honey from production to the final consumer is a process full of transparency and careful handling. Each event in the journey is verifiable to ensure quality and authenticity.",
            events: [
                { date: "1st June 2023", description: "Honey harvested from local beekeepers." },
                { date: "5th June 2023", description: "Honey extracted and filtered." },
                { date: "10th June 2023", description: "Quality control inspection." },
                { date: "12th June 2023", description: "Honey bottled and labeled for sale." },
                { date: "15th June 2023", description: "Honey placed for sale in the local store." },
                { date: "18th June 2023", description: "Consumer purchases honey from the store." },
            ],
        },
        {
            title: "Used Gameboy",
            description:
                "A used Gameboy, just like a car, can have a detailed history of ownership, repairs, and upgrades. Each event ensures the buyer knows the exact condition and history of the product.",
            events: [
                { date: "15th January 2023", description: "Gameboy purchased from online marketplace." },
                { date: "20th February 2023", description: "Screen replaced due to malfunction." },
                { date: "10th December 2024", description: "Custom shell added for personalization." },
                { date: "12th March 2025", description: "Listed for sale online." },
                { date: "16th March 2025", description: "Gameboy sold to new owner." },
            ],
        },
        {
            title: "Used Car Purchase",
            description:
                "The history of a used car is full of events and repairs that can help buyers make an informed decision. This chain helps buyers see the complete history of repairs and ownership.",
            events: [
                { date: "1st January 2023", description: "Car purchased from online marketplace." },
                { date: "15th January 2023", description: "Oil change and filter replacement." },
                { date: "28th January 2024", description: "New tires installed." },
                { date: "5th February 2024", description: "Turbocharger repaired." },
                { date: "20th March 2025", description: "Car resold online." },
            ],
        },
        {
            title: "Job Seeker's Journey",
            description:
                "The path of a job seeker, from education and internships to landing the perfect job, showcases their skills and dedication. This chain highlights the milestones achieved by the person in their career journey.",
            events: [
                { date: "1st June 2015", description: "Graduated with a degree in Computer Science." },
                { date: "15th June 2015", description: "Completed English language course." },
                { date: "1st March 2017", description: "Started working at Acme Ltd." },
                { date: "10th June 2017", description: "Completed 5 more technical courses." },
                { date: "5th October 2020", description: "Won company tennis tournament." },
                { date: "20th December 2021", description: "Left job to start a new venture." },
            ],
        },
    ];

    const handleCardClick = (index) => {
        if (expandedCard === index) {
            setExpandedCard(null);
        } else {
            setExpandedCard(index);
        }
    };

    return (
        <div className="case-study-container">
            <h2 className="page-title">Case Study</h2>
            <p className="case-description">
                The TrustChain helps build transparency and accountability by tracking every significant event related to a product or person. It enables sellers to provide proof of their product’s history and allows buyers to make well-informed decisions based on verified events.            </p>
            <p>
                Records with photos and confirmations are secured by blockchain and can't be altered.
            </p>
            <p>
                Each product or event in TrustChain is linked to a unique QR code, providing quick access to verified information, secured by blockchain.
            </p>
            {scenarios.map((scenario, index) => (
                <div
                    key={index}
                    className={`case-card ${expandedCard === index ? "expanded" : ""}`}
                    onClick={() => handleCardClick(index)}  // Открытие и закрытие карточки по клику
                >
                    <div className="case-header">
                        <h3>{scenario.title}</h3>
                        <p>{scenario.description}</p>
                    </div>

                    <div className={`case-body ${expandedCard === index ? "visible" : ""}`}>
                        <ul className="events-list">
                            {scenario.events.map((event, idx) => (
                                <li key={idx} className="event">
                                    <span className="emoji" role="img" aria-label="link symbol">🔗</span>
                                    <div className="event-title">{event.description}</div>
                                    <div className="event-details">
                                        <span className="event-date">{event.date}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CaseStudy;