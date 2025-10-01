import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({updateInfo}){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "18e08f84f53c81f20bb84655e7fda93a";

    let getWeatherInfo = async () => {
    try {
        let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        let jsonResponse = await response.json();

        if (jsonResponse.cod !== 200) {
            throw new Error("City not found");
        }

        let result = {
            city: city,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelslike: jsonResponse.main.feels_like, // fix key here too
            weather: jsonResponse.weather[0].description,
        };

        return result;
    } catch (err) {
        throw err;
    }
};



    let handleChange = (event) => {
        setCity(event.target.value)
    }

    let handleSubmit = async (event) => {
        try{
            event.preventDefault();
            console.log(city);
            setCity("");
            let NewInfo =  await getWeatherInfo();
            updateInfo(NewInfo);
        }catch(err){
            setError(true);
        }
    }

    return(
        <div className="SearchBox">
            <form onSubmit={handleSubmit}>
                <TextField 
                    id="outlined-basic" 
                    required label="city name" 
                    variant="outlined" 
                    value={city} 
                    onChange={handleChange}
                />
                <br /><br /><br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
                {error && <p style={{color: "red"}} >No such place exists!</p> }
            </form>
        </div>
    )

}
