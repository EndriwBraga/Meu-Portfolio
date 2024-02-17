export default class DarkModeToggle {
  constructor() {
    this.mode = document.getElementById("mode_icon");
    this.svgElements = document.querySelectorAll(".iconsChangeDark");

    this.handleModeChange = this.handleModeChange.bind(this);
  }

  handleModeChange() {
    const body = document.querySelector(".body");
    if (this.mode.checked) {
      body.classList.add("dark");
      console.log("O modo escuro foi ativado!");
    } else {
      body.classList.remove("dark");
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
