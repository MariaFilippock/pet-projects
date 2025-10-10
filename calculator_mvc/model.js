import {LOCAL_STORAGE_APP_STATE_KEY} from "./const.js";

export class Model {
    constructor() {
        this.state = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_STATE_KEY)) || {
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

    setResultAndFirstArg(result) {
        this.setState({
            ...this.state,
            result,
            firstArg: result.toString(),
            operator: '',
            secondArg: '',
        })
    }

    addComma(el) {
        const argKey = this.state.operator ? 'secondArg' : 'firstArg';
        const argValue = this.state[argKey] || '0';

        if (argValue.includes(el)) return;

        this.state[argKey] = argValue + el;

        this.concatResult();
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

    concatResult() {
        this.state.result = `${this.state.firstArg}${this.state.operator}${this.state.secondArg}`;
    }

    calculateResult() {
        const format = (num) => (Number.isInteger(num) ? num : num.toFixed(4));
        let arg1 = Number(this.state.firstArg);
        let arg2 = Number(this.state.secondArg);

        if (this.state.operator === "+") {
            this.setResultAndFirstArg(format(arg1 + arg2));
        } else if (this.state.operator === "-") {
            this.setResultAndFirstArg(format(arg1 - arg2));
        } else if (this.state.operator === "/" && arg2 === 0) {
            this.setResultAndFirstArg("Ошибка!");
        } else if (this.state.operator === "/") {
            this.setResultAndFirstArg(format(arg1 % arg2 === 0 ? arg1 / arg2 : (arg1 / arg2)));
        } else if (this.state.operator === "*") {
            this.setResultAndFirstArg(format(arg1 * arg2));
        } else if (this.state.operator === "%") {
            this.setResultAndFirstArg(arg1 / 100);
        } else {
            this.setResultAndFirstArg(arg1);
        }

        this.concatResult();
        this.saveToLocalStorage();
        this.onChange(this.state);
    }

    addDigitOrOperator(el) {
        if (this.operations.includes(el)) {
            this.state.operator = el;
        } else if (this.state.operator && !isNaN(el)) {
            this.state.secondArg += el;
        } else if (!isNaN(el)) {
            this.state.firstArg += el;
        }

        this.concatResult();
        this.saveToLocalStorage();
        this.onChange(this.state);
    }

    onChange() {
    }

    initOnChange(callback) {
        this.onChange = callback;
    }

    saveToLocalStorage() {
        localStorage.setItem(LOCAL_STORAGE_APP_STATE_KEY, JSON.stringify(this.state));
    }
}
