import debounce from "./debounce.js";

export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);

    // Informações de distância e classe ativa
    this.dist = { finalPositon: 0, startX: 0, movement: 0 };
    this.activeClass = "active";

    this.changeEvent = new Event("changeEvent");
    this.isMoving = false;

  }

  // Configura a transição do slide
  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  // Move o slide para uma posição específica
  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  // Atualiza a posição com base na interação do usuário
  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.5;
    return this.dist.finalPositon - this.dist.movement;
  }


  // Manipula o início do evento de arrastar/tocar, tem relação com o clientX do item/element
  onStart(event) {
    this.isMoving = true;

    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }

    this.wrapper.addEventListener(movetype, (event) => this.onMove(event), { passive: true });
    this.transition(false);
  }

  onMove(event) {
    if (!this.isMoving) return;

    const pointerPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;

    const finalPositon = this.updatePosition(pointerPosition);
    this.moveSlide(finalPositon);
  }


  onEnd(event) {
    if (!this.isMoving) return;

    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(movetype, (event) => this.onMove(event));
    this.dist.finalPositon = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
  }


  

  // Verifica se deve avançar/retroceder ao finalizar o arrastar/tocar
  changeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
        console.log("Mudando para o próximo slide");
        this.activeNextSlide();
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
        console.log("Mudando para o slide anterior");
        this.activePrevSlide();
    } else {
        this.changeSlide(this.index.active);
    }
}


  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart, {
      passive: true,
    });
    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  //slide config

  // Calcula a posição do slide com base na largura do wrapper
  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  // Configuração das posições iniciais de cada slide
  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  // Configuração dos índices de navegação dos slides
  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1,
    };
  }
  // Altera para o slide especificado
  changeSlide(index) {
    const activeSlide = this.slideArray[index];

    this.moveSlide(this.slideArray[index].position);
    this.slidesIndexNav(index);
    this.dist.finalPositon = activeSlide.position;
    this.changeActiveClass();
    this.wrapper.dispatchEvent(this.changeEvent);
  }

  changeActiveClass() {
    this.slideArray.forEach((item) =>
      item.element.classList.remove(this.activeClass)
    );

    this.slideArray[this.index.active].element.classList.add(this.activeClass);
  }

  activeNextSlide() {
    console.log("Chamando activeNextSlide() - index antes:", this.index);
    this.changeSlide(this.index.next);
    console.log("Index depois:", this.index);
}

activePrevSlide() {
    console.log("Chamando activePrevSlide() - index antes:", this.index);
    this.changeSlide(this.index.prev);
    console.log("Index depois:", this.index);
}


  // Manipula o redimensionamento da janela
  onResize() {
    setTimeout(() => {
      this.slidesConfig();
      this.changeSlide(this.index.active);
    }, 1000);
  }

  // Adiciona ouvinte de evento de redimensionamento criado no inicio do codigo na classe
  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.activePrevSlide = this.activePrevSlide.bind(this);
    this.activeNextSlide = this.activeNextSlide.bind(this);

    this.onResize = debounce(this.onResize.bind(this), 200);
  }

  // Inicializa o slide
  init() {
    this.transition(true);
    this.bindEvents();
    this.addSlideEvents();
    this.slidesConfig();
    this.addResizeEvent();
    this.changeSlide(0);
    return this;
  }
}

export default class SlideNav extends Slide {
  constructor(slide, wrapper) {
    super(slide, wrapper);

    this.bindControlEvents();
  }

  addArrow(prev, next) {
    this.prevElement = document.querySelector(prev);
    this.nextElement = document.querySelector(next);

    this.addArrowEvent();
  }

  addArrowEvent() {
    this.prevElement.addEventListener("click", this.activePrevSlide);
    this.nextElement.addEventListener("click", this.activeNextSlide);
  }

  // Adiciona ouvintes de eventos para os controles de navegação
  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener("changeEvent", this.activeControlItem);
  }

  // verifica o slide ativo para dar um style personalizado no css
  activeControlItem() {
    this.controlArray.forEach((item) =>
      item.classList.remove(this.activeClass)
    );
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  // Adiciona os controles existentes e gerencia eventos pelo eventControl
  addControl(customControl) {
    this.control = document.querySelector(customControl);
    this.controlArray = [...this.control.children];

    this.activeControlItem();
    this.controlArray.forEach(this.eventControl);
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
