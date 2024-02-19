export default class smoothScroll {
  constructor(linkSelector) {
    this.linksAnchors = document.querySelectorAll(linkSelector);
  }

  anchorLink() {
    this.linksAnchors.forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId = anchor.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }

  init() {
    if (this.linksAnchors.length === 0) {
      return;
    }
    this.anchorLink();
  }
}
