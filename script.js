

const operate = function (operation, num1, num2) {
    const OPERATIONS = {
        add: (num1, num2) => num1 + num2,
        subtract: (num1, num2) => num1 - num2,
        multiply: (num1, num2) => num1 * num2,
        divide: (num1, num2) => num1 / num2
    };
    return OPERATIONS[operation](num1, num2);
}

let outputText = document.getElementById("output");
const numButtons = document.querySelectorAll("button.numBtn");
const equalButton = document.getElementById("equal");
const operationButtons = document.querySelectorAll("button.operBtn");
const acButton = document.getElementById("AC");
const removeButton = document.getElementById("remove");
const dotButton = document.getElementById("dot");
const plusMinusButton = document.getElementById("plusMinus");
let displayValue = "";
let operationValue = "";
let numValue1 = "";
let numValue2 = "";
let repeatLastEqualsOperation = false;
let displayValueForEqualsRepeat = "";


function inputNumber(event) {
    if (outputText.textContent === "0" || repeatLastEqualsOperation) { outputText.textContent = "" };
    outputText.textContent += event;
    disableDot();
    displayValue = Number(outputText.textContent);
    displayValueForEqualsRepeat = displayValue;
    repeatLastEqualsOperation = false;
}

function disableDot() { dotButton.disabled = outputText.textContent.includes(".") };

function removeSymbol() {
    outputText.textContent = outputText.textContent.slice(0, -1);
    displayValue = Number(outputText.textContent);
}

function selectOperation(event) {
    numValue1 = displayValue;
    console.log(displayValue);
    operationValue = event;
    outputText.textContent = "";
    repeatLastEqualsOperation = false;
}

function evaluate() {
    numValue2 = displayValue;
    if (numValue2 === 0 && operationValue === "divide") {
        alert("DIVISION BY ZERO PROHIBITED!");
    } else {
        if (repeatLastEqualsOperation) {
            outputText.textContent = operate(operationValue, displayValue, displayValueForEqualsRepeat)
        } else {
            outputText.textContent = operate(operationValue, numValue1, numValue2)
        };
    }
    displayValue = Number(outputText.textContent);
    console.log(displayValue);
    repeatLastEqualsOperation = true;
}

function convertPlusMinus() {
    if (outputText.textContent.includes("-")) {
        outputText.textContent = outputText.textContent.slice(1);
    } else {
        outputText.textContent = "-" + outputText.textContent;
    }
    displayValue = Number(outputText.textContent);
}

function clearAll() {
    numValue1 = "";
    numValue2 = "";
    outputText.textContent = "0";
    repeatLastEqualsOperation = false;
}
function inputKeyboard(event) {
    if (event.key >= 0 && event.key <= 9) return inputNumber(event.key);
    if (event.key === ".") {
        if (!outputText.textContent.includes(".")) {
            return outputText.textContent += "."
        }
    };
    if (event.key === "Backspace") return removeSymbol();
    if (event.key === "+" || event.key === "-" || event.key === "/" || event.key === "*") {
        return selectOperation(convertOperator(event.key));
    }
    if (event.key === "=" || event.key === "Enter") {
        event.preventDefault();
        return evaluate();
    }
    if (event.key === "Escape") return clearAll();
    if (event.key === "s") return convertPlusMinus();
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "+") return "add";
    if (keyboardOperator === "-") return "subtract";
    if (keyboardOperator === "*") return "multiply";
    if (keyboardOperator === "/") return "divide";
}

numButtons.forEach((button) => button.addEventListener("click", () => inputNumber(button.textContent)));
operationButtons.forEach((button) => button.addEventListener("click", () => selectOperation(button.id)));
equalButton.addEventListener("click", evaluate);
removeButton.addEventListener("click", removeSymbol);
plusMinusButton.addEventListener("click", convertPlusMinus);
acButton.addEventListener("click", clearAll)

window.addEventListener("keydown", inputKeyboard);
