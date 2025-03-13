import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import CardArticle from "../components/CardArticle";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

function Shop() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const articleName = searchParams.get("search") || "";

    const [value, setValue] = useState([10, 200]); // [Min, Max] prix
    const [tag, setTag] = useState([]); // Liste des tags sélectionnés
    const [tags, setTags] = useState([]); // Liste des tags sélectionnés
    const [article, setArticle] = useState([]);
    const [categorieID, setCategorieID] = useState(0); // Catégorie sélectionnée

    const [filters, setFilters] = useState({
        categorie_id: categorieID,
        search: articleName,
        tags: tag,
        price_min: value[0], // Min price
        price_max: value[1] // Max price
    });

    useEffect(() => {
        setFilters({
            categorie_id: categorieID,
            search: articleName,
            tags: tag,
            price_min: value[0],
            price_max: value[1]
        });
    }, [categorieID, articleName, tag, value]);

    const addTagsFiltrer = (id) => {
        setTag((currentTags) => {
            if (currentTags.includes(id)) {
                return currentTags.filter((tagId) => tagId !== id);
            } else {
                return [...currentTags, id]; // Ajouter le tag
            }
        });
    };

    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                let isFilterActive = filters.categorie_id !== 0 || filters.search !== "" || filters.price_min !== 10 || filters.price_max !== 200;
                if(filters.categorie_id === 0) filters.categorie_id = null;

                if(filters.price_min > 10 || filters.price_max < 200) {
                    isFilterActive = true;
                }

                const url = isFilterActive
                    ? `${process.env.REACT_APP_API_URL}/api/filtre`
                    : `${process.env.REACT_APP_API_URL}/api/article`;

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

    console.log(filters);

    return (
        <div>
            <div className={"nav-links"}>
                <button onClick={() => {if(categorieID === 1) setCategorieID(0); else setCategorieID(1)}}>Café</button>
                <button onClick={() => {if(categorieID === 3) setCategorieID(0); else setCategorieID(3)}}>Accessoires</button>
                <button onClick={() => {if(categorieID === 2) setCategorieID(0); else setCategorieID(2)}}>Thé</button>
            </div>
            <div className={"filter"}>
                <div className={"tags-container"}>
                    {tags.map((t, index) => (
                        <div key={`${t.tag_id}-${index}`} onClick={() => addTagsFiltrer(t.tag_id)}>
                            <p>{t.tag_name}</p>
                        </div>
                    ))}
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
        </div>
    );
}

export default Shop;