import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ article }) {

    return (
        <>
            <div className="product-card">
                {/* image */}
                <h3>{article.article_name}</h3>
                <p>{article.article_prix}€</p>
                <Link to={`/produit/${article.article_id}`} className="details-btn">
                    Voir détails
                </Link>
            </div>
        </>
    );
}

export default ProductCard;
