import React from 'react';
import '../styles/PolitiqueConfidentialite.css'; // Import the CSS file

function PolitiqueConfidentialite() {
    return (
        <div className="politique-page">
            <h2 className="politique-title">Politique de Confidentialité</h2>
            <p className="politique-updated">Dernière mise à jour : Avril 2025</p>

            <section className="politique-section">
                <h3 className="politique-section-title">Collecte de Données</h3>
                <p className="politique-section-content">
                    Nous collectons des informations personnelles telles que votre nom, adresse e-mail, et numéro de téléphone lorsque vous créez un compte ou passez une commande.
                </p>
            </section>

            <section className="politique-section">
                <h3 className="politique-section-title">Utilisation des Données</h3>
                <p className="politique-section-content">
                    Les données collectées sont utilisées pour traiter vos commandes, personnaliser votre expérience utilisateur, et vous informer des offres et promotions.
                </p>
            </section>

            <section className="politique-section">
                <h3 className="politique-section-title">Partage des Données</h3>
                <p className="politique-section-content">
                    Nous ne partageons pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour fournir nos services ou si la loi l'exige.
                </p>
            </section>

            <section className="politique-section">
                <h3 className="politique-section-title">Sécurité des Données</h3>
                <p className="politique-section-content">
                    Nous mettons en œuvre des mesures de sécurité pour protéger vos données personnelles contre tout accès non autorisé ou divulgation.
                </p>
            </section>

            <section className="politique-section">
                <h3 className="politique-section-title">Vos Droits</h3>
                <p className="politique-section-content">
                    Vous avez le droit d'accéder, de modifier, ou de supprimer vos données personnelles. Pour exercer ces droits, veuillez nous contacter.
                </p>
            </section>

            <section className="politique-section">
                <h3 className="politique-section-title">Modifications de la Politique</h3>
                <p className="politique-section-content">
                    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page.
                </p>
            </section>

            <section className="politique-section">
                <h3 className="politique-section-title">Contact</h3>
                <p className="politique-section-content">
                    Pour toute question concernant notre politique de confidentialité, veuillez nous contacter à l'adresse suivante : support@cafthe.net.
                </p>
            </section>
        </div>
    );
}

export default PolitiqueConfidentialite;
