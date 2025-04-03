import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryComponent = ({ number }) => {
    const [categorie, setCategorie] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/article/c/categorie/${number}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                setCategorie(response.data);
            })
            .catch((err) => console.error(err));
    }, [number]);

    const getNumberOfCategorieId = () => {
        if (categorie.length > 0) {
            return categorie[0].ID;
        }
        return null;
    };

    return (
        <p>{getNumberOfCategorieId()}</p>
    );
};

export default CategoryComponent;
