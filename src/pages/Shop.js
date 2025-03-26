import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import CardArticle from "../components/CardArticle";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {IoMdPricetag} from "react-icons/io";
import '../styles/Shop.css'
import { useCart } from "../context/CartContext";

function Shop() {
    const { addToCart } = useCart();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const articleName = searchParams.get("search") || "";

    const [tagActive, setTagActive] = useState([]);
    const [value, setValue] = useState([10, 200]); // [Min, Max] prix
    const [tag, setTag] = useState([]); // Liste des tags sélectionnés
    const [tags, setTags] = useState([]); // Liste des tags sélectionnés
    const [article, setArticle] = useState([]);
    const [categorieID, setCategorieID] = useState(0); // Catégorie sélectionnée
    const [poidsOuBoite, setPoidsOuBoite] = useState(""); // "" signifie aucune sélection

    const [filters, setFilters] = useState({
        search: articleName,
        categorie_id: categorieID,
        tags: tagActive.map(tag => tag.tag_id),
        price_min: value[0],
        price_max: value[1]
    });

    useEffect(() => {
        // Construire un nouvel objet filtre basé sur l'état actuel
        setFilters(prevFilters => ({
            ...prevFilters, // Conserve les autres valeurs de filtre
            search: articleName,
            categorie_id: categorieID || "", // "" si aucune catégorie sélectionnée
            tags: tagActive.length > 0 ? tagActive.map(tag => tag.tag_id) : null, // null si pas de tags
            price_min: value[0],
            price_max: value[1],
            poids_ou_boite: poidsOuBoite || "" // "" si le poids/boîte n'est pas sélectionné
        }));
    }, [categorieID, articleName, tagActive, value, poidsOuBoite]);


    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                const isFilterActive =
                    filters.categorie_id ||
                    filters.search ||
                    (filters.tags && filters.tags.length > 0) ||
                    filters.price_min > 10 ||
                    filters.price_max < 200 ||
                    filters.poids_ou_boite;

                // Décide de l'URL selon l'état des filtres
                const url = isFilterActive
                    ? `${process.env.REACT_APP_API_URL}/api/filtre`
                    : `${process.env.REACT_APP_API_URL}/api/article`;

                // Effectue la requête avec les filtres
                const result = await axios.get(url, {
                    params: {
                        ...filters,
                    },
                    paramsSerializer: params => {
                        const searchParams = new URLSearchParams();
                        Object.keys(params).forEach(key => {
                            if (Array.isArray(params[key])) {
                                params[key].forEach(value => {
                                    searchParams.append(key, value);
                                });
                            } else if (params[key]) {
                                searchParams.append(key, params[key]);
                            }
                        });
                        return searchParams.toString();
                    }
                });

                // Mise à jour des articles
                setArticle(result.data);

                // Récupère les tags si disponible dans l'API
                const tagsResult = await axios.get(`${process.env.REACT_APP_API_URL}/api/tags`);
                setTags(tagsResult.data);

            } catch (err) {
                console.error("Erreur - Impossible de récupérer les données | Shop.js ", err);
            }
        };

        void fetchFilteredData();
    }, [filters]);

    const handleCategorieChange = (id) => {
        setCategorieID(prevID => prevID === id ? 0 : id); // Réinitialise si la même catégorie est cliquée
    };


    const handleSliderChange = (newValue) => {
        setValue(newValue);
    };

    function getCategorie(id) {
        if(id === 1) return "Café"
        if(id === 2) return "Thé"
        if(id === 3) return "Accéssoires"
        return "Toute";
    }

    const addTagsFiltrer = (t) => {
        setTagActive((currentTags) => {
            const newTags = currentTags.some((tag) => tag.tag_id === t.tag_id)
                ? currentTags.filter((tag) => tag.tag_id !== t.tag_id)
                : [...currentTags, t];

            setTag(tags.filter((tag) => !newTags.some((ts) => ts.tag_id === tag.tag_id)));
            return newTags;
        });
    };

    const removeFiltrer = (t) => {
        setTagActive((currentTags) => {
            const newTags = currentTags.filter((tag) => tag.tag_id !== t.tag_id);
            setTag(tags.filter((tag) => !newTags.some((ts) => ts.tag_id === tag.tag_id)));
            return newTags;
        });
    };

    return (
        <section className={"shop"}>
            <div className={"nav-links"}>
                <button onClick={() => handleCategorieChange(1)}>Café</button>
                <button onClick={() => handleCategorieChange(3)}>Accéssoires</button>
                <button onClick={() => handleCategorieChange(2)}>Thé</button>
            </div>

            <div className={"filter"}>
                <div className="tags-container">
                    <div className="details">
                        <p className="categorie">Catégorie: {getCategorie(categorieID)}</p>
                        <p className="title-prix">Prix: Entre {value[0]}€ et {value[1]}€</p>

                        {tagActive.length > 0 && (
                            <ul>
                                {tagActive.map((t) => (
                                    <li className="item active" key={`${t.tag_id}`} onClick={() => removeFiltrer(t)}>
                                        <IoMdPricetag />
                                        <p>{t.tag_name}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <ul>
                        {(tagActive.length > 0 ? tag : tags).map((t) => (
                            <li className="item" key={`${t.tag_id}`} onClick={() => addTagsFiltrer(t)}>
                                <IoMdPricetag />
                                <p>{t.tag_name}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ width: 300 }}>
                    <Slider
                        range
                        min={10}
                        max={200}
                        value={value}
                        onChange={handleSliderChange}
                    />
                    <div>
                        <p>Plage de prix : {value[0]}€ - {value[1]}€</p>
                    </div>
                </div>
                <div className="poids-ou-boite-container">
                    <p>Sélectionnez le poids ou en boîte :</p>
                    <select
                        value={poidsOuBoite}
                        onChange={(e) => setPoidsOuBoite(e.target.value)}
                        className="poids-ou-boite-select"
                    >
                        <option value="">Tous</option>
                        <option value="100g">100g</option>
                        <option value="250g">250g</option>
                        <option value="500g">500g</option>
                        <option value="1kg">1kg</option>
                        <option value="boite">En boîte</option>
                    </select>
                </div>

            </div>
            <div className={"product"}>
                {
                    categorieID === 1 ? (<CardArticle p={article}/>) :
                    categorieID === 3 ? (<CardArticle p={article}/>) :
                    categorieID === 2 ? (<CardArticle p={article}/>) :
                    (<CardArticle p={article}/>)
                }
            </div>
        </section>
    );
}

export default Shop;