import SlideNav from "./slide.js";
import DarkModeButton from "./toggleButton.js";

const slide = new SlideNav(".slide", ".slide-wrapper");
slide.init();
slide.addArrow(".prev", ".next");
slide.addControl(".custom-control");

const darkModeButton = new DarkModeButton();

darkModeButton.init();
