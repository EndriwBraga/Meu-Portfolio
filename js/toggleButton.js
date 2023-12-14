export default class DarkModeButton {
  constructor() {
    // Esse é meu input
    this.toggleSwitch = document.getElementById("switch");

    // Esse é meus containers com background
    this.darkModeColor = document.querySelectorAll(".darkModeColor");
    // Todos os meus paragrafos
    this.paragraph = document.querySelectorAll(".paragraph");
    this.myTitle = document.querySelectorAll("h5");
    // A classe que desejo ativar caso o input seja acionado.
    this.activeDarkMode = "activeDarkMode";
  }

  addClassActiveDarkMode() {
    this.toggleSwitch.addEventListener("click", () => {
      this.toggleSwitch.classList.toggle(this.activeDarkMode);

      this.darkModeColor.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });

      this.paragraph.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });
    });

    this.myTitle.forEach((element) => {
      element.classList.toggle(this.activeDarkMode);
    });
  }

  init() {
    console.log(this.myTitle);
    console.log(this.darkModeColor);
    this.addClassActiveDarkMode();
  }
}
