import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import CardArticle from "../components/CardArticle";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

function Shop() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const articleName = searchParams.get('search');
    const [value, setValue] = useState([10, 100]);

    const [id, setID] = useState(0);
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noResults, setNoResults] = useState(false);

    const [tag, setTag] = useState([]);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fletchFiltrer = async () => {
            await axios.get(`${process.env.REACT_APP_API_URL}/api/article`)
                .then((result) => setArticle(result.data))
                .catch((err) => console.error('Erreur - Impossible de récuperer les Articles. | Shop.js ', err));

            await axios.get(`${process.env.REACT_APP_API_URL}/api/tags`)
                .then((result) => setTags(result.data))
                .catch((err) => console.error('Erreur - Impossible de récuperer les Tags. | Shop.js ', err));
        }
        void fletchFiltrer();
    }, [id]);

    if(loading) {
        return (
            <>
            </>
        )
    }

    if(noResults) {
        return (<p>Aucun article trouvé</p>)
    }

    function addTagsFiltrer(id) {
        setTag(currentTags => {
            if (currentTags.includes(id)) {
                return currentTags.filter(tagId => tagId !== id);
            } else {
                return [...currentTags, id];
            }
        });
    }

    const handleSliderChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div className={"nav-links"}>
                <button onClick={() => {if(id === 1) setID(0); else setID(1)}}>Café</button>
                <button onClick={() => {if(id === 3) setID(0); else setID(3)}}>Accessoires</button>
                <button onClick={() => {if(id === 2) setID(0); else setID(2)}}>Thé</button>
            </div>
            <div className={"filter"}>
                <div className={"tags-container"}>
                    {tags.map((t) => (
                        <div key={t.tag_id} onClick={() => addTagsFiltrer(t.tag_id)}>
                            <p>{t.tag_name}</p>
                        </div>
                    ))}
                </div>
                <div style={{ width: 300 }}>
                    <Slider
                        range
                        min={10}
                        max={300}
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
                    id === 1 ? (<CardArticle p={article}/>) :
                        id === 3 ? (<CardArticle p={article}/>) :
                            id === 2 ? (<CardArticle p={article}/>) :
                                (<CardArticle p={article}/>)
                }
            </div>
        </div>
    );
}

export default Shop;