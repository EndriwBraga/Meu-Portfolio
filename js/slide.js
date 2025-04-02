import debounce from "./debounce.js";

export class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);

    this.dist = { finalPositon: 0, startX: 0, movement: 0 };

    this.changeEvent = new Event("changeEvent");
    this.isMoving = false;

    this.activeClass = "active";
    this.sensitivity = 1.5;
    this.threshold = 120;
  }

  transition(active) {
    this.slide.style.transition = active ? "transform .3s" : "";
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * this.sensitivity;
    return this.dist.finalPositon - this.dist.movement;
  }

  onStart(event) {
    this.isMoving = true;

    event.preventDefault();

    const pointerType = event.type.startsWith("touch") ? "touch" : "mouse";
    this.dist.startX = this.getPointerPosition(event);

    const movetype = pointerType === "touch" ? "touchmove" : "mousemove";
    this.currentMoveHandler = (event) => this.onMove(event);
    this.wrapper.addEventListener(movetype, this.currentMoveHandler);

    this.transition(false);
  }

  onMove(event) {
    if (!this.isMoving) return;

    const pointerPosition = this.getPointerPosition(event);
    const finalPositon = this.updatePosition(pointerPosition);
    this.moveSlide(finalPositon);
  }

  onEnd(event) {
    if (!this.isMoving) return;

    const pointerType = event.type.startsWith("touch") ? "touch" : "mouse";
    const movetype = pointerType === "touch" ? "touchmove" : "mousemove";

    if (this.currentMoveHandler) {
      this.wrapper.removeEventListener(movetype, this.currentMoveHandler);
      this.currentMoveHandler = null;
    }

    this.dist.finalPositon = this.dist.movePosition;
    this.transition(true);
    this.changeSlideOnEnd();
    this.dist.movement = 0;
  }

  addKeyboardEvents() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") this.activeNextSlide();
      if (event.key === "ArrowLeft") this.activePrevSlide();
    });
  }

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
    this.wrapper.addEventListener("mousedown", this.onStart.bind(this));
    this.wrapper.addEventListener("touchstart", this.onStart.bind(this));
    this.wrapper.addEventListener("mouseup", this.onEnd.bind(this));
    this.wrapper.addEventListener("touchend", this.onEnd.bind(this));
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      element.setAttribute("role", "tabpanel");
      const position = this.slidePosition(element);
      return { position, element };
    });
  }

  slidesIndexNav(index) {
    const last = this.slideArray.length - 1;
    this.index = {
      prev: index > 0 ? index - 1 : undefined,
      active: index,
      next: index < last ? index + 1 : undefined,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position); // Move para a posição correta
    this.slidesIndexNav(index); // Atualiza os índices
    this.dist.finalPositon = activeSlide.position; // Atualiza a posição final
    this.changeActiveClass(); // Atualiza a classe ativa
    this.wrapper.dispatchEvent(this.changeEvent); // Dispara o evento de mudança
  }

  changeActiveClass() {
    this.slideArray.forEach((item) => {
      item.element.classList.remove(this.activeClass);
      item.element.setAttribute("aria-hidden", "true");
    });

    const activeSlide = this.slideArray[this.index.active].element;
    activeSlide.classList.add(this.activeClass);
    activeSlide.setAttribute("aria-hidden", "false");
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

  onResize() {
    this.slidesConfig();
    this.changeSlide(this.index.active);
  }

  addResizeEvent() {
    window.addEventListener("resize", debounce(this.onResize.bind(this), 200));
  }

  bindEvents() {
    const methodsToBind = ["onStart", "onMove", "onEnd", "activePrevSlide", "activeNextSlide"];
    methodsToBind.forEach((method) => {
      this[method] = this[method].bind(this);
    });

    this.onResize = debounce(this.onResize.bind(this), 200);
  }

  getPointerPosition(event) {
    return event.type.startsWith("touch")
      ? event.changedTouches[0].clientX
      : event.clientX;
  }

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