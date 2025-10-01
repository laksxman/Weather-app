import SearchBox from './SearchBox'
import InfoBox from './InfoBox'
import { useState } from 'react'

export default function weatherApp(){
    const [weatherInfo, setweatherInfo] = useState({
        city:"Delhi",
        feelslike: 24.03,
        temp: 25.23,
        tempMin: 25.23,
        tempMax: 25.23,
        humidity: 34,
        weather: "haze",
    });


    let updateInfo = (NewInfo) => {
        setweatherInfo(NewInfo);
    }

    return (
        <div style={{textAlign: "center"}}>
            <h2>Weather App</h2>
            <SearchBox updateInfo={updateInfo} />
            <InfoBox info={weatherInfo} />
        </div>
    )
}