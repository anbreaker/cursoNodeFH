const fs = require('fs');

require('dotenv').config();
const axios = require('axios').default;

class Searchs {
  history = [];
  dbFile = './db/database.json';

  constructor() {
    // TODO leer DB si existe
    this.readDB();
  }

  get capitaliceHistory() {
    // Capitalizar cada palabra.

    return this.history.map((item) => {
      let words = item.split(' ');

      words = words.map((word) => word[0].toUpperCase() + word.substring(1));

      return words.join(' ');
    });
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
      // peticion http
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

  addHistory(lugar = '') {
    // TODO prevenir duplicados

    if (this.history.includes(lugar.toLowerCase())) return;

    // Mantener en historial solo 5 registros
    this.history = this.history.splice(0, 4);

    this.history.unshift(lugar.toLowerCase());

    // Grabar en DB
    this.saveDB();
  }

  saveDB() {
    const payload = {
      history: this.history,
    };

    fs.writeFileSync(this.dbFile, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbFile)) return;

    const info = fs.readFileSync(this.dbFile, { encoding: 'utf-8' });

    const data = JSON.parse(info);

    this.history = data.history;
  }
}

module.exports = Searchs;
