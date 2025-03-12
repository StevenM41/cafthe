import React, {useEffect, useState} from 'react';
import axios from "axios";

function Tags({ id }) {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/article/tags/${id}`)
            .then((tag) => {setTags(tag.data)})
            .catch((err) => console.error("Erreur des chargement des tags.", err));
    }, [id]);

    if(!tags) return (<></>);

    return (
        <div>
            {tags?.map((tag) => (
                <div key={tag.tag_id}>
                    <p>{tag.tag_name}</p>
                </div>
            ))}
        </div>
    );
}

export default Tags;