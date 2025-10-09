import {ONLY_LETTERS_REGEX} from "./const.js";

export class View {
    constructor() {
        this.root = document.getElementById("root")
    }

    _getHTMLElements() {
        this.input = document.getElementById("display");
        this.buttons = document.querySelectorAll("[data-action='button']");
        this.commaBtn = document.getElementById("comma");
        this.resetBtn = document.getElementById("reset");
        this.equalBtn = document.getElementById("equal");
    };

    _clearInput() {
        this.input.value = "";
    }

    onCommaClick(handler) {
        this.commaBtn.addEventListener("click", (event) => {
            handler(event.target.textContent);
        })
    }

    onResetClick(handler) {
        this.resetBtn.addEventListener("click", (event) => {
            this._clearInput();
            handler();
        })
    }

    onButtonClick(handler) {
        this.buttons.forEach((btn) => {
            btn.addEventListener("click", (event) => {
                handler(event.target.textContent);
            });
        })
    }

    onEqualClick(handler) {
        this.equalBtn.addEventListener("click", (event) => {
            handler(event.target.textContent);
        });
    }

    onInput(handler) {
        this.input.addEventListener("keyup", (event) => {
            if (ONLY_LETTERS_REGEX.test(event.target.value)) {
                this._clearInput();
                return;
            }
            handler(event.target.value);
        });
    }

    renderApp() {
        this.root.innerHTML = `<input type="text" id="display" class="display"  />
    <div class="buttons">
        <button data-action="button">7</button>
        <button data-action="button">8</button>
        <button data-action="button">9</button>
        <button data-action="button">/</button>
        <button data-action="button">4</button>
        <button data-action="button">5</button>
        <button data-action="button">6</button>
        <button data-action="button">*</button>
        <button data-action="button">1</button>
        <button data-action="button">2</button>
        <button data-action="button">3</button>
        <button data-action="button">-</button>
        <button id="equal">=</button>
        <button data-action="button">+</button>
        <button id="comma">.</button>
        <button data-action="button">%</button>
        <button data-action="button" class="zero">0</button>
        <button id="reset" class="reset">C</button>
    </div>`;

        this._getHTMLElements();
    }

    updateDisplay(value) {
        this.input.value = value.result;
    }
}
