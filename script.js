const inputField = document.getElementById("result-input");
const operators = ["+", "-", "*", "/"];
let isCurrentNumberFloat = false;
let isNumberPresent = false;
let isResultCalculated = false;

function addToDisplayString(event) {
  const input = event.srcElement.textContent;
  if (isResultCalculated) {
    clearDisplayString();
  }
  if (input === ".") {
    if (!isCurrentNumberFloat) {
      inputField.value += input;
      isCurrentNumberFloat = true;
      isNumberPresent = false;
    }
  } else if (operators.includes(input)) {
    if (isNumberPresent) {
      inputField.value += input;
      isCurrentNumberFloat = false;
      isNumberPresent = false;
    }
  } else {
    inputField.value += input;
    isNumberPresent = true;
  }
}

function calculateResult() {
  if (!isResultCalculated) {
    const inputString = inputField.value;
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
      inputField.value += ` = ${inputOperands[0]}`;
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
  inputField.value = "";
  isNumberPresent = false;
  isCurrentNumberFloat = false;
  isResultCalculated = false;
}

function removeLastEntry() {
  inputField.value = inputField.value.slice(0, -1);
  if (!inputField.value) {
    clearDisplayString();
  }
}

function moveCursorToEnd() {
  inputField.setSelectionRange(
    inputField.value.length,
    inputField.value.length
  );
}

inputField.addEventListener("focus", moveCursorToEnd);

inputField.addEventListener("click", moveCursorToEnd);

inputField.addEventListener("keydown", (event) => {
  const key = event.key;
  const allowedKeys = "1234567890.+-/*";
  if (!allowedKeys.includes(key) && key !== "Backspace") {
    event.preventDefault();
    if (key === "=") {
      calculateResult();
    }
  } else {
    if (isResultCalculated) {
      clearDisplayString();
    }
    if (key === ".") {
      if (!isCurrentNumberFloat) {
        isCurrentNumberFloat = true;
        isNumberPresent = false;
      } else {
        event.preventDefault();
      }
    } else if (operators.includes(key)) {
      if (isNumberPresent) {
        isCurrentNumberFloat = false;
        isNumberPresent = false;
      } else {
        event.preventDefault();
      }
    } else if (key === "Backspace" && inputField.value.length <= 1) {
      clearDisplayString();
    } else {
      isNumberPresent = true;
    }
  }
});
