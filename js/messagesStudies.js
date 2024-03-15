export default class hoverMessagesStudies {
  constructor() {
    this.cards = document.querySelectorAll(".studies_future");
    this.messageElement = document.getElementById("message");
  }

  showMessage(message) {
    this.messageElement.textContent = message;
  }

  clearMessage() {
    this.messageElement.textContent =
      "Passe o mouse em cima dos cards para mais informações! Tenho experiência significativa com Sass, tendo trabalhado em três projetos que utilizam essa tecnologia. Inclusive, este portfólio foi completamente refatorado em Sass, destacando minha proficiência nesta ferramenta de estilo eficiente e poderosa.";
  }

  init() {
    this.cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const message = card.dataset.message;
        this.showMessage(message);
      });

      card.addEventListener("mouseleave", () => {
        this.clearMessage();
      });
    });
  }
}
