import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import "../styles/Accueil.css";

function Accueil() {
    const navigate = useNavigate();
    const [nav, setNav] = useState("");

    useEffect(() => {
        if(nav != null) {
            navigate(nav);
        }
    }, [nav, navigate]);

    return (
        <>
            <section className={"wallpaper"}>
                <div className={"container"}>
                    <h1>CAFTHÉ</h1>
                    <button onClick={() => setNav('/shop')}>Voir les articles</button>
                </div>
            </section>
        </>
    );
}

export default Accueil;

/**
*             <section className="carousel-top">
*                 <menu>
*                     <ul>
*                         {promo.map((article) => (
*                             <li
*                                 className={`cards item${promo.indexOf(article) + 1}`}
*                                 key={article.article_id}
*                                 onClick={() => setNav(`/shop/article/${article.article_id}`)}
*                                 style={{
*                                     animationDelay: `calc(60s / ${promo.length} * (${promo.length} - ${promo.indexOf(article)}) * -1)`,
*                                 }}
*                             >
*                                 <div className="animation-promo">
*                                     <div className="container">
*                                         <span className="box --rotate-0"></span>
*                                         <span className="box --rotate-15"></span>
*                                         <span className="box --rotate-30"></span>
*                                         <span className="box --rotate-45"></span>
*                                         <span className="box --rotate-75"></span>
*                                         <span className="box --rotate-60"></span>
*                                     </div>
*                                     <p>-{Math.round(article.promotion_discount)}%</p>
*                                 </div>
*                                 <div className={"box-img"}>
*                                     <img src={"/cafthe.png"}  alt="article-en-promotion" />
*                                 </div>
*                                 <div className="textarea">
*                                     <div className="tags">
*                                         {tagsMap[article.article_id]?.map((tag, index) => (
*                                             <span key={index}> {tag.tag_name} </span>
*                                         ))}
*                                     </div>
*                                     <div className="details">
*                                         <h2 className="title">{article.article_name}</h2>
*                                         <p className="desc">{article.article_desc}</p>
*                                         <div className={"price"}>
*                                             <span>{article.article_prix}€</span>
*                                             <p>{reducePrice(article.article_prix, article.promotion_discount)}€</p>
*                                         </div>
*                                         <div className={"actions"}>
*                                             <button onClick={() => {setNav(""); setNav(`/card/add/article/${article.article_id}`)}}>
*                                                 <FaShoppingBasket/>
*                                             </button>
*                                             <button onClick={() => {setNav(""); setNav("/")}}>Acheter</button>
*                                         </div>
*                                     </div>
*                                 </div>
*                             </li>
*                         ))}
*                     </ul>
*                 </menu>
*             </section>
*             <section className={"product-details"}>
*                 <div className={"cafe"}>
*                     <h2>Café</h2>
*                     <CategoryComponent number={1} />
*                 </div>
*                 <div className={"acessoires"}>
*                     <h2>Accessoires</h2>
*                     <CategoryComponent number={3} />
*                 </div>
*                 <div className={"the"}>
*                     <h2>Thé</h2>
*                     <CategoryComponent number={2} />
*                 </div>
*             </section>
 */