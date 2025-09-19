//взаимодействует с DOM

export class CalculatorView {
  constructor() {
    this.display = document.getElementById("display");
    this.buttons = document.getElementById("buttons");
  }

  onButtonClick(handler) {
    this.buttons.addEventListener("click", (event) => {
      if (event.target.tagName !== "BUTTON") {
        return;
      }
      handler(event.target.textContent);
    });
  }

  updateDisplay(value) {
    this.display.value = value;
  }
}
