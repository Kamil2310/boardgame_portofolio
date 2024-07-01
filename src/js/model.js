import {
  API_URL_1_BASE,
  API_URL_1_COLLECTION,
  API_URL_2_BASE,
  API_URL_2_COLLECTION,
} from "./config";
import { AJAX } from "./helpers";

const convert = require("xml-js");

export const state = {
  search: {
    query: "",
    results: [],
    game: 0,
  },
  games: [],
};

export const loadUserCollection = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(query);
    state.search.results = data.items.map((game) => {
      return {
        id: game.id,
        name: game.name,
        image: game.image,
        yearPublished: game.yearPublished,
      };
    });
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};
