const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = function (op, num1, num2) {
    if (op == "add") { return add(num1, num2) }
    else if (op == "subtract") { return subtract(num1, num2) }
    else if (op == "multiply") { return multiply(num1, num2) }
    else { return divide(num1, num2) };
}

let outputText = document.getElementById("output");
//let outputText = outputDisp.textContent;
const numButtons = document.querySelectorAll("button.numBtn");
const equalButton = document.getElementById("equal");
const operButtons = document.querySelectorAll("button.operBtn");
const acButton = document.getElementById("AC");
let displayValue = "";
let opValue = "";
let numValue1 = "";
let numValue2 = "";


numButtons.forEach((button) => button.addEventListener("click", (event) => {
    outputText.textContent += event.target.textContent;
    console.log(event.target.textContent);
    console.log(outputText);
    displayValue = Number(outputText.textContent);
    console.log(displayValue);
}));

operButtons.forEach((button) => button.addEventListener("click", (event) => {
    numValue1 = displayValue;
    opValue = event.target.id;
    console.log(opValue);
    outputText.textContent = "";
}));

equalButton.addEventListener("click", () => {
    numValue2 = displayValue;
    outputText.textContent = operate(opValue, numValue1, numValue2);
    console.log(outputText);
    displayValue = outputText.textContent;

});

acButton.addEventListener("click", () => {
    numValue1 = "";
    numValue2 = "";
    outputText.textContent = "";
})