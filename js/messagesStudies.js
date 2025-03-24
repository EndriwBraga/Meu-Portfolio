import debounce from "./debounce.js";

export default class hoverMessagesStudies {
  constructor() {
    this.cards = document.querySelectorAll(".studies_future");
    this.messageElement = document.getElementById("message");
    this.messageSurprise = document.getElementById("messageSurprise");
    this.hoveredCards = new Set();
  }

  showMessage(message) {
    this.messageElement.textContent = message;
  }

  clearMessage() {
    this.messageElement.textContent =
      "Passe o mouse em cima dos cards para mais informações! ";
  }

  eventMessage() {
    this.cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const message = card.dataset.message;
        this.showMessage(message);
        this.messageSurprise.classList.add("studies_hidden");
      });

      card.addEventListener("mouseleave", () => {
        this.clearMessage();
        this.messageSurprise.classList.remove("studies_hidden");
      });
    });
  }

  cardCounter() {
    this.cards.forEach((card) => {
      card.addEventListener(
        "mouseover",
        debounce(() => {
          if (!this.hoveredCards.has(card)) {
            this.hoveredCards.add(card);
          }

          this.isHovered = false;
          for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].matches(":hover")) {
              this.isHovered = true;
              break;
            }
          }

          if (this.hoveredCards.size === this.cards.length && !this.isHovered) {
            this.messageSurprise.classList.remove("studies_hidden");
          }
        }, 200)
      );
    });
  }

  init() {
    this.cardCounter();
    this.eventMessage();
  }
}
