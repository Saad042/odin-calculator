const resultSpan = document.querySelector(".result-text");
const operators = ["+", "-", "*", "/"];
let isCurrentNumberFloat = false;
let isNumberPresent = false;
let isResultCalculated = false;

function addToDisplayString(event) {
  const input = event.srcElement.textContent;
  if (isResultCalculated) {
    resultSpan.textContent = "";
    isNumberPresent = false;
    isCurrentNumberFloat = false;
    isResultCalculated = false;
  }
  if (input === ".") {
    if (!isCurrentNumberFloat) {
      resultSpan.textContent += input;
      isCurrentNumberFloat = true;
      isNumberPresent = false;
    }
  } else if (operators.includes(input)) {
    if (isNumberPresent) {
      resultSpan.textContent += input;
      isCurrentNumberFloat = false;
      isNumberPresent = false;
    }
  } else {
    resultSpan.textContent += input;
    isNumberPresent = true;
  }
}

function calculateResult() {
  if (!isResultCalculated) {
    const inputString = resultSpan.textContent;
    const inputOperands = inputString.split(/[+*\/-]/g);
    const inputOperators = inputString.match(/[+*\/-]/g);
    while (inputOperands.length > 1 && inputOperands[0] !== NaN) {
      const num1 = inputOperands.shift();
      const num2 = inputOperands.shift();
      const operator = inputOperators.shift();

      if (Number(num2) === 0 && operator === "/") {
        inputOperands[0] = NaN;
      } else {
        const result = operate(num1, num2, operator);
        inputOperands.unshift(result);
      }
    }
    if (inputOperands[0] !== "") {
      resultSpan.textContent += ` = ${inputOperands[0]}`;
    }
    isResultCalculated = true;
  }
}

function operate(num1, num2, operator) {
  let result = 0;
  switch (operator) {
    case "+":
      result = parseFloat(num1) + parseFloat(num2);
      break;

    case "-":
      result = num1 - num2;
      break;

    case "*":
      result = num1 * num2;
      break;

    case "/":
      result = num1 / num2;
      break;

    default:
      break;
  }
  return Math.round(result * 1000) / 1000;
}

function clearDisplayString() {
  resultSpan.textContent = "";
}

function removeLastEntry() {
  resultSpan.textContent = resultSpan.textContent.slice(0, -1);
}
