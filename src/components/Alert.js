import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Alert.css'
import {LuBadgePercent} from "react-icons/lu";
import {IoIosWarning} from "react-icons/io";
import {AiOutlineStop} from "react-icons/ai";

function Alert({ id }) {
    const [article, setArticle] = useState([]);
    const [promo, setPromo] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/article/${id}`)
            .then((result) => {setArticle(result.data)})
            .catch((err) => console.error("Erreur lors de la récupération des Articles (Alert)", err));
    }, [id]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/article/promotions`)
            .then((result) => setPromo(result.data))
            .catch((err) => console.error("Erreur lors de la récupération des articles en promotion - (CardArticle)", err));
    }, []);

    function getPromotion(articleID) {
        const promotion = promo.find(p => p.article_id === articleID);

        if (!promotion) {
            return false;
        }

        return (
            <div className="alert alert-promo">
                <LuBadgePercent />
                <p className={'alert-p'}>Promotion en cours !</p>
            </div>
        )
    }
    function getLimitedStock() {

        if(!article) return null;

        if(article.article_stock === 0) {
            return (
                <div className="alert alert-danger">
                    <AiOutlineStop />
                    <p className={"alert-p"}>Rupture de stock !</p>
                </div>
            )
        } else if(article.article_stock > 0 && article.article_stock <= 5) {
            return (
                <div className="alert alert-warning">
                    <IoIosWarning />
                    <p className={"alert-p"}>Stock limité !</p>
                </div>
            )
        } else return null;
    }

    if(!article) return(
        <></>
    )

    return (
        <div>
            {getLimitedStock()}
            {getPromotion(article.article_id)}
        </div>
    );
}

export default Alert;
