import * as model from "./model.js";
import sliderView from "./views/sliderView.js";
import searchView from "./views/searchView.js";

const controlSearchResults = async function () {
  try {
    // 0) Render spinner in place of slider
    sliderView.renderSpinner();

    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadUserCollection(query);

    // 3) Render first slide
    model.state.search.game = 0;
    sliderView.render(model.state.search.results[model.state.search.game]);

    // 4) Render dots
    sliderView.createDots(model.state.search.results);

    // 5) Make First Dot Active
    sliderView.makeDotActive(model.state.search.game);
  } catch (err) {
    console.log(err);
  }
};

const myCollectionDisplay = async function () {
  try {
    // 0) Render spinner in place of slider
    sliderView.renderSpinner();

    // 1) Load search results
    await model.loadUserCollection("Kamil2310");

    // 2) Render first slide
    model.state.search.game = 0;
    sliderView.render(model.state.search.results[model.state.search.game]);

    // 3) Render dots
    sliderView.createDots(model.state.search.results);

    // 4) Make First Dot Active
    sliderView.makeDotActive(model.state.search.game);
  } catch (err) {
    console.log(err);
  }
};

const controlSlider = function (changeGame) {
  // 1) Decide new index which to display
  switch (changeGame) {
    case "prev":
      model.state.search.game == 0
        ? (model.state.search.game = model.state.search.results.length - 1)
        : --model.state.search.game;
      break;
    case "next":
      model.state.search.game == model.state.search.results.length - 1
        ? (model.state.search.game = 0)
        : ++model.state.search.game;
      break;
    default:
      model.state.search.game = +changeGame;
      break;
  }

  // 2) Render selected slide
  sliderView.render(model.state.search.results[model.state.search.game]);

  // 3) Make new dot active
  sliderView.makeDotActive(model.state.search.game);
};

const init = function () {
  sliderView.addHandlerSlide(controlSlider);
  searchView.addHandlerSearch(controlSearchResults);
  searchView.addHandlerMyCollection(myCollectionDisplay);
};

init();
