import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const SzallasList = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=> {
        const fetchData = async() => {
            try{
                const token = localStorage.getItem('jwt');
                if (!token) {
                    throw new Error ("Nem található JWt token.")
                }
                const response = await axios.get("https://szallasjwt.sulla.hu/data",{
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
    },[])

    return(
        <div style={{backgroundColor:"rgb(236, 213, 194)"}}>
            {error && <p style={{color : "red"}}>{error}</p>}
            {data.length>0? (   
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop: "3rem"}}>
                    {data.map((item) => (
                        <div className="card col-sm-3 d-inline-block m-2 p-3" style={{backgroundColor:"rgb(250, 244, 238)"}}>
                            <h4 style={{ textAlign: "center", textDecoration: "underline" }}>Szállás neve: {item.name}</h4><br />
                            <p className="text-success">Host neve: {item.hostname}</p>
                            <p className="text-success">Helyszín: {item.location}</p>
                            <p className="text-success">Ár: {item.price}</p>
                            <p className="text-success">Minimum éjszakák: {item.minimum_nights}</p>
                            <div className="card-body" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                                <br />
                                    <Link to={"/Szallasok/" + item.id} className='btn btn-primary'><i className="bi bi-text-paragraph fs-3"></i></Link>&nbsp;&nbsp;
                                    <Link to={"/Mod-szallas/" + item.id} className='btn btn-warning'><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;
                                    <Link to={"/Del-szallas/" + item.id} className='btn btn-danger'><i className="bi bi-trash2 fs-3"></i></Link>    
                            </div>
                        </div>
                    ))}
                </div>
            ) : (<p>Nem találhatóak adatok!</p>)}
        </div>
    )
}