import React, {useEffect, useState} from 'react';
import {useLocation}  from "react-router-dom";
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
    const [value, setValue] = useState([0, 200]);
    const [tag, setTag] = useState([]);
    const [tags, setTags] = useState([]);
    const [article, setArticle] = useState([]);
    const [categorieID, setCategorieID] = useState(0);
    const [filters, setFilters] = useState({search: articleName, categorie_id: categorieID, price_min: value[0], price_max: value[1]});

    useEffect(() => {
        setFilters({search: articleName, categorie_id: categorieID || "", price_min: value[0], price_max: value[1],});
    }, [categorieID, articleName, tagActive, value]);

    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                const isFilterActive = filters.categorie_id || filters.search || filters.price_min > 0 || filters.price_max < 200

                const url = isFilterActive ? `${process.env.REACT_APP_API_URL}/api/filtre` : `${process.env.REACT_APP_API_URL}/api/article`;

                const result = await axios.get(url, {
                    params: filters,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                setArticle(result.data);

                const tagsResult = await axios.get(`${process.env.REACT_APP_API_URL}/api/tags`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                });
                setTags(tagsResult.data);

            } catch (err) {
                console.error("Erreur - Impossible de récupérer les données | Shop.js ", err);
            }
        };

        void fetchFilteredData();
    }, [filters]);

    const handleCategorieChange = (id) => {
        setCategorieID(prevID => prevID === id ? 0 : id);
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
                </div>
                <div style={{ width: 300 }}>
                    <Slider
                        range
                        min={0}
                        max={200}
                        value={value}
                        onChange={handleSliderChange}
                    />
                    <div>
                        <p>Plage de prix : {value[0]}€ - {value[1]}€</p>
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