import React, {useEffect, useState} from 'react';
import axios from "axios";
import Accessoirs from "./Accessoirs";
import Cafe from "./Cafe";
import The from "./The";

function Produits(props) {
    const [id, setID] = useState( 0);
    const [article, setArticle] = useState([]);

    useEffect(() => {
        if(id === 0) {
            axios.get(`http://localhost:3001/api/article`)
                .then((r) => setArticle(r.data))
                .catch((err) => console.error("Erreur du chargement des articles.", err))
        } else {
            axios.get(`http://localhost:3001/api/article/categorie/${id}`)
                .then((r) => setArticle(r.data))
                .catch((err) => console.error("Erreur du chargement des article by categorie ID.", err))
        }
    }, [id]);

    return (
        <div>
            <div className={"nav-links"}>
                <a href={"#café"} onClick={() => { setID(1)}}>Café</a>
                <a href={"#accesoires"} onClick={() => { setID(2)}}>Accessoires</a>
                <a href={"#thé"} onClick={() => { setID(3)}}>Thé</a>
            </div>
            <div className={"filtrer"}></div>
            <div className={"product"}>
                {id === 1 ? (<Cafe p={article} />) : id === 2 ? (<Accessoirs p={article} />) : id === 3 ? (<The p={article}/>) : (
                    <>
                        {article.map((a) => (
                            <article key={a.article_id}>
                                <h2>{a.article_name}</h2>

                            </article>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Produits;