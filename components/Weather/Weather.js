class WeatherComponent extends HTMLElement {
    constructor() {
        super();

        const wrapper = document.createElement('div');
        this.appendChild(wrapper);

        const weatherTemplate = `
            <div class="section_content-top-details-banner_weather">
                <div class="section_content-top-details-banner_weather-icon">
                    <img src="../../../assets/Overview/Charging_Station/Sunlight.png" alt="" id="weatherIcon">
                </div>
                <div class="section_content-top-details-banner_weather-temperature">
                    <p>Temperature</p>
                    <br>
                    <p id="temperature">00 °C</p>
                </div>
                <div class="section_content-top-details-banner_weather-humidity">
                    <p>Humidity</p>
                    <br>
                    <p id="humidity">00 %</p>
                </div>
                <div class="section_content-top-details-banner_weather-wind">
                    <p>Wind</p> 
                    <br>
                    <p id="wind">00 Km/h</p>
                </div>
            </div>
            <style>
                .section_content-top-details-banner_weather {
                    cursor: default;
                    display: flex;
                    column-gap: 2rem;
                    align-items: center;
                }

                .section_content-top-details-banner_weather-icon {
                    display: flex;
                    align-items: center; 
                    margin-right: 5rem;
                }

                .section_content-top-details-banner_weather-icon img {
                    width: 80px;
                    height: 80px;
                    border-radius: 0px;
                }

                .section_content-top-details-banner_weather-temperature,
                .section_content-top-details-banner_weather-humidity,
                .section_content-top-details-banner_weather-wind {
                    text-align: center;
                    font-size: var(--h2-font-size);
                    display: flex;
                    flex-direction: column;
                    align-items: center; 
                    color: var(--text-white);
                }

                .section_content-top-details-banner_weather-temperature p:nth-child(3),
                .section_content-top-details-banner_weather-humidity p:nth-child(3),
                .section_content-top-details-banner_weather-wind p:nth-child(3) {
                    font-size: 16px;
                    font-weight: 800;
                    color: var(--text-orange);
                    text-shadow: 0 0 5px var(--bg-main-color-orange);
                }
            </style>
        `;

        wrapper.innerHTML = weatherTemplate;

        this.elements = {
            temperature: wrapper.querySelector("#temperature"),
            humidity: wrapper.querySelector("#humidity"),
            wind: wrapper.querySelector("#wind"),
            icon: wrapper.querySelector("#weatherIcon")
        };
    }

    connectedCallback() {
        const selectedStation = localStorage.getItem("selectedStation") || 'bang_khen';
        this.fetchWeatherData(selectedStation);
    }

    fetchWeatherData(station) {
        const stationUrl = station.toLowerCase().replace(/\s+/g, '_');
        fetch(`http://localhost:3000/get-weather_${stationUrl}`)
            .then(response => response.json())
            .then(data => {
                let temperature, humidity, wind, iconSrc;

                if (data.length === 0 || !data[0]) {
                    temperature = 0;
                    humidity = 0;
                    wind = 0;
                    iconSrc = "/assets/Overview/Charging_Station/Sunlight.png";
                } else {
                    const weather = data[0];
                    temperature = weather.temperature || 0;
                    humidity = weather.humidity || 0;
                    wind = weather.wind || 0;

                    if (wind > 20 || humidity > 70) {
                        iconSrc = "/assets/Overview/Charging_Station/Storm.png";
                    } else if (temperature > 30 && humidity < 50) {
                        iconSrc = "/assets/Overview/Charging_Station/Sunlight.png";
                    } else {
                        iconSrc = "/assets/Overview/Charging_Station/Rain.png";
                    }
                }

                this.elements.temperature.textContent = `${temperature.toString().padStart(2, '0')} °C`;
                this.elements.humidity.textContent = `${humidity.toString().padStart(2, '0')} %`;
                this.elements.wind.textContent = `${wind.toString().padStart(2, '0')} Km/h`;
                this.elements.icon.src = iconSrc;
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                this.elements.temperature.textContent = `00 °C`;
                this.elements.humidity.textContent = `00 %`;
                this.elements.wind.textContent = `00 Km/h`;
                this.elements.icon.src = "/assets/Overview/Charging_Station/Sunlight.png";
            });
    }
}

customElements.define('weather-component', WeatherComponent);

// ทำให้ฟังก์ชัน fetchWeatherData เป็น global
window.Weather = (station) => {
    const weatherComponent = document.querySelector('weather-component');
    if (weatherComponent) {
        weatherComponent.fetchWeatherData(station);
    }
};
