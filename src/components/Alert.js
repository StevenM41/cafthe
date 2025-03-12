import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Alert({ id }) {
    const [article, setArticle] = useState(null);

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
                    Rupture de stock !
                </div>
            )}
            {article.article_stock > 0 && article.article_stock <= 5 && (
                <div className="alert alert-warning">
                    Stock limité !
                </div>
            )}
            {article.promotions_id && (
                <div className="alert alert-success">
                    Promotion en cours !
                </div>
            )}
        </div>
    );
}

export default Alert;
