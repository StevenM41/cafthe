import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import CardArticle from "../components/CardArticle";

function Shop() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const articleName = searchParams.get('search');

    const [id, setID] = useState(0);
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                let url;
                if (id === 0) {
                    url = articleName
                        ? `${process.env.REACT_APP_API_URL}/api/search/${articleName}`
                        : `${process.env.REACT_APP_API_URL}/api/article`;
                } else {
                    url = `${process.env.REACT_APP_API_URL}/api/article/categorie/${id}`;
                }

                const response = await axios.get(url);
                if (response.data.length === 0) {
                    setNoResults(true);
                } else {
                    setArticle(response.data);
                    setNoResults(false);
                }
            } catch (err) {
                console.error("Erreur du chargement des articles.", err);
            } finally {
                setLoading(false);
            }
        };

        void fetchArticles();
    }, [articleName, id]);

    if(loading) {
        return (
            <>
            </>
        )
    }

    if(noResults) {
        return (<p>Aucun article trouvé</p>)
    }

    return (
        <div>
            <div className={"nav-links"}>
                <a href={"#cafe"} onClick={() => {if(id === 1) setID(0); else setID(1)}}>Café</a>
                <a href={"#accessoires"} onClick={() => {if(id === 3) setID(0); else setID(3)}}>Accessoires</a>
                <a href={"#the"} onClick={() => {if(id === 2) setID(0); else setID(2)}}>Thé</a>
            </div>
            <div className={"filtrer"}></div>
            <div className={"product"}>
                {
                    id === 1 ? (<CardArticle p={article} />) :
                        id === 3 ? (<CardArticle p={article} />) :
                            id === 2 ? (<CardArticle p={article}/>) :
                                (<CardArticle p={article} />)
                }
            </div>
        </div>
    );
}

export default Shop;