import React, {useEffect, useState} from "react";
import axios from "axios";
import '../styles/detailsProduits.css';

export const DetailProduits = ({ detailProduits, setShowModal }) => {
  const [poids, setPoids] = useState([]);
  const [boite, setBoite] = useState([]);

  console.log(detailProduits);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/article/poids/${detailProduits.article_id}`)
        .then((response) => {
          setPoids(response.data);
        })
        .catch((err) => console.error(err));

    axios.get(`${process.env.REACT_APP_API_URL}/api/article/boite/${detailProduits.article_id}`)
        .then((response) => {
          setBoite(response.data);
        })
        .catch((err) => console.error(err));
  }, [detailProduits.article_id]);

  return (
      <div>
          <div className="popup-overlay" onClick={() => {setShowModal(false)}}></div>
          <div className="details-produits-container">
              <div key={detailProduits.article_id} className="details-produits">
                  <h3>{detailProduits.article_name}</h3>
                  <img src={`/${detailProduits.article_img}`} alt={""}/>
                  <p>Prix : {detailProduits.article_prix} €</p>
                  <p>Description : {detailProduits.article_desc}</p>


                  {poids.length > 0 && (
                      <div className="poids-section">
                        <h4>Poids disponibles:</h4>
                        <ul>
                          {poids.map((p, index) => (
                              <li key={index}>{p} kg</li>
                          ))}
                        </ul>
                      </div>
                  )}

                  {boite.length > 0 && (
                      <div className="boite-section">
                        <h4>Boîtes disponibles:</h4>
                        <ul>
                          {boite.map((b, index) => (
                              <li key={index}>{b}</li>
                          ))}
                        </ul>
                      </div>
                  )}

                <div className="action-buttons">
                  <button onClick={() => {}} disabled={detailProduits.article_stock === 0}>Confirmer</button>
                  <button onClick={() => {}}>Annuler</button>
                </div>
              </div>


          </div>
      </div>
    );
};
