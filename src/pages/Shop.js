import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import CardArticle from "../components/CardArticle";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {IoMdPricetag} from "react-icons/io";
import '../styles/Shop.css'

function Shop() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const articleName = searchParams.get("search") || "";

    const [tagActive, setTagActive] = useState([]);
    const [value, setValue] = useState([10, 200]); // [Min, Max] prix
    const [tag, setTag] = useState([]); // Liste des tags sélectionnés
    const [tags, setTags] = useState([]); // Liste des tags sélectionnés
    const [article, setArticle] = useState([]);
    const [categorieID, setCategorieID] = useState(0); // Catégorie sélectionnée

    const [filters, setFilters] = useState({
        categorie_id: categorieID,
        search: articleName,
        tags: tagActive.map((r) => r),
        price_min: value[0], // Min price
        price_max: value[1] // Max price
    });

    useEffect(() => {
        setFilters({
            categorie_id: categorieID,
            search: articleName,
            tags: tagActive.map((r) => r),
            price_min: value[0],
            price_max: value[1]
        });
    }, [categorieID, articleName, tagActive, value]);

    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                let isFilterActive = filters.categorie_id !== 0 || filters.search !== "" || filters.price_min !== 10 || filters.price_max !== 200 || tagActive.length > 0;
                if(filters.categorie_id === 0) filters.categorie_id = null;

                if(filters.price_min > 10 || filters.price_max < 200) {
                    isFilterActive = true;
                }

                const url = isFilterActive ? `${process.env.REACT_APP_API_URL}/api/filtre` : `${process.env.REACT_APP_API_URL}/api/article`;

                const result = await axios.get(url, {
                    params: filters
                });
                setArticle(result.data);

                const tagsResult = await axios.get(`${process.env.REACT_APP_API_URL}/api/tags`);
                setTags(tagsResult.data);
            } catch (err) {
                console.error("Erreur - Impossible de récupérer les données | Shop.js ", err);
            }
        };

        void fetchFilteredData();
    }, [filters]);

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

            // Mettre à jour setTag avec les tags qui ne sont pas dans tagActive
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
                <button onClick={() => {if(categorieID === 1) setCategorieID(0); else setCategorieID(1)}}>Café</button>
                <button onClick={() => {if(categorieID === 3) setCategorieID(0); else setCategorieID(3)}}>Accéssoires</button>
                <button onClick={() => {if(categorieID === 2) setCategorieID(0); else setCategorieID(2)}}>Thé</button>
            </div>
            <div className={"filter"}>
                <div className="tags-container">
                    <div className="details">
                        <p className="categorie">Catégorie: {getCategorie(categorieID)}</p>
                        <p className="title-prix">Prix: Entre {value[0]}€ et {value[1]}€</p>

                        {tagActive.length > 0 && (
                            <ul>
                                {tagActive.map((t) => (
                                    <li className="item active" key={`${t.tag_id}`} onClick={() => removeFiltrer(t.tag_id)}>
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
                        Plage de prix : {value[0]}€ - {value[1]}€
                    </div>
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