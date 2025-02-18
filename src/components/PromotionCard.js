import React, {useEffect, useState} from 'react';
import {Carousel} from "react-responsive-carousel";
import axios from "axios";

function PromotionCard(props) {
    const [promo, setPromo] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3001/api/article/promotions")
            .then((r) => setPromo(r.data))
            .catch((err) => console.log(err))

    }, []);

    console.log(promo)

    return (
        <Carousel autoPlay infiniteLoop interval={10000} showIndicators={false} showStatus={false}>
            <div></div>
        </Carousel>
    );
}

export default PromotionCard;