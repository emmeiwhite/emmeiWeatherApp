const form = document.querySelector('.location');

// Updating the UI
const updateUI = (data) => {
  const cityLocation = document.querySelector('.change-location');

  if (cityLocation.classList.contains('d-none')) {
    cityLocation.classList.remove('d-none');
  }

  const { cityDets, weather } = data;
  const details = document.querySelector('.details');

  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather[0].WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather[0].Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;
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


  const city = form.city.value;
  form.reset();

  updateCity(city)
    .then(data => {
      updateUI(data);
    })
    .catch(err => {
      console.log(err.message);
    })
});