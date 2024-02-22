export default class DarkModeToggle {
  constructor() {
    this.mode = document.getElementById("mode_icon");
    this.svgElements = document.querySelectorAll(".iconsChangeFillDark");

    this.handleModeChange = this.handleModeChange.bind(this);

    this.activeDarkMode = "dark";
  }

  handleModeChange() {
    const body = document.querySelector(".body");
    const newColor = this.mode.checked ? "#fff" : "#9b3ef8"; // Cor do modo escuro ou claro

    if (this.mode.checked) {
      body.classList.add(this.activeDarkMode);
      console.log("O modo escuro foi ativado!");
    } else {
      body.classList.remove(this.activeDarkMode);
      console.log("O modo escuro foi desativado!");
    }

    // Alterar a cor do SVG
    this.svgElements.forEach((svg) => {
      const path = svg.querySelector("path");
      if (path) {
        path.setAttribute("fill", newColor);
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
