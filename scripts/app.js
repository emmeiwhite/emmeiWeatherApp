const form = document.querySelector('.location');

// Updating the UI
const updateUI = (data) => {

  const cityLocation = document.querySelector('.change-location');

  if (cityLocation.classList.contains('d-none')) {
    cityLocation.classList.remove('d-none');
  }

  const { cityDets, weather } = data;
  const details = document.querySelector('.details');

  // Updating the Image
  const time = document.querySelector('img.time');
  const icon = document.querySelector('.icon');

  console.log(weather.IsDayTime);
  let timeSrc = null;
  let iconSrc = null;
  weather[0].IsDayTime ? timeSrc = './../img/day.svg' : timeSrc = './../img/night.svg';

  time.setAttribute('src', timeSrc);

  iconSrc = `./../img/icons/${weather[0].WeatherIcon}.svg`;
  icon.innerHTML = `<img src=${iconSrc} alt="icon">`;

  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather[0].WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather[0].Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

  window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
};

// get all city details
const updateCity = async (city) => {
  const cityDets = await getCity(city);

  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();


  const city = form.city.value.trim().toLowerCase();

  updateCity(city)
    .then(data => {
      updateUI(data);
    })
    .catch(err => {
      alert("Enter a valid city");
      console.log(err.message);
    });

  localStorage.setItem('city', city);
});


/** --- SETTING UP THE LOCAL STORAGE --- */

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then(data => {
      updateUI(data);
    })
    .catch(err => {
      console.log(err);
    })
}
