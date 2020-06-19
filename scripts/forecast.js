document.cookie = "SameSite=Lax"
const key = 'nv9RRm1u74Tma6KF1FO1QbJTHTFPUDp1';

// get weather information
const getWeather = async (id) => {
  const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data;  // async functions returns promise
}

// get city information
const getCity = async (city) => {
  const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0]; // async functions returns promise
}
