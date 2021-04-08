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
}

module.exports = Searchs;
