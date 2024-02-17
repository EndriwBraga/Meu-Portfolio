import SlideNav from "./slide.js";
import DarkModeToggle from "./darkMode.js";

const slide = new SlideNav(".slide", ".slide-wrapper");
slide.init();
slide.addArrow(".prev", ".next");
slide.addControl(".custom-control");

const darkMode = new DarkModeToggle();
darkMode.init();
