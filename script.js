const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = '347dbc24cc8d1e692e06d380b14e939a';
  const city = document.querySelector('.search-box input').value.trim();

  // Check if input is empty
  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  // Fetch weather data
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      // Handle "City Not Found" case
      if (json.cod === '404') {
        container.style.height = '850px';
        
        container.style.top = '31px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return;
      }

      // Display weather details
      container.style.height = '850px';
      container.style.top = '31px';
    
      weatherBox.classList.add('active');
      weatherDetails.classList.add('active');
      error404.classList.remove('active');

      // Update UI with data
      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temparature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = './content/clear.png';
          break;
        case 'Rain':
          image.src = './content/rain.png';
          break;
        case 'Snow':
          image.src = './content/snow.png';
          break;
        case 'Clouds':
          image.src = './content/cloud.png';
          break;
        case 'Mist':
          image.src = './content/mist.png';
          break;
        case 'Haze':
          image.src = './content/haze.png';
          break;
        default:
          image.src = './content/cloud.png';
          break;
      }
      
      // Reset animation
      image.style.animation = 'none'; // Reset previous animation
      void image.offsetWidth; // Trigger reflow to reset animation
      image.style.animation = ''; // Reapply animation

      temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
      description.innerHTML = json.weather[0].description;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${Math.round(json.wind.speed)} km/h`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('An error occurred while fetching the weather data. Please try again.');
    });
});