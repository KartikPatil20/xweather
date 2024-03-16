import React , {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

/*function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const[isLoading, setIsloading] = useState(false); 


  const fetchData = async(city) => {
    isLoading(true)
    if(city){
      try{
        const res = await fetch("https://api.weatherapi.com/v1/current.json", {
        params : {
          key : "6991b64e7d3c422f985173040232610",
          q: city
        }
      })
      const Data = await res.json()
      setData(Data)
      setIsloading(false)
      }catch(e){
      window.alert("Failed to fetch weather data");
      setIsloading(false)
      }
    }
  }
 

  return (
    <div className="App">
      <div className='city_find'>
        <input type='text' placeholder='Enter city name' value={city} onChange={(e) => setCity(e.target.value)}/>
        <button onClick={()=>{
          fetchData(city)
        }}>Search</button>
      </div>
      {
        isLoading && <p>Loading data...</p>
      }

      {
        data &&  (
          <div className='data_card'>
        <div className='city_data'>
          <span>Temperature</span>
          <p>{data.current.temp_c}°C</p>
        </div>
        <div className='city_data'>
          <span>Humidity</span>
          <p>{data.current.humidity}%</p>
        </div>
        <div className='city_data'>
          <span>Condition</span>
          <p>{data.current.condition.text}</p>
        </div>
        <div className='city_data'>
          <span>wind</span>
          <p>{data.current.wind_kph} kph</p>
        </div>
        </div>
        )
      }
    </div>
  );
}*/

const SearchBar = ({onSearch}) => {
  const [city, setCity] = useState("");
  const handleSearch = () => {
    onSearch(city);
  };

  return (<div className='search-bar'>
    <input type='text' value={city} onChange={e => setCity(e.target.value)} placeholder='Enter city name...' />
    <button onClick={handleSearch}>Search</button>
  </div>)
}



const WeatherDisplay = ({city}) => {
  const [weatherData, setWeatherdata] = useState(null);
  const [Loading, setLoading] = useState(false);

  useEffect(()=>{
    if(city){
      setLoading(true);
      axios.get("https://api.weatherapi.com/v1/current.json",{
        params: {
          key: "6991b64e7d3c422f985173040232610",
          q: city,
        },
      }).then(res => {
        setWeatherdata(res.data);
        setLoading(false);
      }).catch(e => {console.error("error"); alert("Failed to fetch weather data");})

    }
  },[city]);

  return (
    <div className='weather-display'>
      {Loading && <p>Loading data...</p>}
      {!Loading && weatherData && <div className='data_card'>
        <div className='city_data'>
          <span>Temperature</span>
          <p>{weatherData.current.temp_c}°C</p>
        </div>
        <div className='city_data'>
          <span>Humidity</span>
          <p>{weatherData.current.humidity}%</p>
        </div>
        <div className='city_data'>
          <span>Condition</span>
          <p>{weatherData.current.condition.text}</p>
        </div>
        <div className='city_data'>
          <span>wind</span>
          <p>{weatherData.current.wind_kph} kph</p>
        </div>
        </div>}
    </div>

  )

}

function App(){
  const [city, setCity] = useState("");
  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return <div className='App'>
    <SearchBar onSearch={handleSearch} />
    <WeatherDisplay city={city} />
  </div>
}

export default App;