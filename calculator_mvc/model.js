export class Model {
    constructor() {
        this.state = JSON.parse(localStorage.getItem("state")) || {
            result: '',
            firstArg: '',
            operator: '',
            secondArg: '',
        };
        this.operations = ['-', '+', '/', '*', '%'];
    }

    setState(newState) {
        this.state = newState;
        this.saveToLocalStorage();
    }

    setResult(result) {
        this.setState({
            ...this.state,
            firstArg: result,
            operator: '',
            secondArg: '',
        })
    }

    addComma(el) {
        if (this.state.firstArg.includes(el) && this.state.secondArg.includes(el)) {
            return;
        }

        if (this.state.operator) {
            this.state.secondArg += el;
        } else {
            this.state.firstArg += el;
        }
        this.state.result = `${this.state.firstArg}${this.state.operator}${this.state.secondArg}`;

        this.saveToLocalStorage();
        this.onChange(this.state);
    }

    resetOperation() {
        this.setState({
            result: '',
            firstArg: '',
            operator: '',
            secondArg: '',
        })
    }

    makeOperation(el) {
        if (this.operations.includes(el)) {
            this.state.operator = el;
        } else if (this.state.operator && isFinite(el)) {
            this.state.secondArg += el;
        } else if (isFinite(el)) {
            this.state.firstArg += el;
        }

        if (el === "=") {
            let arg1 = Number(this.state.firstArg);
            let arg2 = Number(this.state.secondArg);

            if (this.state.operator === "+") {
                this.state.result = (arg1 + arg2).toFixed(2);
            } else if (this.state.operator === "-") {
                this.state.result = (arg1 - arg2).toFixed(2);
            } else if (this.state.operator === "/") {
                this.state.result = arg1 % arg2 === 0 ? arg1 / arg2 : (arg1 / arg2).toFixed(2);
            } else if (this.state.operator === "*") {
                this.state.result = (arg1 * arg2).toFixed(2);
            } else if (this.state.operator === "%") {
                this.state.result = arg1 / 100;
            } else {
                this.state.result = arg1;
            }

            this.setResult(this.state.result);
        } else {
            this.state.result += el;
        }

        this.saveToLocalStorage();
        this.onChange(this.state);
    }

    onChange(callback) {
        this.onChange = callback;
    }

    saveToLocalStorage() {
        localStorage.setItem("state", JSON.stringify(this.state));
    }
}
