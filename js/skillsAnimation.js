export default class SkillsAnimation {
    constructor() {
        this.cartoons = document.querySelectorAll(".items_cards");
        this.isMovingUp = false;
    }

    init() {
        this.animate();
    }

    animate() {
        if (this.cartoons.length === 0) return;

        const animateCards = () => {
            this.cartoons.forEach(card => {
                if (this.isMovingUp) {
                    card.style.transform = "translateY(-20px)"; 
                } else {
                    card.style.transform = "translateY(0)"; 
                }
            });

            this.isMovingUp = !this.isMovingUp; 
            requestAnimationFrame(animateCards); // nativo do js, primeiro vez que uso
        };

        requestAnimationFrame(animateCards); 
    }
}
