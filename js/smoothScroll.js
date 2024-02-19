export default class smoothScroll {
  constructor() {
    this.linksAnchors = document.querySelectorAll('a[href^="#"]');
  }

  anchorLink() {
    this.linksAnchors.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

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
    this.anchorLink();
  }
}
