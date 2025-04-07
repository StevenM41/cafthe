import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CGV from './CGV';
import PolitiqueDeConfidentialite from './PolitiqueConfidentialite';
import MentionsLegales from './MentionLegale';

function Legacy() {
    const [activeSection, setActiveSection] = useState("cgv");
    const location = useLocation();

    useEffect(() => {
        const hash = location.hash.substring(1);
        if (hash) {
            setActiveSection(hash);
        }
    }, [location]);

    function handleSectionChange(value) {
        setActiveSection(value);
    }

    return (
        <div className="account-page">
            <nav className="account-nav">
                <ul>
                    <li onClick={() => handleSectionChange('cgv')} className={activeSection === 'cgv' ? 'active' : ''}>CGV</li>
                    <li onClick={() => handleSectionChange('politique-de-confidentialite')} className={activeSection === 'politique-de-confidentialite' ? 'active' : ''}>Politique de confidentialité</li>
                    <li onClick={() => handleSectionChange('mention-legale')} className={activeSection === 'mention-legale' ? 'active' : ''}>Mentions Légales</li>
                </ul>
            </nav>
            <div className="account-main">
                <section id="cgv">{activeSection === 'cgv' && <CGV />}</section>
                <section id="politique-de-confidentialite">{activeSection === 'politique-de-confidentialite' && <PolitiqueDeConfidentialite />}</section>
                <section id="mention-legale">{activeSection === 'mention-legale' && <MentionsLegales />}</section>
            </div>
        </div>
    );
}

export default Legacy;
