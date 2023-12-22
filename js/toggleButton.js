export default class DarkModeButton {
  constructor() {
    // Esse é meu input
    this.toggleSwitch = document.getElementById("switch");

    this.myh3 = document.querySelector("h3");
    this.mySpace = document.querySelector(".mySpace");
    this.myTitle = document.querySelectorAll("h5");

    this.darkModeColor = document.querySelectorAll(".darkModeColor");

    this.paragraph = document.querySelectorAll(".paragraph");

    // Meus links
    this.MyLinkNavegation = document.querySelectorAll("a");

    this.itemsCard = document.querySelectorAll(".items_cards");
    this.studiesFuturo = document.querySelectorAll(".studies_future");
    this.iconsNetwork = document.querySelectorAll(".icons_network");

    // A classe que desejo ativar caso o input seja acionado.
    this.activeDarkMode = "activeDarkMode";

    this.addClassActiveDarkMode = this.addClassActiveDarkMode.bind(this);
  }

  addClassActiveDarkMode() {
    this.toggleSwitch.addEventListener("click", () => {
      this.toggleSwitch.classList.toggle(this.activeDarkMode);

      this.myh3.classList.toggle(this.activeDarkMode);

      this.mySpace.classList.toggle(this.activeDarkMode);

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

      this.itemsCard.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });

      this.studiesFuturo.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });

      this.iconsNetwork.forEach((element) => {
        element.classList.toggle(this.activeDarkMode);
      });
    });
  }

  init() {
    console.log(this.mySpace);
    console.log(this.darkModeColor);
    this.addClassActiveDarkMode();
  }
}
