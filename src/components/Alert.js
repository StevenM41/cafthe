import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Alert({ id }) {
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/article/${id}`)
            .then((result) => {
                setArticle(result.data);
            })
            .catch((err) => console.error("Erreur lors de la récupération des Articles (Alert)", err));
    }, [id]);

    if (!article) {
        return <></>;
    }

    return (
        <div>
            {article.article_stock === 0 && (
                <div className="alert alert-danger">
                   <p>Rupture de stock !</p>
                </div>
            )}
            {article.article_stock > 0 && article.article_stock <= 5 && (
                <div className="alert alert-warning">
                    <p>Stock limité !</p>
                </div>
            )}
            {article.promotions_id && (
                <div className="alert alert-success">
                    <p>Promotion en cours !</p>
                </div>
            )}
        </div>
    );
}

export default Alert;
