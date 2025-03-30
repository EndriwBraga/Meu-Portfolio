import debounce from "./debounce.js";
// estou comentando esse código para o eu do futuro saber oque eu fiz em cada pedacinho, pois por mais que seja simples, esse código me proporcionou bastante aprendizado
// e devo voltar ocasionalmente nele e ler e lembrar por que eu optei por fazer assim e talvez conforme eu for voltando, eu opte por mudar algo
// todos os comentarios serão apagados na versão final

export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);

    // Informações de distância e classe ativa
    this.dist = { finalPositon: 0, startX: 0, movement: 0 };
    

    this.changeEvent = new Event("changeEvent");
    this.isMoving = false;

    this.activeClass = "active";
    this.sensitivity = 1.5;
    this.threshold = 120;
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
    this.dist.movement = (this.dist.startX - clientX) * this.sensitivity;
    return this.dist.finalPositon - this.dist.movement;
  }

  // Manipula o início do evento de arrastar/tocar, tem relação com o clientX do item/element
  onStart(event) {
    this.isMoving = true;

    let movetype;
    if (event.type === "mousedown") {
      //event.preventDefault(); Se eu nao sentir diferença, isso vai ser removido.
      this.dist.startX = event.clientX;
      movetype = "mousemove";
    } else if (event.type === "touchstart") {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    } else {
      return; // Ignora outros tipos de eventos
    }

    // Armazena o manipulador atual para removê-lo posteriormente
    this.currentMoveHandler = (event) => this.onMove(event);
    this.wrapper.addEventListener(movetype, this.currentMoveHandler, {
      passive: true,
    });

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

    // Remove o manipulador de eventos corretamente
    if (this.currentMoveHandler) {
      this.wrapper.removeEventListener(movetype, this.currentMoveHandler);
      this.currentMoveHandler = null; // Limpa a referência
    }

    this.dist.finalPositon = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
    this.dist.movement = 0; // Resetar o movimento
  }

  addKeyboardEvents() {
    window.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") this.activeNextSlide();
        if (event.key === "ArrowLeft") this.activePrevSlide();
    });
}

  // Verifica se deve avançar/retroceder ao finalizar o arrastar/tocar
  changeSlideOnEnd() {
    let newIndex;

    if (this.dist.movement > this.threshold && this.index.next !== undefined) {
      newIndex = this.index.next;
    } else if (
      this.dist.movement < -this.threshold &&
      this.index.prev !== undefined
    ) {
      newIndex = this.index.prev;
    } else {
      newIndex = this.index.active;
    }

    this.changeSlide(newIndex);
  }

  addSlideEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);
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

  changeToSlide(direction) {
    const newIndex = direction === "next" ? this.index.next : this.index.prev;
    if (newIndex !== undefined) {
      this.changeSlide(newIndex);
    }
  }
  activeNextSlide() {
    this.changeToSlide("next");
  }
  activePrevSlide() {
    this.changeToSlide("prev");
  }

  // Manipula o redimensionamento da janela
  onResize() {
    this.slidesConfig();
    this.changeSlide(this.index.active);
  }

  // Adiciona ouvinte de evento de redimensionamento criado no inicio do codigo na classe
  addResizeEvent() {
    window.addEventListener("resize", debounce(this.onResize.bind(this), 200));
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
    this.addKeyboardEvents();
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
    this.wrapper.addEventListener("changeEvent", this.activeControlItem); // Adiciona uma única vez
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
