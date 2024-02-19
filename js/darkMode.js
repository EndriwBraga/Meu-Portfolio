export default class DarkModeToggle {
  constructor() {
    this.mode = document.getElementById("mode_icon");
    this.svgElements = document.querySelectorAll(".iconsChangeDark");

    this.handleModeChange = this.handleModeChange.bind(this);

    this.activeDarkMode = "dark";
  }

  handleModeChange() {
    const body = document.querySelector(".body");
    if (this.mode.checked) {
      body.classList.add(this.activeDarkMode);
      console.log("O modo escuro foi ativado!");
    } else {
      body.classList.remove(this.activeDarkMode);
      console.log("O modo escuro foi desativado!");
      console.log(this.svgElements);
    }
  }

  addModeChangeListener() {
    this.mode.addEventListener("change", this.handleModeChange);
  }

  init() {
    this.addModeChangeListener();
  }
}
