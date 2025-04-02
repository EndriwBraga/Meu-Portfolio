export class SlideNav {
    constructor(slide) {
      this.slide = slide; // Composição: recebe uma instância de Slide
      this.arrowsAdded = false; // Flag para evitar registro duplicado
    }
  
    addArrow(prev, next) {
      if (this.arrowsAdded) return; // Sai se os eventos já foram registrados
      this.arrowsAdded = true;
  
      this.prevElement = document.querySelector(prev);
      this.nextElement = document.querySelector(next);
  
      if (!this.prevElement || !this.nextElement) {
        throw new Error("Previous or next arrow element not found");
      }
  
      // Adiciona eventos de clique para desktop
      this.prevElement.addEventListener("click", () => {
        console.log("Prev arrow clicked (desktop)");
        this.slide.activePrevSlide();
      });
  
      this.nextElement.addEventListener("click", () => {
        console.log("Next arrow clicked (desktop)");
        this.slide.activeNextSlide();
      });
  
      // Adiciona eventos de toque para mobile
      this.prevElement.addEventListener("touchstart", (event) => {
        event.preventDefault(); // Impede comportamentos padrão de toque
        console.log("Prev arrow touched (mobile)");
        this.slide.activePrevSlide();
      });
  
      this.nextElement.addEventListener("touchstart", (event) => {
        event.preventDefault(); // Impede comportamentos padrão de toque
        console.log("Next arrow touched (mobile)");
        this.slide.activeNextSlide();
      });
    }
  
    init(prev, next) {
      this.addArrow(prev, next);
      return this;
    }
  }