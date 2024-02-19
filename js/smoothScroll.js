export default class smoothScroll {
  constructor() {
    this.linksAnchors = document.querySelectorAll('a[href^="#"]');
  }

  anchorLink() {
    this.linksAnchors.forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  init() {
    this.anchorLink();
  }
}
