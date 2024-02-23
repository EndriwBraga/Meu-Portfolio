export default class DarkModeToggle {
  constructor() {
    this.mode = document.getElementById("mode_icon");
    this.svgFillElements = document.querySelectorAll(".iconsChangeFillDark");
    this.svgStrokeElements = document.querySelectorAll(
      ".iconsChangeStrokeDark"
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
    this.addModeChangeListener();
  }
}
