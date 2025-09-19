//обработка событий, посредник между view и model

export class CalculatorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.currentInput = "";
    this.view.onButtonClick(this.handleInput.bind(this));
  }

  handleInput(input) {
    if (input === "C") {
      this.currentInput = "";
      this.view.updateDisplay("");
    } else if (input === "=") {
      this.currentInput = this.model.makeOperation(
        this.currentInput.split(" ")
      );
      this.view.updateDisplay(this.currentInput);
    } else {
      if (isFinite(input)) {
        this.currentInput += input;
      } else {
        this.currentInput += " " + input + " ";
      }

      this.view.updateDisplay(this.currentInput);
    }
  }
}
