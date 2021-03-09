

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

function disableDot() {dotButton.disabled = outputText.textContent.includes(".") };

removeButton.addEventListener("click", () => {
    outputText.textContent = outputText.textContent.slice(0, -1);
    displayValue = Number(outputText.textContent);
});

numButtons.forEach((button) => button.addEventListener("click", (event) => {
    if (outputText.textContent == "0" || repeatLastEqualsOperation) {outputText.textContent = ""};
    outputText.textContent += event.target.textContent;
    disableDot();
    displayValue = Number(outputText.textContent);
    displayValueForEqualsRepeat = displayValue;
    repeatLastEqualsOperation = false;
}));

operationButtons.forEach((button) => button.addEventListener("click", (event) => {
    numValue1 = displayValue;
    operationValue = event.target.id;
    outputText.textContent = "";
    repeatLastEqualsOperation = false;
}));

equalButton.addEventListener("click", () => {
    numValue2 = displayValue;
    if (numValue2 == "0" && operationValue == "divide") {
        alert("DIVISION BY ZERO PROHIBITED!");
    } else {
        repeatLastEqualsOperation ?
         (outputText.textContent = operate(operationValue, displayValue, displayValueForEqualsRepeat)) : 
         (outputText.textContent = operate(operationValue, numValue1, numValue2));
    }
    displayValue = Number(outputText.textContent);
    repeatLastEqualsOperation = true;
});

plusMinusButton.addEventListener("click", () => {
    if (outputText.textContent.includes("-")){
        outputText.textContent = outputText.textContent.slice(1);
    } else {
        outputText.textContent = "-" + outputText.textContent;
    }
    displayValue = Number(outputText.textContent);
});

acButton.addEventListener("click", () => {
    numValue1 = "";
    numValue2 = "";
    outputText.textContent = "0";
    repeatLastEqualsOperation = false;

})
