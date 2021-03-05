const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = function (operation, num1, num2) {
    if (operation == "add") { return add(num1, num2) }
    else if (operation == "subtract") { return subtract(num1, num2) }
    else if (operation == "multiply") { return multiply(num1, num2) }
    else { return divide(num1, num2) };
}

let outputText = document.getElementById("output");
const numButtons = document.querySelectorAll("button.numBtn");
const equalButton = document.getElementById("equal");
const operationButtons = document.querySelectorAll("button.operBtn");
const acButton = document.getElementById("AC");
const removeButton = document.getElementById("remove");
const dotButton = document.getElementById("dot");
let displayValue = "";
let operationValue = "";
let numValue1 = "";
let numValue2 = "";

function disableDot() { outputText.textContent.includes(".") ? dotButton.disabled = true : dotButton.disabled = false };

removeButton.addEventListener("click", (event) => {
    outputText.textContent = outputText.textContent.slice(0, -1);
    displayValue = Number(outputText.textContent);
});

numButtons.forEach((button) => button.addEventListener("click", (event) => {
    outputText.textContent == "0" ? (
        outputText.textContent = "", outputText.textContent += event.target.textContent
    ) : (
            outputText.textContent += event.target.textContent
        );
    disableDot();
    displayValue = Number(outputText.textContent);
}));

operationButtons.forEach((button) => button.addEventListener("click", (event) => {
    numValue1 = displayValue;
    operationValue = event.target.id;
    outputText.textContent = "";
}));

equalButton.addEventListener("click", () => {
    numValue2 = displayValue;
    (numValue2 == "0" && operationValue == "divide") ? (
        alert("DIVISION BY ZERO PROHIBITED!")
    ) : (
            outputText.textContent = operate(operationValue, numValue1, numValue2)
        );
    displayValue = Number(outputText.textContent);
});

acButton.addEventListener("click", () => {
    numValue1 = "";
    numValue2 = "";
    outputText.textContent = "0";
})
