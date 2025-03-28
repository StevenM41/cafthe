import React, { useEffect, useState } from 'react';
import Tags from "./Tags";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import '../styles/CardArticle.css'
import { useCart } from "../context/CartContext";

function CardArticle({ p }) {
    const { addToCard } = useCart();

    const navigate = useNavigate();
    const [promo, setPromo] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/article/promotions`)
            .then((result) => setPromo(result.data))
            .catch((err) => console.error("Erreur lors de la récupération des articles en promotion - (CardArticle)", err));
    }, []);

    function createAchat(id) {
        navigate(`/card?action=achat&article_id=${id}`);
    }

    function reducePrice(price, reduce) {
        const reductionAmount = (reduce / 100) * price;
        const newPrice = price - reductionAmount;
        return newPrice.toFixed(2);
    }

    function getPromotionDiscount(articleId) {
        const promotion = promo.find(p => p.article_id === articleId);
        return promotion ? promotion.promotion_discount : 0;
    }

    function isPromotionActive(articleID) {
        const promotion = promo.find(p => p.article_id === articleID);

        if (!promotion) {
            return false;
        }

        const startDate = new Date(promotion.promotion_start).getTime();
        const endDate = new Date(promotion.promotion_end).getTime();
        const currentDate = Date.now();
        return currentDate >= startDate && currentDate <= endDate;
    }

    function initToCard(article_id) {
        addToCard(article_id);
    }

    return (
        <section className={"produit"}>
            <div className={"card-container"}>
                {p.map((article) => {
                    const discount = getPromotionDiscount(article.article_id);
                    const isPromoActive = isPromotionActive(article.article_id);

                    return (
                        <div key={article.article_id} className="card-article">
                            <Alert id={article.article_id} />
                            <div className={"image"}>
                                <img src={'/wallpaper.png' || article.article_img} alt={article.article_name} className="card-article-img" />
                            </div>
                            <h2 className="card-article-title">{article.article_name}</h2>
                            <p className="card-article-description">{article.article_desc}</p>
                            <div className="tags">
                                <Tags id={article.article_id} />
                            </div>
                            {isPromoActive ? (
                                <div>
                                    <p className="price price-original">{article.article_prix}€</p>
                                    <p className="price price-discounted">{reducePrice(article.article_prix, discount)}€</p>
                                    <p className="discount">(-{discount}%)</p>
                                    <button className="cart-achat" onClick={() => createAchat(article.article_id)} disabled={article.article_stock !== 0}>
                                        Acheter pour {reducePrice(article.article_prix, discount)}€
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <p className="price">{article.article_prix}€</p>
                                    <button className="cart-achat" onClick={() => createAchat(article.article_id)} disabled={article.article_stock === 0}>
                                        Acheter pour {article.article_prix}€
                                    </button>
                                </div>
                            )}
                            <button className="cart-button" onClick={() => { initToCard(article.article_id) }} disabled={article.article_stock === 0}>
                                <FaCartShopping />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default CardArticle;
