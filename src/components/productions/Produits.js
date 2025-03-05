import React, {useEffect, useState} from 'react';
import axios from "axios";

function Produits(){
    const [id, setID] = useState(0);
    const [article, setArticle] = useState([]);
    const [cafe, setCafe] = useState(false);
    const [the, setThe] = useState(false);
    const [accessoirs, setAccessoirs] = useState(false);

    console.log("Café: " + cafe + " | Thé: " + the + " | Accessoire: " + accessoirs);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                let articles = [];
                if (cafe && the && accessoirs) {
                    const response = await axios.get(`http://localhost:3001/api/article`);
                    articles = response.data;
                } else {
                    const categories = [];
                    if (cafe) categories.push(1);
                    if (the) categories.push(3);
                    if (accessoirs) categories.push(2);

                    const requests = categories.map(category =>
                        axios.get(`http://localhost:3001/api/article/categorie/${category}`)
                    );

                    const responses = await Promise.all(requests);
                    articles = responses.flatMap(response => response.data);
                }
                setArticle(articles);
            } catch (err) {
                console.error("Erreur du chargement des articles.", err);
            }
        };

        void fetchArticles();
    }, [accessoirs, cafe, id, the]);

    console.log(article)
    console.log(id)

    return (
        <div>
            <div className={"nav-links"}>
                <a href={"#café"} onClick={() => { setID(1); if (cafe) setCafe(false); else setCafe(true); }}>Café</a>
                <a href={"#accesoires"} onClick={() => { setID(2); if(accessoirs) setAccessoirs(false); else setAccessoirs(true); }}>Accessoires</a>
                <a href={"#the"} onClick={() => { setID(3); if(the) setThe(false); else setThe(true); }}>Thé</a>
            </div>
            <div className={"filtrer"}></div>
            <div className={"product"}>
                <p>Café: {cafe}</p>
                <p>Thé: {the}</p>
                <p>Accessoirs: {accessoirs}</p>
                {article.map((a) => (
                    <article key={a.article_id}>
                        <h2>{a.article_name}</h2>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Produits;