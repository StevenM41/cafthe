import React, {useContext, useEffect, useState} from 'react';
import '../styles/Profile.css'
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

function Profile () {
    const [userInfo, setUserInfo] = useState(null);
    const { logout, user, token } = useContext(AuthContext);
    const [isEmailHidden, setIsEmailHidden] = useState(true);
    const [isPhoneHidden, setIsPhoneHidden] = useState(true);
    const navigate = useNavigate();
    const [isFinish, setFinish] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/${user.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((r) => setUserInfo(r.data))
            .catch((err) => console.error(err)).finally(() => setFinish(true));
    }, [user.id, token]);

    useEffect(() => {
        if(!isFinish) return;

        if (!userInfo) {
            if (user.id !== userInfo.user_id && user.nom !== userInfo.user_name && user.prenom !== userInfo.user_prenom) {
                logout();
                navigate('/');
            }
        }
    }, [isFinish, user, userInfo, logout, navigate]);

    if (!isFinish) {
        return <div>Loading...</div>;
    }

    const toggleEmailVisibility = () => {
        setIsEmailHidden(!isEmailHidden);
    };

    const maskEmail = (email) => {
        const [local, domain] = email.split('@');
        const maskedLocal = local.slice(0, 3) + '*'.repeat(local.length - 3);
        return `${maskedLocal}@${domain}`;
    };

    function maskPhone(user_telephone) {
        return user_telephone.toString().slice(0, 2) + '*'.repeat(user_telephone.toString().length - 2);
    }

    function togglePhoneVisibility() {
        setIsPhoneHidden(!isPhoneHidden)
    }

    return (
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            <p className="profile-description">Gérez vos informations personnelles ici.</p>
            <br />
            <table className="profile-table">
                <tbody>
                <tr>
                    <th className="profile-label">Nom:</th>
                    <td className="profile-value">{userInfo.user_name}</td>
                </tr>
                <tr>
                    <th className="profile-label">Prenom:</th>
                    <td className="profile-value">{userInfo.user_prenom}</td>
                </tr>
                <tr>
                    <th className="profile-label">E-mail:</th>
                    <td className="profile-value">
                        {isEmailHidden ? maskEmail(userInfo.user_email) : userInfo.user_email}
                        <button className="toggle-button" onClick={toggleEmailVisibility}>
                            {isEmailHidden ?  <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </button>
                    </td>
                </tr>
                <tr>
                    <th className="profile-label">Téléphone:</th>
                    <td className="profile-value">
                        {isPhoneHidden ? maskPhone(userInfo.user_telephone) : userInfo.user_telephone}
                        <button className="toggle-button" onClick={togglePhoneVisibility}>
                            {isPhoneHidden ?  <BsFillEyeFill /> : <BsFillEyeSlashFill />}
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Profile;
