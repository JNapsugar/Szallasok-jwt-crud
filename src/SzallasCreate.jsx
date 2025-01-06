import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const SzallasCreate = () => {
    const navigate = useNavigate();
    return (
        <div className="p-5" style={{ backgroundColor: "rgb(250, 244, 238)", minHeight: "100vh"}}>
        <div className="p-5 content text-center" style={{ backgroundColor: "rgb(228, 214, 202)", borderRadius: "2rem", margin: "auto", width: "70%", minHeight: "40rem"}}>
            <h2>Új szállás</h2><br />
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(event.target);
                        const data = {
                            name: formData.get('name'),
                            hostname: formData.get('hostname'),
                            location: formData.get('location'),
                            price: formData.get('price'),
                            minimum_nights: formData.get('minimum_nights'),
                        };
                        const token = localStorage.getItem('jwt');
                        if (!token) {
                            console.error("Nem található érvényes token!");
                            return;
                        }
                
                        axios.post("https://szallasjwt.sulla.hu/data", data, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}` 
                            }
                        })
                        .then(() => navigate("/SzallasList"))
                        .catch((error) => console.error("Hiba történt:", error));
                    
                }}
            >
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Szállás neve:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            style={{borderRadius: "0.8rem",
                            backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Host neve:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="hostname"
                            className="form-control"
                            style={{borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Helyszín:</label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            name="location"
                            className="form-control"
                            style={{borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Ár:</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            style={{borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <div className="form-group row pb-5">
                    <label className="col-sm-3 col-form-label">Minimum éjszakák:</label>
                    <div className="col-sm-9">
                        <input
                            type="number"
                            name="minimum_nights"
                            className="form-control"
                            style={{borderRadius: "0.8rem", backgroundColor: "rgb(200, 255, 255, 0.5)"}}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
        </div>
    );
}