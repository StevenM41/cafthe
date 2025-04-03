import React, { useEffect, useState } from 'react';
import Tags from "./Tags";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { FaCartShopping } from "react-icons/fa6";
import axios from "axios";
import '../styles/CardArticle.css'
import { useCart } from "../context/CartContext";
import { DetailProduits } from "./DetailProduits";

function CardArticle({ p }) {
    const {addToCard} = useCart();
    const navigate = useNavigate();
    const [promo, setPromo] = useState([]);
    const [detailProduits, setDetailProduits] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/article/promotions`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((result) => setPromo(result.data))
            .catch((err) => console.error("Erreur lors de la récupération des articles en promotion - (CardArticle)", err));
    }, []);

    function createAchat(id) {
        addToCard(id);
        navigate(`/card`);
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

    function getDetailProduits(article_id) {
        axios.get(`${process.env.REACT_APP_API_URL}/api/article/${article_id}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log(response.data); // Log the details for debugging
                setDetailProduits(response.data);
            })
            .catch((err) => console.error("Erreur lors de la récupération des détails de l'article", err));
    }

    console.log(detailProduits);

    return (
        <section className={"produit"}>
            <div>
                {/* MODAL */}
                {showModal && (
                    <DetailProduits detailProduits={detailProduits} setShowModal={setShowModal}/>
                )}

                {/* LISTE DES ARTICLES */}
                <div className={"card-container"}>
                    {p.map((article) => {
                        const discount = getPromotionDiscount(article.article_id);
                        const isPromoActive = isPromotionActive(article.article_id);

                        return (
                            <div
                                key={article.article_id}
                                className="card-article"
                                onClick={() => {
                                    setShowModal(true);
                                    getDetailProduits(article.article_id);
                                }}
                            >
                                <Alert id={article.article_id}/>
                                <div className={"image"}>
                                    <img
                                        src={
                                            article.article_img ||
                                            "/wallpaper.png"
                                        }
                                        alt={article.article_name}
                                        className="card-article-img"
                                    />
                                </div>
                                <h2 className="card-article-title">
                                    {article.article_name}
                                </h2>
                                <p className="card-article-description">
                                    {article.article_desc}
                                </p>
                                <div className="tags">
                                    <Tags id={article.article_id}/>
                                </div>

                                {/* Section des promotions */}
                                {isPromoActive ? (
                                    <div>
                                        <p className="price price-original">
                                            {article.article_prix}€
                                        </p>
                                        <p className="price price-discounted">
                                            {reducePrice(
                                                article.article_prix,
                                                discount
                                            )}
                                            €
                                        </p>
                                        <p className="discount">
                                            (-{discount}%)
                                        </p>
                                        <button className="cart-achat" onClick={() => createAchat(article.article_id)} disabled={article.article_stock !== 0}>
                                            Acheter pour{" "} {reducePrice(article.article_prix, discount)}€
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="price">
                                            {article.article_prix}€
                                        </p>
                                        <button
                                            className="cart-achat" onClick={() => createAchat(article.article_id)} disabled={article.article_stock === 0}>
                                            Acheter pour {article.article_prix}€
                                        </button>
                                    </div>
                                )}
                                <button
                                    className="cart-button"
                                    onClick={() => {
                                        initToCard(article.article_id);
                                    }}
                                    disabled={article.article_stock === 0}
                                >
                                    <FaCartShopping/>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default CardArticle;
