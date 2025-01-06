import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SzallasMod = () => {
    const [szallas, setSzallas] = useState({
        name: '',
        hostname: '',
        location: '',
        price: 0,
        minimum_nights: 0
    });
    
    const [token, setToken] = useState('');
    const params = useParams();
    const id = params.szallasId;
    const navigate = useNavigate();

    useEffect(() => {
        const adatLekeres = async () => {
            try {
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSzallas(response.data);
            } catch (error) {
                console.log("Nem sikerült az adat lekérése:", error);
            }
        };

        const storedToken = localStorage.getItem('jwt');
        if (storedToken) {
            setToken(storedToken);
        }

        if (token) {
            adatLekeres();
        }
    }, [id, token]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSzallas(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`https://szallasjwt.sulla.hu/data/${id}`, szallas, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            navigate("/SzallasList");
        })
        .catch((error) => {
            console.log('Hiba a szállás adatainak módosításakor:', error);
        });
    };

    return (
        <div className="p-5" style={{ backgroundColor: "rgb(250, 244, 238)", minHeight: "100vh" }}>
            <div className="p-5 content text-center" style={{
                backgroundColor: "rgb(228, 214, 202)", 
                borderRadius: "2rem", 
                margin: "auto", 
                width: "70%", 
                minHeight: "40rem"
            }}>
                <h2>Szállás módosítása</h2><br />
                <form onSubmit={handleSubmit}>
                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Szállás neve:</label>
                        <div className="col-sm-9">
                            <input 
                                type="text" 
                                name="name" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.name} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Host neve:</label>
                        <div className="col-sm-9">
                            <input 
                                type="text" 
                                name="hostname" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.hostname} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Helyszín:</label>
                        <div className="col-sm-9">
                            <input 
                                type="number" 
                                name="location" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.location} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Ár:</label>
                        <div className="col-sm-9">
                            <input 
                                type="number" 
                                name="price" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.price} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <div className="form-group row pb-5">
                        <label className="col-sm-3 col-form-label">Minimum éjszakák:</label>
                        <div className="col-sm-9">
                            <input 
                                type="number" 
                                name="minimum_nights" 
                                className="form-control" 
                                style={{ borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)" }}
                                value={szallas.minimum_nights} 
                                onChange={handleInputChange} 
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-success">Küldés</button>
                </form>
            </div>
        </div>
    );
};
