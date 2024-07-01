class SearchView {
  _parentEl = document.querySelector(".search");
  _myCollection = document.querySelector(".btn--my-collection");

  getQuery() {
    const query = this._parentEl.querySelector(".search-field").value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentEl.querySelector(".search-field").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  addHandlerMyCollection(handler) {
    this._myCollection.addEventListener("click", handler);
  }
}

export default new SearchView();
