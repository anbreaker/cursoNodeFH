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

      console.log(response.data);
      return [];
    } catch (error) {
      return [];
    }
  }
}

module.exports = Searchs;
