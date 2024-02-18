import SlideNav from "./slide.js";
import DarkModeToggle from "./darkMode.js";
import smoothScroll from "./smoothScroll.js";

const slide = new SlideNav(".slide", ".slide-wrapper");
slide.init();
slide.addArrow(".prev", ".next");
slide.addControl(".custom-control");

const darkMode = new DarkModeToggle();
darkMode.init();

const scroll = new smoothScroll();
scroll.anchorLink();
