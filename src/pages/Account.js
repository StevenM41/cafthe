import React, {useContext, useState} from 'react';
import '../styles/Account.css'
import Profile from "../components/Profile";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

function Account() {
    const [activeSection, setActiveSection] = useState('profile');

    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    if (!isAuthenticated) {
        return (
            <div className="error-access">
                <h1>Veuillez vous connecter</h1>
                <p>Vous devez être connecté pour voir cette page.</p>
                <button onClick={handleLoginClick}>Se connecter</button>
            </div>
        );
    }

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="account-page">
            <nav className="account-nav">
                <ul>
                    <li onClick={() => handleSectionChange('profile')} className={activeSection === 'profile' ? 'active' : ''}>Profile</li>
                    <li onClick={() => handleSectionChange('orders')} className={activeSection === 'orders' ? 'active' : ''}>Orders</li>
                    <li onClick={() => handleSectionChange('settings')} className={activeSection === 'settings' ? 'active' : ''}>Settings</li>
                </ul>
            </nav>
            <div className="account-main">
                {activeSection === 'profile' && <Profile />}
                {activeSection === 'orders' && <Orders />}
                {activeSection === 'settings' && <Settings />}
            </div>
        </div>
    );
}

const Orders = () => (
    <div>
        <h2>Orders</h2>
        <p>View your order history here.</p>
    </div>
);

const Settings = () => (
    <div>
        <h2>Settings</h2>
        <p>Manage your account settings here.</p>
    </div>
);

export default Account;
