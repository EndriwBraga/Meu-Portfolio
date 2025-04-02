export class SlideControls {
  constructor(slide) {
    this.slide = slide; // Composição: recebe uma instância de Slide
  }

  addIndicators(indicatorContainer) {
    this.control = document.querySelector(indicatorContainer);

    if (!this.control) {
      console.error(`Elemento "${indicatorContainer}" não encontrado no DOM.`);
      return;
    }

    this.controlArray = [...this.control.children];

    this.controlArray.forEach((item, index) => {
      item.addEventListener("click", () => {
        console.log(`Indicator clicked: ${index}`);
        this.slide.changeSlide(index);
      });
    });
  }

  init(indicatorContainer) {
    this.addIndicators(indicatorContainer); // Adiciona apenas os indicadores
    return this;
  }
}