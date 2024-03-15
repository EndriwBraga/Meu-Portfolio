export default class DarkModeToggle {
  constructor() {
    this.mode = document.getElementById("js_mode_icon");
    this.svgFillElements = document.querySelectorAll(
      ".js-icons-change-fill-dark"
    );
    this.svgStrokeElements = document.querySelectorAll(
      ".js-icons-change-stroke-dark"
    );

    this.handleModeChange = this.handleModeChange.bind(this);

    this.activeDarkMode = "dark";
  }

  handleModeChange() {
    const body = document.querySelector(".body");
    const newFillColor = this.mode.checked ? "#fff" : "#9b3ef8";
    const newStrokeColor = this.mode.checked ? "#fff" : "#9b3ef8";

    if (this.mode.checked) {
      body.classList.add(this.activeDarkMode);
    } else {
      body.classList.remove(this.activeDarkMode);
    }
    this.changeSVGFill(newFillColor);
    this.changeSVGStroke(newStrokeColor);
  }

  checkColorBrowse() {
    const self = this;

    document.addEventListener("DOMContentLoaded", function () {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
      self.mode.checked = prefersDarkMode.matches;
      self.handleModeChange();
      console.log("Eu fui chamado");
    });
  }

  changeSVGFill(fillColor) {
    this.svgFillElements.forEach((svg) => {
      const path = svg.querySelector("path");
      if (path) {
        path.setAttribute("fill", fillColor);
      }
    });
  }

  changeSVGStroke(strokeColor) {
    this.svgStrokeElements.forEach((svg) => {
      const paths = svg.querySelectorAll("path");
      if (paths) {
        paths.forEach((path) => {
          path.setAttribute("stroke", strokeColor);
        });
      }
    });
  }

  addModeChangeListener() {
    this.mode.addEventListener("change", this.handleModeChange);
  }

  init() {
    this.checkColorBrowse();
    this.addModeChangeListener();
  }
}
