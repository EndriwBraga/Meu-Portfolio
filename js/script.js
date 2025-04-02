import { Slide } from "./slide.js";
import { SlideNav } from "./slideNav.js";
import { SlideControls } from "./slideControls.js";
import DarkModeToggle from "./darkMode.js";
import smoothScroll from "./smoothScroll.js";
import hoverMessagesStudies from "./messagesStudies.js";
import SkillsAnimation from "./skillsAnimation.js";

// Inicializa o Slide (lógica básica do slider)
const slide = new Slide(".slide", ".slide-wrapper");
slide.init();

// Inicializa a navegação (setas) usando composição
const slideNav = new SlideNav(slide);
slideNav.addArrow(".prev", ".next");

// Inicializa os controles (indicadores) usando composição
const slideControls = new SlideControls(slide);
slideControls.init(".custom-control"); // Passa apenas o contêiner de indicadores


// Inicializa o modo escuro
const darkMode = new DarkModeToggle();
darkMode.init();

// Inicializa o scroll suave
const scroll = new smoothScroll('a[href^="#"]');
scroll.init();

// Inicializa as mensagens de hover
const hoverMessage = new hoverMessagesStudies();
hoverMessage.init();

// Inicializa a animação das skills
const skillsEffect = new SkillsAnimation();
skillsEffect.init();