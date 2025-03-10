import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryComponent = ({ number }) => {
    const [categorie, setCategorie] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/article/c/categorie/${number}`)
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
