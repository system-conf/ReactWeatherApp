import React, { useState, useEffect } from "react";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        "https://api.collectapi.com/weather/getWeather?data.lang=tr&data.city=Kocaeli",
        {
          headers: {
            Authorization: "apikey",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data.result); // API'den gelen "result" dizisini ayarlayın
      } else {
        console.error("Hava durumu verisi alınamadı.");
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  };

  return (
    <>
      <div className="weather-cards-blur"></div>
      <div className="weather-container">
        <div className="weather-title">
          <h1>HAVA DURUMU</h1>
        </div>
        {weatherData ? (
          <div className="weather-cards-col">
            {weatherData.map((dailyData, index) => (
              <div key={index} className="weather-card">
                <h2>{dailyData.day}</h2>
                <p>Tarih: {dailyData.date}</p>
                <img src={dailyData.icon} alt={dailyData.description} />
                <p>Açıklama: {dailyData.description}</p>
                <p>Durum: {dailyData.status}</p>
                <p>Sıcaklık: {dailyData.degree}</p>
                <p>Min: {dailyData.min}</p>
                <p>Max: {dailyData.max}</p>
                <p>Gece Sıcaklığı: {dailyData.night}</p>
                <p>Nem: {dailyData.humidity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Hava durumu verisi yükleniyor...</p>
        )}
      </div>
    </>

  );
}

export default WeatherApp;
