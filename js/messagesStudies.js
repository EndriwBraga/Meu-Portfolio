import debounce from "./debounce.js";

export default class hoverMessagesStudies {
  constructor() {
    this.cards = document.querySelectorAll(".studies_future");
    this.messageElement = document.getElementById("message");
    this.container = document.querySelector(".content_studies");
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


  trackCard(card) {
  if (!this.hoveredCards.has(card)) {
    this.hoveredCards.add(card);
  }

  let isHovered = false;
  for (let i = 0; i < this.cards.length; i++) {
    if (this.cards[i].matches(":hover")) {
      isHovered = true;
      break;
    }
  }

  if (this.hoveredCards.size === this.cards.length && !isHovered) {
    this.messageSurprise.classList.remove("studies_hidden");
  }
}

eventMessage() {
  this.cards.forEach((card) => {
    const showMessage = (e) => {
      e.stopPropagation();
      const message = card.dataset.message;
      this.showMessage(message);
      this.messageSurprise.classList.add("studies_hidden");
    };

    card.addEventListener("mouseover", showMessage);
    card.addEventListener("mouseout", () => this.clearMessage());

    card.addEventListener("touchstart", (e) => {
      e.preventDefault();
      e.stopPropagation();
      showMessage(e);
      this.trackCard(card); 
    });
  });

  const handleOutsideClick = (e) => {
    const clickedInsideContainer = this.container.contains(e.target);

    if (!clickedInsideContainer) {
      this.clearMessage();
    }
  };

  document.addEventListener("click", handleOutsideClick);
  document.addEventListener("touchstart", handleOutsideClick);
}
  
cardCounter() {
  this.cards.forEach((card) => {
    card.addEventListener(
      "mouseover",
      debounce(() => this.trackCard(card), 200)
    );
  });
}
  init() {
    this.cardCounter();
    this.eventMessage();
  }
}
