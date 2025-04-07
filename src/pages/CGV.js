import React from 'react';
import '../styles/CGV.css'; // Import the CSS file

function CGV() {
    return (
        <div className="cgv-page">
            <h2 className="cgv-title">Conditions Générales de Vente</h2>
            <p className="cgv-updated">Dernière mise à jour : Avril 2025</p>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Acceptation des Conditions</h3>
                <p className="cgv-section-content">
                    En accédant à ce site et en utilisant nos services, vous acceptez sans réserve les présentes conditions générales de vente.
                </p>
            </section>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Description des Services</h3>
                <p className="cgv-section-content">
                    Nous offrons une variété de services décrits sur notre site. Les descriptions sont fournies à titre indicatif et peuvent être modifiées sans préavis.
                </p>
            </section>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Prix et Paiement</h3>
                <p className="cgv-section-content">
                    Les prix affichés sur le site sont en euros et toutes taxes comprises (TTC). Le paiement s'effectue en ligne par carte bancaire ou via d'autres moyens de paiement acceptés.
                </p>
            </section>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Livraison</h3>
                <p className="cgv-section-content">
                    Les produits sont livrés à l'adresse indiquée par le client lors de la commande. Les délais de livraison peuvent varier en fonction des disponibilités et des conditions de transport.
                </p>
            </section>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Droit de Rétractation</h3>
                <p className="cgv-section-content">
                    Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour exercer votre droit de rétractation.
                </p>
            </section>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Responsabilité</h3>
                <p className="cgv-section-content">
                    Nous ne saurions être tenus responsables des dommages indirects résultant de l'utilisation de nos services. Notre responsabilité est limitée au montant de la commande.
                </p>
            </section>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Protection des Données</h3>
                <p className="cgv-section-content">
                    Nous nous engageons à protéger vos données personnelles conformément à notre politique de confidentialité.
                </p>
            </section>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Droit Applicable</h3>
                <p className="cgv-section-content">
                    Les présentes conditions générales de vente sont soumises au droit français. Tout litige relatif à leur interprétation et/ou à leur exécution relève des juridictions françaises.
                </p>
            </section>

            <section className="cgv-section">
                <h3 className="cgv-section-title">Contact</h3>
                <p className="cgv-section-content">
                    Pour toute question relative aux présentes conditions générales de vente, vous pouvez nous contacter à l'adresse suivante : support@cafthe.net.
                </p>
            </section>
        </div>
    );
}

export default CGV;
