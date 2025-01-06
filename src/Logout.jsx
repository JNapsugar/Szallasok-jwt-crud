import React from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/');
    };

    return (
        <div className="p-5" style={{ backgroundColor: "rgb(240, 239, 233)", minHeight: "100vh" }}>
            <div className="p-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgb(228, 214, 202)", borderRadius: "2rem", margin: "auto", height: "30rem", width: "30%", display: "flex", flexDirection: "column"}}>
                <h2 style={{ textAlign: "center" }}>Kijelentkezés</h2><br />
                <p style={{ textAlign: "center" }}>Biztosan ki szeretnél jelentkezni?</p>
                <button onClick={handleLogout} className='btn btn-danger' style={{ margin: "2rem auto", height: "3rem", width: "10rem", display: "block" }}>
                    Kijelentkezés
                </button>
            </div>
        </div>
    );
};
