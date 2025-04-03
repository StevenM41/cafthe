import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import '../styles/Settings.css';

// Fix for Leaflet default icon path
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function Settings() {
    const [account, setAccount] = useState({ username: '', email: '' });
    const [address, setAddress] = useState({ street: '', city: '', postalCode: '', country: '' });
    const [position, setPosition] = useState([48.8566, 2.3522]); // Default position (Paris)

    const handleAccountChange = (e) => {
        const { name, value } = e.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        // Implement save changes logic here
    };

    const handleDeleteAccount = () => {
        // Implement delete account logic here
    };

    const validatePostalCode = (postalCode) => {
        const postalCodeRegex = /^[A-Za-z0-9]{5,}$/;
        return postalCodeRegex.test(postalCode);
    };

    const handleMapClick = (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
    };

    useEffect(() => {
        if (address.street && address.city && address.postalCode && address.country) {
            const fullAddress = `${address.street}, ${address.city}, ${address.postalCode}, ${address.country}`;
            axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json`)
                .then(response => {
                    if (response.data.length > 0) {
                        const { lat, lon } = response.data[0];
                        setPosition([lat, lon]);
                    }
                })
                .catch(error => {
                    console.error('Error fetching location:', error);
                });
        }
    }, [address]);

    return (
        <div>En développement</div>
    )

    return (
        <div className="settings-account">
            <h2>Account Settings</h2>
            <div>
                <h3>Modify Account</h3>
                <label>
                    Nom d'utilisateur :
                    <input type="text" name="username" value={account.username} onChange={handleAccountChange} />
                </label>
                <br />
                <label>
                    E-mail:
                    <input type="email" name="email" value={account.email} onChange={handleAccountChange} />
                </label>
                <br />
                <button onClick={handleSaveChanges}>Save Changes</button>
                <button onClick={handleDeleteAccount}>Delete Account</button>
            </div>
            <br />
            <div>
                <h3>Ajouter une adresse</h3>
                <label>
                    Adresse:
                    <input type="text" name="street" value={address.street} onChange={handleAddressChange} />
                </label>
                <br />
                <label>
                    Ville:
                    <input type="text" name="city" value={address.city} onChange={handleAddressChange} />
                </label>
                <br />
                <label>
                    Code Postal:
                    <input
                        type="text"
                        name="postalCode"
                        value={address.postalCode}
                        onChange={handleAddressChange}
                        pattern="[A-Za-z0-9]{5,}"
                        min={5}
                        max={5}
                        required
                    />
                    {!validatePostalCode(address.postalCode) && address.postalCode && (
                        <span style={{ color: 'red' }}>Invalid postal code</span>
                    )}
                </label>
                <br />
                <label>
                    Pays:
                    <select name="country" value={address.country} onChange={handleAddressChange}>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albanie">Albanie</option>
                        <option value="Algérie">Algérie</option>
                        <option value="Andorre">Andorre</option>
                        <option value="Angola">Angola</option>
                        <option value="Antigua-et-Barbuda">Antigua-et-Barbuda</option>
                        <option value="Argentine">Argentine</option>
                        <option value="Arménie">Arménie</option>
                        <option value="Australie">Australie</option>
                        <option value="Autriche">Autriche</option>
                        <option value="Azerbaïdjan">Azerbaïdjan</option>
                        <option value="Bahamas">Bahamas</option>
                        <option value="Bahreïn">Bahreïn</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Barbade">Barbade</option>
                        <option value="Biélorussie">Biélorussie</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Belize">Belize</option>
                        <option value="Bénin">Bénin</option>
                        <option value="Bhoutan">Bhoutan</option>
                        <option value="Bolivie">Bolivie</option>
                        <option value="Bosnie-Herzégovine">Bosnie-Herzégovine</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Brésil">Brésil</option>
                        <option value="Brunei">Brunei</option>
                        <option value="Bulgarie">Bulgarie</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Burundi">Burundi</option>
                        <option value="Cabo Verde">Cabo Verde</option>
                        <option value="Cambodge">Cambodge</option>
                        <option value="Cameroun">Cameroun</option>
                        <option value="Canada">Canada</option>
                        <option value="Chili">Chili</option>
                        <option value="Chine">Chine</option>
                        <option value="Colombie">Colombie</option>
                        <option value="Comores">Comores</option>
                        <option value="Congo">Congo</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Croatie">Croatie</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Chypre">Chypre</option>
                        <option value="République tchèque">République tchèque</option>
                        <option value="Danemark">Danemark</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominique">Dominique</option>
                        <option value="République dominicaine">République dominicaine</option>
                        <option value="Équateur">Équateur</option>
                        <option value="Égypte">Égypte</option>
                        <option value="Salvador">Salvador</option>
                        <option value="Guinée équatoriale">Guinée équatoriale</option>
                        <option value="Érythrée">Érythrée</option>
                        <option value="Estonie">Estonie</option>
                        <option value="Eswatini">Eswatini</option>
                        <option value="Éthiopie">Éthiopie</option>
                        <option value="Fidji">Fidji</option>
                        <option value="Finlande">Finlande</option>
                        <option value="France">France</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Gambie">Gambie</option>
                        <option value="Géorgie">Géorgie</option>
                        <option value="Allemagne">Allemagne</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Grèce">Grèce</option>
                        <option value="Grenade">Grenade</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Guinée">Guinée</option>
                        <option value="Guinée-Bissau">Guinée-Bissau</option>
                        <option value="Guyana">Guyana</option>
                        <option value="Haïti">Haïti</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Hongrie">Hongrie</option>
                        <option value="Islande">Islande</option>
                        <option value="Inde">Inde</option>
                        <option value="Indonésie">Indonésie</option>
                        <option value="Iran">Iran</option>
                        <option value="Irak">Irak</option>
                        <option value="Irlande">Irlande</option>
                        <option value="Israël">Israël</option>
                        <option value="Italie">Italie</option>
                        <option value="Jamaïque">Jamaïque</option>
                        <option value="Japon">Japon</option>
                        <option value="Jordanie">Jordanie</option>
                        <option value="Kazakhstan">Kazakhstan</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Kiribati">Kiribati</option>
                        <option value="Corée du Nord">Corée du Nord</option>
                        <option value="Corée du Sud">Corée du Sud</option>
                        <option value="Kosovo">Kosovo</option>
                        <option value="Koweït">Koweït</option>
                        <option value="Kirghizistan">Kirghizistan</option>
                        <option value="Laos">Laos</option>
                        <option value="Lettonie">Lettonie</option>
                        <option value="Liban">Liban</option>
                        <option value="Lesotho">Lesotho</option>
                        <option value="Liberia">Liberia</option>
                        <option value="Libye">Libye</option>
                        <option value="Liechtenstein">Liechtenstein</option>
                        <option value="Lituanie">Lituanie</option>
                        <option value="Luxembourg">Luxembourg</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Malaisie">Malaisie</option>
                        <option value="Maldives">Maldives</option>
                        <option value="Mali">Mali</option>
                        <option value="Malte">Malte</option>
                        <option value="Îles Marshall">Îles Marshall</option>
                        <option value="Mauritanie">Mauritanie</option>
                        <option value="Maurice">Maurice</option>
                        <option value="Mexique">Mexique</option>
                        <option value="Micronésie">Micronésie</option>
                        <option value="Moldavie">Moldavie</option>
                        <option value="Monaco">Monaco</option>
                        <option value="Mongolie">Mongolie</option>
                        <option value="Monténégro">Monténégro</option>
                        <option value="Maroc">Maroc</option>
                        <option value="Mozambique">Mozambique</option>
                        <option value="Myanmar">Myanmar</option>
                        <option value="Namibie">Namibie</option>
                        <option value="Nauru">Nauru</option>
                        <option value="Népal">Népal</option>
                        <option value="Pays-Bas">Pays-Bas</option>
                        <option value="Nouvelle-Zélande">Nouvelle-Zélande</option>
                        <option value="Nicaragua">Nicaragua</option>
                        <option value="Niger">Niger</option>
                        <option value="Nigéria">Nigéria</option>
                        <option value="Macédoine du Nord">Macédoine du Nord</option>
                        <option value="Norvège">Norvège</option>
                        <option value="Oman">Oman</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Palau">Palau</option>
                        <option value="Palestine">Palestine</option>
                        <option value="Panama">Panama</option>
                        <option value="Papouasie-Nouvelle-Guinée">Papouasie-Nouvelle-Guinée</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Pérou">Pérou</option>
                        <option value="Philippines">Philippines</option>
                        <option value="Pologne">Pologne</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Qatar">Qatar</option>
                        <option value="Roumanie">Roumanie</option>
                        <option value="Russie">Russie</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Saint-Christophe-et-Niévès">Saint-Christophe-et-Niévès</option>
                        <option value="Sainte-Lucie">Sainte-Lucie</option>
                        <option value="Saint-Vincent-et-les Grenadines">Saint-Vincent-et-les Grenadines</option>
                        <option value="Samoa">Samoa</option>
                        <option value="Saint-Marin">Saint-Marin</option>
                        <option value="Sao Tomé-et-Principe">Sao Tomé-et-Principe</option>
                        <option value="Arabie saoudite">Arabie saoudite</option>
                        <option value="Sénégal">Sénégal</option>
                        <option value="Serbie">Serbie</option>
                        <option value="Seychelles">Seychelles</option>
                        <option value="Sierra Leone">Sierra Leone</option>
                        <option value="Singapour">Singapour</option>
                        <option value="Slovaquie">Slovaquie</option>
                        <option value="Slovénie">Slovénie</option>
                        <option value="Îles Salomon">Îles Salomon</option>
                        <option value="Somalie">Somalie</option>
                        <option value="Afrique du Sud">Afrique du Sud</option>
                        <option value="Soudan du Sud">Soudan du Sud</option>
                        <option value="Espagne">Espagne</option>
                        <option value="Sri Lanka">Sri Lanka</option>
                        <option value="Soudan">Soudan</option>
                        <option value="Suriname">Suriname</option>
                        <option value="Suède">Suède</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Syrie">Syrie</option>
                        <option value="Taïwan">Taïwan</option>
                        <option value="Tadjikistan">Tadjikistan</option>
                        <option value="Tanzanie">Tanzanie</option>
                        <option value="Thaïlande">Thaïlande</option>
                        <option value="Timor oriental">Timor oriental</option>
                        <option value="Togo">Togo</option>
                        <option value="Tonga">Tonga</option>
                        <option value="Trinité-et-Tobago">Trinité-et-Tobago</option>
                        <option value="Tunisie">Tunisie</option>
                        <option value="Turquie">Turquie</option>
                        <option value="Turkménistan">Turkménistan</option>
                        <option value="Tuvalu">Tuvalu</option>
                        <option value="Ouganda">Ouganda</option>
                        <option value="Ukraine">Ukraine</option>
                        <option value="Émirats arabes unis">Émirats arabes unis</option>
                        <option value="Royaume-Uni">Royaume-Uni</option>
                        <option value="États-Unis">États-Unis</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Ouzbékistan">Ouzbékistan</option>
                        <option value="Vanuatu">Vanuatu</option>
                        <option value="Vatican">Vatican</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Viêt Nam">Viêt Nam</option>
                        <option value="Yémen">Yémen</option>
                        <option value="Zambie">Zambie</option>
                        <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                </label>
                <br />
                <button onClick={handleSaveChanges}>Sauvegarder</button>
            </div>
            <br />
            <div>
                <h3>Localisation de votre adresse</h3>
                <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }} onClick={handleMapClick}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position}>
                        <Popup>
                            <div>
                                <strong>Adresse:</strong> {address.street}<br />
                                <strong>Ville:</strong> {address.city}<br />
                                <strong>Code Postal:</strong> {address.postalCode}<br />
                                <strong>Pays:</strong> {address.country}
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
}

export default Settings;
