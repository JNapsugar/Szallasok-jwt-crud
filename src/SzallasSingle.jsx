import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const SzallasSingle = () => {

    const { szallasId } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=> {
        const fetchData = async() => {
            try{
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error ("Nem található JWt token.")
                }
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${szallasId}`,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setData(response.data)
            }
            catch(error){
                setError("Adarok lekérése sikertelen. Lehet, hogy nem vagy bejelentkezve")
                console.error("Hiba az adatok lekérése során: ",error)
            }
        }
        fetchData();
    },[szallasId])

    return (
        <div style={{backgroundColor:"rgb(236, 213, 194)", minHeight:"100vh", padding:"3rem"}}>
            <div className="row row-cols-2 justify-content-center align-items-center">
                    <div className="col">
                        <div className="card h-250 p-4"  style={{backgroundColor:"rgb(250, 244, 238)"}}>
                        <h2 className="text-center text-decoration-underline" >Szállás neve: {data.name}</h2><br />
                            <p className="text-success text-center">Host neve: {data.hostname}</p>
                            <p className="text-success text-center">Helyszín: {data.location}</p>
                            <p className="text-success text-center">Ár: {data.price}</p>
                            <p className="text-success text-center">Minimum éjszakák: {data.minimum_nights}</p><br />
                            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                                <Link to="/SzallasList" className='btn btn-primary'><i className="bi bi-backspace-fill fs-3"></i></Link>&nbsp;&nbsp;
                                <Link to={"/Mod-szallas/" + data.id} className='btn btn-warning'><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;
                                <Link to={"/Del-szallas/" + data.id} className='btn btn-danger'><i className="bi bi-trash2 fs-3"></i></Link>
                            </div>
                        </div>

                    </div>
            </div>
        </div>
    );
}