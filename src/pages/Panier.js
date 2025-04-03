import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../styles/Panier.css";
import {Link, useLocation} from "react-router-dom";

function Panier() {
    const { cartItems, clearCard, addQuantity, removeArticle, removeQuantity } = useCart();
    const [articles, setArticles] = useState([]);
    const [removingArticles, setRemovingArticles] = useState([]); // Liste des articles en train d'être supprimés

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const articleName = searchParams.get("") || "";

    console.log(searchParams);

    // Récupération des articles en fonction des IDs du panier
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlePromises = cartItems.map((item) =>
                    axios.get(`${process.env.REACT_APP_API_URL}/api/article/${item.articleID}`, {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                );

                const results = await Promise.all(articlePromises);
                const articlesData = results.map((result) => result.data);
                setArticles(articlesData);
            } catch (error) {
                console.error("Erreur lors de la récupération des articles :", error);
            }
        };

        void fetchArticles();
    }, [cartItems]);

    // Gestion de la suppression avec animation
    const handleRemoveArticle = (articleID) => {
        // Ajouter l'article à la liste des articles "en cours de suppression"
        setRemovingArticles((prev) => [...prev, articleID]);

        // Retarder la suppression réelle (par ex. : animation de 300ms)
        setTimeout(() => {
            removeArticle(articleID); // Supprimer réellement l'article
            setRemovingArticles((prev) => prev.filter((id) => id !== articleID)); // Retirer de la liste des articles en suppression
        }, 300); // Correspond à la durée de l'animation CSS
    };

    // Gestion de la validation de la commande
    const handleValidateOrder = () => {
        alert("Commande validée ! Merci pour votre achat !");
        clearCard(); // Vider le panier après validation
    };

    return (
        <div className="panier-container">
            <h2>Votre Panier</h2>
            {articles.length > 0 ? (
                <div className="article-list">
                    {articles.map((article) => {
                        // Trouver l'article correspondant dans le panier pour gérer la quantité
                        const cartItem = cartItems.find((item) => item.articleID === article.article_id);
                        const quantity = cartItem ? cartItem.Quantite : 0;

                        // Détermination du taux de taxe selon la catégorie
                        const taxRate = article.article_categorie === "café" || article.article_categorie === "thé" ? 0.05 : 0.2;

                        // Prix total par article (sans taxes)
                        const subTotal = article.article_prix * quantity;

                        // Calcul du montant de la taxe
                        const taxAmount = subTotal * taxRate;

                        // Prix total avec taxes (TTC)
                        const articleTotal = (subTotal + taxAmount).toFixed(2);

                        return (
                            <div
                                key={article.article_id}
                                className={`article-item ${
                                    removingArticles.includes(article.article_id) ? "removing" : ""
                                }`} // Ajout dynamique de la classe `removing` si l'article est en cours de suppression
                            >
                                <h3>{article.article_name}</h3>
                                <p>{article.article_desc}</p>
                                <p className="price">
                                    Prix unitaire HT : {parseFloat(article.article_prix).toFixed(2)} €
                                </p>
                                <p className="category">Catégorie : {article.article_categorie}</p>
                                <p className="article-total">
                                    Total TTC : {articleTotal} € (TVA : {taxAmount.toFixed(2)} €)
                                </p>
                                <p>
                                    Stock : {article.article_stock > 0 ? `${article.article_stock} disponibles` : "Rupture de stock"}
                                </p>
                                <div className="actions">
                                    <button
                                        onClick={() => addQuantity(article.article_id)}
                                        disabled={quantity >= article.article_stock} // Désactiver si la quantité atteint le stock
                                    >
                                        +
                                    </button>
                                    <p>{quantity}</p>
                                    <button
                                        onClick={() => removeQuantity(article.article_id)}
                                        disabled={quantity === 0}
                                    >
                                        -
                                    </button>
                                    <button onClick={() => handleRemoveArticle(article.article_id)}>
                                        Retirer
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="empty-message">
                    <p>Votre panier est vide. Ajoutez des articles pour commencer !</p>
                    <Link to={"/shop"}>Acheter un article !</Link>
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="total-container">
                    <h3>
                        Total général TTC :{" "}
                        {cartItems
                            .reduce((total, item) => {
                                const article = articles.find((article) => article.article_id === item.articleID);
                                if (!article) return total;

                                const taxRate = article.article_categorie === "café" || article.article_categorie === "thé" ? 0.05 : 0.2;
                                const subTotal = article.article_prix * item.Quantite;
                                const taxAmount = subTotal * taxRate;

                                return total + subTotal + taxAmount;
                            }, 0)
                            .toFixed(2)}{" "}
                        €
                    </h3>
                </div>
            )}

            {articles.length > 0 && (
                <div className="panier-actions">
                    <button id="clear-cart" onClick={clearCard}>
                        Vider le panier
                    </button>
                    <button id="validate-cart" onClick={handleValidateOrder}>
                        Valider le panier
                    </button>
                </div>
            )}
        </div>
    );
}

export default Panier;