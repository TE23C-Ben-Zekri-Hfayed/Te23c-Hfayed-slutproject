const apiKey = '2ce9be8c1080ffeccb2c519e6b372131';

function getWeatherEmoji(description) {
  const desc = description.toLowerCase();
  if (desc.includes('clear')) return '☀️';
  if (desc.includes('few clouds') || desc.includes('scattered clouds')) return '⛅';
  if (desc.includes('clouds')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('drizzle')) return '🌦️';
  if (desc.includes('thunderstorm')) return '⛈️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
  return '🌈'; // fallback
}

function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error('City/Country not found');
      return response.json();
    })
    .then(data => {
      // Display weather info
      document.getElementById('weatherBox').classList.remove('hidden');
      document.getElementById('cityName').textContent = data.name;
      document.getElementById('temperature').textContent = `🌡️ Temp: ${data.main.temp} °C`;
      const weatherDesc = data.weather[0].description;
      const emoji = getWeatherEmoji(weatherDesc);
      document.getElementById('description').textContent = `${emoji} ${weatherDesc}`;

      // Get weather conditions and temperature
      const weatherMain = data.weather[0].main.toLowerCase();
      const temp = data.main.temp;
      const body = document.body;

      // Smooth background transition
      let topColor, bottomColor;

      switch (weatherMain) {
        case 'clear':
          topColor = '#fceabb';
          break;
        case 'clouds':
          topColor = '#d7d2cc';
          break;
        case 'rain':
        case 'drizzle':
          topColor = '#4e54c8';
          break;
        case 'thunderstorm':
          topColor = '#0f2027';
          break;
        case 'snow':
          topColor = '#e0eafc';
          break;
        default:
          topColor = '#fceabb';
      }

      if (temp <= 0) {
        bottomColor = '#0091ea';
      } else if (temp > 0 && temp <= 15) {
        bottomColor = '#a0e1e8';
      } else if (temp > 15 && temp <= 25) {
        bottomColor = '#f8b500';
      } else {
        bottomColor = '#ff6f00';
      }

      body.style.backgroundImage = `linear-gradient(to bottom, ${topColor}, ${bottomColor})`;
    })
    .catch(error => {
      document.getElementById('weatherBox').classList.remove('hidden');
      document.getElementById('cityName').textContent = 'Error';
      document.getElementById('temperature').textContent = '';
      document.getElementById('description').textContent = 'City not found. Try again.';
      console.error(error);
    });
}

const sidePanel = document.getElementById('sidePanel');
const toggleBtn = document.getElementById('openPanel');

toggleBtn.addEventListener('click', () => {
  if (sidePanel.style.left === '0px') {
    sidePanel.style.left = '-300px';
  } else {
    sidePanel.style.left = '0';
  }
});

window.addEventListener('load', () => {
  const introScreen = document.getElementById('introScreen');
  setTimeout(() => {
    introScreen.style.display = 'none';
  }, 2000);
});

document.getElementById('infoButton').addEventListener('click', function () {
  const infoText = document.getElementById('infoText');
  infoText.classList.toggle('visible');
});
