import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import "../styles/accueil.css";
import CategoryComponent from "../components/CategoryComponent";

function Accueil() {
    const [article, setArticle] = useState([]);
    const [promo, setPromo] = useState([]);
    const [tagsMap, setTagsMap] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3001/api/article")
            .then((articles) => {
                setArticle(articles.data);
            }).catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/api/article/promotions")
            .then((r) => setPromo(r.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            const tagsMap = {};
            for (const article of promo) {
                try {
                    const response = await axios.get(`http://localhost:3001/api/article/tags/${article.article_id}`);
                    tagsMap[article.article_id] = response.data;
                } catch (error) {
                    console.error("Erreur lors de la récupération des tags :", error);
                }
            }
            setTagsMap(tagsMap);
        };

        void fetchTags();
    }, [promo]);

    function reducePrice( price, reduce ) {
        const reductionAmount = (reduce / 100) * price;
        const newPrice = price - reductionAmount;
        return newPrice.toFixed(2);
    }

    return (
        <>
            <section className={"carousel-top"}>
                <menu>
                    <ul>
                        {promo.map((article) => (
                            <li className={"cards"} key={article.article_id}>
                                <Link to={`/shop/article/article_id?=${article.article_id}`}></Link>
                                <span>-{Math.round(article.promotion_discount)}%</span>
                                <img src="/cafthe.png" alt="article-en-promotion" width={50} height={50} />
                                <div className="textarea">
                                    <div className={"tags"}>
                                        {tagsMap[article.article_id]?.map((tag, index) => (
                                            <span key={index}> {tag.tag_name} </span>
                                        ))}
                                    </div>
                                    <div className={"details"}>
                                        <h2 className={"title"}>{article.article_name}</h2>
                                        <p className={"desc"}>{article.article_desc}</p>
                                        <div className={""}>
                                            <span>{article.article_prix}€</span>
                                            <p>{reducePrice(article.article_prix, article.promotion_discount)}€</p>
                                            <Link to={`/card/add/article/${article.article_id}`}>Ajouté au panier</Link>
                                            <Link to={"/"}>Acheté</Link>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </menu>
            </section>
            <section className={"product-details"}>
                <div className={"cafe"}>
                    <h2>Café</h2>
                    <CategoryComponent number={1} />
                </div>
                <div className={"acessoires"}>
                    <h2>Accesoires</h2>
                    <CategoryComponent number={3} />
                </div>
                <div className={"the"}>
                    <h2>Thé</h2>
                    <CategoryComponent number={2} />
                </div>
            </section>
            <section>
                <div className={"annimation-promo"}>
                    <div className={"container"}>
                        <span className={"box --rotate-0"}></span>
                        <span className={"box --rotate-15"}></span>
                        <span className={"box --rotate-30"}></span>

                        <span className={"box --rotate-75"}></span>
                        <span className={"box --rotate-60"}></span>
                    </div>
                    <p>-25%</p>
                </div>

            </section>
        </>
    );
}

export default Accueil;
