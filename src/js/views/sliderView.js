import View from "./view.js";

class SliderView extends View {
  _parentElement = document.querySelector(".slide");
  _leftArrow = document.querySelector(".slider-btn--left");
  _rightArrow = document.querySelector(".slider-btn--right");
  _dotContainer = document.querySelector(".dots");
  _sliderControl = document.querySelector(".slider-control");

  addHandlerSlide(handler) {
    this._sliderControl.addEventListener("click", function (e) {
      const btn = e.target.closest(".slider-control-element");
      if (!btn) return;
      if (btn.classList.contains("dots-dot")) {
        handler(+btn.dataset.slide);
      } else {
        switch (true) {
          case btn.classList.contains("slider-btn--left"):
            handler("prev");
            break;
          case btn.classList.contains("slider-btn--right"):
            handler("next");
            break;
        }
      }
    });
  }

  createDots(games) {
    this._dotContainer.innerHTML = "";
    games.forEach((_, i) => {
      this._dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots-dot slider-control-element" data-slide="${i}"></button>`
      );
    });
  }

  makeDotActive(dotNumber) {
    this._dotContainer
      .querySelectorAll(".dots-dot")
      .forEach((dot) =>
        dot.dataset.slide == dotNumber.toString()
          ? dot.classList.add("dots-dot--active")
          : dot.classList.remove("dots-dot--active")
      );
  }

  _generateMarkup() {
    return `
          <div class="boardgame-name">
            <h3 >
              ${this._data.name}
            </h3>
            <div class="boardgame--developer">
              <h6 class="boardgame--developer--name">${this._data.yearPublished}</h6>
              <h6 class="boardgame--developer--name">Players: 2-4</h6>
            </div>
          </div>
          <div class="slide-game-info grid grid--2-cols--1-1">
            <div class="boardgame flex flex--space-between">
              <div class="boardgame--addons">
                <p class="addon">
                  + Hegemony: Lead Your Class to Victory - Crisis & Control
                </p>
                <p class="addon">
                  + Hegemony: Lead Your Class to Victory - Historical Events
                </p>
                <p class="addon">+ Sleeves</p>
              </div>
            </div>
            <div class="boardgame-image">
              <img
                src="${this._data.image}"
                alt="Box-cover image for ${this._data.name}"
              />
            </div>
          </div>`;
  }
}

export default new SliderView();
