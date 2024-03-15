import SlideNav from "./slide.js";
import DarkModeToggle from "./darkMode.js";
import smoothScroll from "./smoothScroll.js";
import hoverMessagesStudies from "./messagesStudies.js";

const slide = new SlideNav(".slide", ".slide-wrapper");
slide.init();
slide.addArrow(".prev", ".next");
slide.addControl(".custom-control");

const darkMode = new DarkModeToggle();
darkMode.init();

const scroll = new smoothScroll('a[href^="#"]');
scroll.init();

const hoverMessage = new hoverMessagesStudies();
hoverMessage.init();
