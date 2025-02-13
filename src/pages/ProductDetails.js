import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function ProductDetails() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const { token } = useContext(AuthContext); // Récupérer le token du contexte

    console.log(token)

    useEffect(() => {
        const fetchProduit = async () => {
            try {
                if (token) {
                    console.log("En-têtes envoyés :", {
                        'Authorization': `Bearer ${token}`,
                    });
                    fetch(`http://localhost:3001/api/article/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`, // Inclure le token dans l'en-tête
                        },
                    })
                        .then(response => response.json())
                        .then(data => setArticle(data));
                }
            } catch (error) {
                console.error("Erreur au chargement du produit", error);
            }
        };

        void fetchProduit();
    }, [id, token]); // Dépend de l'ID du produit

    if (!article) {
        return <p>Produit introuvable ou erreur.</p>;
    }

    return (
        <div className="product-details">
            <h2>{article.article_name}</h2>
            <p>{article.article_desc}</p>
            <p>
                <strong>Prix TTC :</strong> {article.article_prix} euros
            </p>
            <p>
                <strong>Stock :</strong> {article.article_stock} unités
            </p>
        </div>
    );
}

export default ProductDetails;
