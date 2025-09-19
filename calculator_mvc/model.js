//работа с данными, бизнес-логика

export class CalculatorModel {
  constructor() {
    this.result = 0;
  }

  makeOperation(arr) {
    if (arr[1] === "+") {
      this.result = Number(arr[0]) + Number(arr[2]);
    } else if (arr[1] === "-") {
      this.result = Number(arr[0]) - Number(arr[2]);
    } else if (arr[1] === "*") {
      this.result = Number(arr[0]) * Number(arr[2]);
    } else if (arr[1] === "/") {
      this.result = Number(arr[0]) / Number(arr[2]);
    } else {
      return arr[0];
    }

    return this.result;
  }
}
