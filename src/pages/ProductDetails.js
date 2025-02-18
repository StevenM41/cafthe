import React, {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function ArticleDetails() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const { token, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (token) {
                    fetch(`http://localhost:3001/api/article/${id}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        },
                    })
                        .then(response => response.json())
                        .then(data => setArticle(data));
                }
            } catch (error) {
                console.error("Erreur au chargement de l'article", error);
            }
        };

        void fetchArticle();
    }, [id, token]);

    return (
        <>
            {
                isAuthenticated ? (
                    article ? (
                    <>
                        <div className="product-details">
                            <h2>{article.article_name}</h2>
                            <p>{article.article_desc}</p>
                            <p>
                                <strong>Prix TTC :</strong> {article.article_prix} euros
                            </p>
                            <p>
                                <strong>Stock :</strong> {article.article_stock} unités
                            </p>
                        </div>
                    </>
                ) : (<>
                        <div>
                            <p>Article introuvable.</p>
                        </div>
                    </>
                    )
            ) : (
                <div>
                    <div>Go to login</div>
                    <Link to={"/login"}>Connectez-vous</Link>
                </div>
                )
            }
        </>
    );

}

export default ArticleDetails;
