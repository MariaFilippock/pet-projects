export class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.initOnChange(this.onChanged.bind(this));

        this.view.renderApp();
        this.view.onButtonClick(this.handleInput.bind(this));
        this.view.onEqualClick(this.handleCalculateResult.bind(this));
        this.view.onInput(this.handleInput.bind(this));
        this.view.onCommaClick(this.handleCommaClick.bind(this));
        this.view.onResetClick(this.handleResetOperation.bind(this));

        this.onChanged();
    }

    handleInput(input) {
        this.model.addDigitOrOperator(input);
    }

    handleCalculateResult() {
        this.model.calculateResult();
    }

    handleResetOperation() {
        this.model.resetOperation();
    }

    handleCommaClick(comma) {
        this.model.addComma(comma);
    }

    onChanged() {
        this.view.updateDisplay(this.model.state);
    }
}
