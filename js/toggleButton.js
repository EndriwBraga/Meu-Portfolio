export default class DarkModeButton {
  constructor() {
    // Esse é meu input
    this.toggleSwitch = document.getElementById("switch");
    // A classe que desejo ativar caso o input seja acionado.
    this.myh3 = document.querySelector("h3");
    // Esse é meus containers com background
    this.darkModeColor = document.querySelectorAll(".darkModeColor");
    // Todos os meus paragrafos
    this.paragraph = document.querySelectorAll(".paragraph");
    // Meus titulos da pagina.
    this.myTitle = document.querySelectorAll("h5");
    // Meus links
    this.MyLinkNavegation = document.querySelectorAll("a");

    this.activeDarkMode = "activeDarkMode";

    this.addClassActiveDarkMode = this.addClassActiveDarkMode.bind(this);
  }

  addClassActiveDarkMode() {
    this.toggleSwitch.addEventListener("click", () => {
      this.toggleSwitch.classList.toggle(this.activeDarkMode);

      this.myh3.classList.toggle(this.activeDarkMode);

      this.darkModeColor.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });

      this.paragraph.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });

      this.myTitle.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });

      this.MyLinkNavegation.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });
    });
  }

  init() {
    console.log(this.mysvg);
    console.log(this.darkModeColor);
    this.addClassActiveDarkMode();
  }
}
