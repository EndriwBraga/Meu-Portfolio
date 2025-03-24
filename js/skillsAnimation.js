class AnimationState {
    constructor() {
        this.isMovingUp = false;
    }

    toggle() {
        this.isMovingUp = !this.isMovingUp;
    }

    getState() {
        return this.isMovingUp;
    }
}

export default class SkillsAnimation {
    constructor() {
        this.cartoons = document.querySelectorAll(".items_cards");
        this.animationState = new AnimationState(); 
    }

    init() {
        this.animate();
    }

    animate() {
        if (this.cartoons.length === 0) return;

        const animateCards = () => {
            this.cartoons.forEach(card => {
                this.applyAnimationState(card);
            });

            this.animationState.toggle(); 
            requestAnimationFrame(animateCards); 
        };

        requestAnimationFrame(animateCards); 
    }

    applyAnimationState(card) {
        if (this.animationState.getState()) {
            card.style.transform = "translateY(-20px)";
        } else {
            card.style.transform = "translateY(0)";
        }
    }
}
