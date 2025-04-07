import React from 'react';
import '../styles/MentionLegale.css';
import {Link} from "react-router-dom"; // Import the CSS file

function MentionLegale() {
    return (
        <div className="mention-page">
            <h2 className="mention-title">Mentions Légales</h2>
            <p className="mention-updated">Dernière mise à jour : Avril 2025</p>

            <section className="mention-section">
                <h3 className="mention-section-title">Identité</h3>
                <p className="mention-section-content">
                    Mallochet Steven
                </p>
            </section>

            <section className="mention-section">
                <h3 className="mention-section-title">Responsable de la Publication</h3>
                <p className="mention-section-content">
                    Mallochet Steven
                </p>
            </section>

            <section className="mention-section">
                <h3 className="mention-section-title">Coordonnées</h3>
                <p className="mention-section-content">
                    Téléphone : 06 72 22 18 93
                </p>
            </section>

            <section className="mention-section">
                <h3 className="mention-section-title">Mentions Relatives à la Propriété Intellectuelle</h3>
                <p className="mention-section-content">
                    Liste des éléments n'appartenant pas à Mallochet Steven :
                </p>
                <ul className="mention-section-content">
                    <li>Images utilisées sur la page d'accueil : Photo par <Link to="https://mistral.ai">Mistral.ia</Link>, sous licence libre de droits.</li>
                    <li>Icônes utilisées dans le menu : <Link to="https://react-icons.github.io/" target={"_blank"}>React icons</Link>, sous licence libre de droits.</li>
                    <li>Utilisation de la bibliothèque JavaScript : <a href="https://reactjs.org">React JS</a>, sous licence MIT.</li>
                    <li>Police utilisée pour les titres : <a href="https://fonts.google.com">Google Fonts</a>, sous licence libre de droits.</li>
                </ul>
            </section>

            <section className="mention-section">
                <h3 className="mention-section-title">Mentions Relatives à l’Hébergement du Site</h3>
                <p className="mention-section-content">
                    Nom de l’hébergeur : La CCI Centre
                </p>
                <p className="mention-section-content">
                    Raison sociale : Chambre de Commerce et d’Industrie de l’Indre – CCI Campus Centre
                </p>
                <p className="mention-section-content">
                    Adresse : 16 Place Saint Cyran, 36000 Châteauroux
                </p>
                <p className="mention-section-content">
                    Numéro de téléphone : 06 72 22 18 93
                </p>
            </section>

            <section className="mention-section">
                <h3 className="mention-section-title">Données Personnelles</h3>
                <p className="mention-section-content">
                    Les données personnelles collectées sur ce site incluent l'email, le téléphone, le nom, le prénom, et le mot de passe (hashé). Ces données sont traitées conformément à notre politique de confidentialité.
                </p>
            </section>
        </div>
    );
}

export default MentionLegale;
