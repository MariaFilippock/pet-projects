//собираем все файлы вместе
import { CalculatorController } from "./controller.js";
import { CalculatorView } from "./view.js";
import { CalculatorModel } from "./model.js";

new CalculatorController(new CalculatorModel(), new CalculatorView());
