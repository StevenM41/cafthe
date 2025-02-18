import React from 'react';
import Cafe from "../../components/productions/Cafe";
import The from "../../components/productions/The";
import Accessoirs from "../../components/productions/Accessoirs";
import PromotionCard from "../../components/PromotionCard";

function Shop() {

    return (
        <>
            <PromotionCard />


            <div></div>

            <Cafe />
            <The />
            <Accessoirs />
        </>
    );
}

export default Shop;