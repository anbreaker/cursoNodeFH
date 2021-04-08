require('dotenv').config();
const axios = require('axios').default;

class Searchs {
  history = ['Badajoz', 'Elvas'];

  constructor() {
    // TODO leer DB si existe
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_API_KEY,
      limit: 5,
      language: 'es',
    };
  }

  get paramsOpenWeatherMap() {
    return {
      appid: process.env.OPENWEATHERMAP_API_KEY,
      units: 'metric',
      lang: 'es',
    };
  }

  async city(lugar = '') {
    try {
      // peticion htto

      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const response = await instance.get();

      return response.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        // Mapbox devuelve Latitud Longitud al reves de google
        lat: lugar.center[1],
        lng: lugar.center[0],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      // Instancia axios.create()

      const instanceAxios = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsOpenWeatherMap, lat, lon },
      });

      // response.data
      const response = await instanceAxios.get();
      const { weather, main } = response.data;

      return {
        description: weather[0].description,
        minT: main.temp_min,
        maxT: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Searchs;
