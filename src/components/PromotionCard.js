import React, {useEffect, useState} from 'react';
import axios from "axios";
import Carousel from "./utils/Carousel";

function PromotionCard() {
    const [promo, setPromo] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/article/promotions")
            .then((r) => setPromo(r.data))
            .catch((err) => console.log(err))
    }, []);

    console.log(promo)

    function ArticleImage() {
        promo.map((p) => {
            return p.article_img;
        })
    }

    console.log(ArticleImage)

    return (
        <Carousel images={ArticleImage} />
    );
}

export default PromotionCard;