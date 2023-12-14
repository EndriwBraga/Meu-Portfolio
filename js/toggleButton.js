export default class DarkModeButton {
  constructor() {
    // Esse é meu input
    this.toggleSwitch = document.getElementById("switch");

    // Esse é meus containers com background
    this.darkModeColor = document.querySelectorAll(".darkModeColor");
    // Todos os meus paragrafos
    this.paragraph = document.querySelectorAll("p");

    // A classe que desejo ativar caso o input seja acionado.
    this.activeDarkMode = "activeDarkMode";
  }

  addClassactiveDarkMode() {
    this.toggleSwitch.addEventListener("click", () => {
      this.toggleSwitch.classList.toggle(this.activeDarkMode);

      if (this.toggleSwitch.classList.contains(this.activeDarkMode)) {
        this.darkModeColor.forEach((element) => {
          element.classList.add(this.activeDarkMode);
        });
      } else {
        this.darkModeColor.forEach((element) => {
          element.classList.remove(this.activeDarkMode);
        });
      }
    });
  }

  addClassActiveParagraph() {
    this.toggleSwitch.addEventListener("click", () => {
      this.toggleSwitch.classList.toggle(this.activeDarkMode);

      if (this.toggleSwitch.classList.contains(this.activeDarkMode)) {
        this.addClassActiveParagraph.forEach((element) => {
          element.classList.add(this.activeDarkMode);
        });
      } else {
        this.addClassActiveParagraph.forEach((element) => {
          element.classList.remove(this.activeDarkMode);
        });
      }
    });
  }

  init() {
    console.log(this.paragraph);
    console.log(this.darkModeColor);
    this.addClassactiveDarkMode();
    this.addClassActiveParagraph();
  }
}
