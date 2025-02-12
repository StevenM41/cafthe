import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token"); // Récupère le token du localStorage

        const fetchProduit = async () => {
            try {
                if (token) {
                    const response = await fetch(`http://localhost:3001/api/article/${id}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`, // En-tête Authorization avec le token
                            "Content-Type": "application/json", // Si l'API attend des données JSON
                        },
                    });

                    if (!response.ok) {
                        new Error(`Erreur HTTP : ${response.status}`);
                    }

                    const data = await response.json();
                    setArticle(data); // Mets à jour l'état avec les données du produit
                } else {
                    console.log("Token non trouvé.");
                }
            } catch (error) {
                console.error("Erreur au chargement du produit", error);
            }
        };

        void fetchProduit(); // Appelle la fonction pour récupérer les données
    }, [id]); // Dépend de l'ID du produit

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
