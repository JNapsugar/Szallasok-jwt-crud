import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SzallasDel = () => {
    const { szallasId } = useParams();
    const [szallas, setSzallas] = useState({});
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const adatLekeres = async () => {
            const storedToken = localStorage.getItem('jwt');
            if (storedToken) {
                setToken(storedToken);
            }

            if (storedToken) {
                try {
                    const response = await axios.get(`https://szallasjwt.sulla.hu/data/${szallasId}`, {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    });
                    setSzallas(response.data);
                } catch (error) {
                    console.log("Nem sikerült az adat lekérés:", error);
                }
            }
        };

        adatLekeres();
    }, [szallasId]);

    const handleDelete = () => {
        axios.delete(`https://szallasjwt.sulla.hu/data/${szallasId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            navigate("/Szallasok");
        })
        .catch((error) => {
            console.log('Hiba a szállás törlésekor:', error);
        });
    };

    return (
        <div style={{ backgroundColor: "rgb(236, 213, 194)", minHeight: "100vh", padding: "3rem" }}>
            <div className="row row-cols-1 justify-content-center align-items-center">
                <div className="col">
                    <div className="card h-250 p-4" style={{ backgroundColor: "rgb(250, 244, 238)", width: "50%", margin:"auto"}}>
                        <h2 className="text-center text-decoration-underline">Törlendő szállás neve: {szallas.name}</h2><br />
                        <p className="text-danger text-center">Host neve: {szallas.hostname}</p>
                        <p className="text-danger text-center">Helyszín: {szallas.location}</p>
                        <p className="text-danger text-center">Ár: {szallas.price}</p>
                        <p className="text-danger text-center">Minimum éjszakák: {szallas.minimum_nights}</p><br />
                        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                            <Link to="/SzallasList" className='btn btn-primary'>
                                <i className="bi bi-backspace-fill fs-3"></i>&nbsp;Mégsem
                            </Link>&nbsp;&nbsp;
                            <button onClick={handleDelete} className='btn btn-danger'>
                                <i className="bi bi-trash2 fs-3"></i>&nbsp;Törlés
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
