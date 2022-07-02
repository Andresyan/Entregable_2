import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState({});
  const [temp, setTemp] = useState(0);
  const [degreeScale, setDegreeScale] = useState("°C");
  const [deggreText, setDeggreText] = useState(true);
  const [cardColor, setCardColor] = useState("black");
  const [cardImg, setCardImage] = useState("white")

  const colorsDay = ["#FC9C14","#2AC288","#004E8C","#857BAE","#6CB6DB","#808080"];
  const colorsNight = ["#343878","#4D6370","#2D5A77","#4C4C73","#6CB6DB","#808080"];
  const imagesDay = [
    "https://c.wallhere.com/photos/07/31/Forza_Horizon_3_video_game_photography_video_games-2065965.jpg!d",
    "https://i.pinimg.com/736x/11/e7/ee/11e7ee4ceb17fe9545df22fd6a2e355d.jpg",
    "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFpbnxlbnwwfHwwfHw%3D&w=1000&q=80",
    "https://cdn.wallpapersafari.com/13/53/GIxc51.jpg",
    "https://i.pinimg.com/originals/eb/57/aa/eb57aabb44eec09e812e91812553cea4.jpg",
    "https://c.wallhere.com/photos/11/5c/nature_canon_dark_ombre_route_ciel_nuage_fishey-694470.jpg!d"
  ];
  const imagesNight = [
    "https://c0.wallpaperflare.com/preview/315/117/233/taiwan-taipei-city-night-street.jpg",
    "https://images.unsplash.com/photo-1603288967520-f3e04381dc02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGFyayUyMHNreXxlbnwwfHwwfHw%3D&w=1000&q=80",
    "https://cdnb.artstation.com/p/assets/images/images/034/002/489/large/shambhuraj-panhalakar-asset.jpg?1611143008",
    "https://cdn.wallpapersafari.com/13/53/GIxc51.jpg",
    "https://media.istockphoto.com/photos/winter-night-in-the-mountains-picture-id1272366582?b=1&k=20&m=1272366582&s=170667a&w=0&h=SJgVKhUUGJmgG7HSbxJg7xpXH0lVl6NtSDOhQGEo8tw=",
    "https://c4.wallpaperflare.com/wallpaper/523/275/621/night-road-forest-mist-wallpaper-preview.jpg"
  ];
  useEffect(() => {
    const success = pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8ca3629db0c6f5856cb007561599b68b`)
      .then((res) => {
        setData(res.data);
        const isCelsius = res.data.main.temp - 273.15; 
        const isTime = res.data.weather[0].icon;//"01d";
        changeBgColor(isTime);
        setTemp(isCelsius);
      });
    }
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const convertDegrees = () => {
     if(degreeScale === "°C"){
      const tempConvert = ((temp*9)/5)+32;
      setTemp(tempConvert);
      setDegreeScale("°F");
      setDeggreText(false);
     }else{
      const tempConvert = ((temp-32)*5)/9;
      setTemp(tempConvert);
      setDegreeScale("°C");
      setDeggreText(true);
     }
  }
  
  const changeBgColor = (time) =>{
    let timeInt = parseInt(time.slice(0,2), 10);
    let timeFrame =time.charAt(2);
    let color = "";
    let imgColor ="";
    let index = 0;
   
    if(timeInt>0 && timeInt<3){
      index = 0;
    }else if(timeInt>=3 && timeInt<5){
      index = 1;
    }else if(timeInt>5 && timeInt<11){
      index = 2
    }else if(timeInt ===11){
      index = 3;
    }else if(timeInt ===13){
      index = 4;
    }else{
      index = 5;
    }
    if(timeFrame === "n"){  
      color = colorsNight[index];
      imgColor = imagesNight[index];
      document.body.style = `background: linear-gradient(to bottom right, ${color}, #2F3D45);`;
      setCardColor(color);
      setCardImage(imgColor);
    }else{
      color = colorsDay[index];
      imgColor = imagesDay[index];
      document.body.style = `background: linear-gradient(to bottom right, ${color}, #ABC7C8);`;
      setCardColor(color);
      setCardImage(imgColor);
    }
    
    
  }


  
  console.log(data);


  return (
    <div className='App'>
      <div className='container' style={{backgroundImage: `url(${cardImg})`}}  >
      <h1>Weather App</h1>
      <h2>{data.name}, {data.sys?.country}</h2>
      <div className='container-img'>
      <div className='img-icon' style={{ background: cardColor }}>
      <img src={`http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`} alt=''/>
      </div>
      </div>
      <h3>{temp.toFixed(2)} {degreeScale}</h3>
      <p>{data.weather?.[0].main}</p>
      <ul>
        <li><i class="fa-solid fa-wind"></i> Wind speed: {data.wind?.speed} m/s</li>
        <li><i class="fa-solid fa-cloud"></i> Cloud: {data.clouds?.all}%</li>
        <li><i class="fa-solid fa-temperature-half"></i> Pressure: {data.main?.pressure} mb</li>
        <li><i class="fa-solid fa-droplet"></i> Humidity: {data.main?.humidity}%</li>
      </ul>
      <button onClick={convertDegrees} style={{ background: cardColor }}>Change to {deggreText ?"Fahrenheit" : "Celsius"}</button>
    </div>
    </div>
  )
}

export default App
