const display = document.querySelector(".result");
let firstNumber = "";
let secondNumber = "";
let operator = "";


//Display function
function displayUpdate() {

  if (firstNumber !== "") {
    display.innerText = firstNumber;

  }
  if (operator !== "") {
    display.innerText += operator;
  }
  if (secondNumber !== "") {
    display.innerText += secondNumber;
  }
  if (firstNumber == "") {
    display.innerText = "0";
  }

  shrinkText();
}

let addDigitToFirstNumber = false;
let addDigitToSecondNumber = false;
function shrinkText() {
  const fontSize = parseInt(window.getComputedStyle(display).fontSize);
  const displayWidth = display.clientWidth;
  const size = displayWidth / fontSize;
  if (
    firstNumber.length > size &&
    addDigitToFirstNumber &&
    firstNumber.length < 15 &&
    fontSize > 22
  ) {
    display.style.fontSize = `${fontSize - 1}px`;
  }
  if (
    secondNumber.length + firstNumber.length > size &&
    addDigitToSecondNumber &&
    secondNumber.length < 15 &&
    fontSize > 22
  ) {
    display.style.fontSize = `${fontSize - 1}px`;
  }
}

//Buttons functions
function addDigit(digit) {
  if (operator == '') {
    if (firstNumber.length < 15) {
      firstNumber += digit;
      addDigitToFirstNumber = true;
      addDigitToSecondNumber = false;
    }
  } else {
    if (secondNumber.length < 15) {
      secondNumber += digit;
      addDigitToSecondNumber = true;
      addDigitToFirstNumber = false;
    }
  }
  displayUpdate();
}

function equalButton() {
  if (firstNumber != "" && operator != "" && secondNumber != "") {
    calculate();
    display.style.fontSize = '40px'; // Reset font size to default
  }

}


//Decimal
function addDecimal() {
  if (operator == "") {
    if (!firstNumber.includes(".")) {
      firstNumber = firstNumber == "" ? "0." : firstNumber + ".";
    }
  } else {
    if (!secondNumber.includes(".")) {
      secondNumber = secondNumber == "" ? "0." : secondNumber + ".";
    }
  }

  displayUpdate();
}


function setOperator(op) {
  if (firstNumber != "") {
    if (operator != "" && secondNumber != "") {
      calculate();
    }
    operator = op;
    displayUpdate();
  }
}


//Percentage function
function applyPercentage() {

  if (firstNumber !== "" && operator == "" && secondNumber == "") {
    firstNumber = procent(parseFloat(firstNumber)).toString();
  } else if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
    secondNumber = firstNumber * procent(parseFloat(secondNumber));

  }

  displayUpdate();
}


//Delete functions
function deleteLast() {
  addDigitToFirstNumber=false;
  addDigitToSecondNumber=false;
  if (secondNumber != "") {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator != "") {
    operator = "";
  } else if (firstNumber != "") {
    firstNumber = firstNumber.slice(0, -1);
  }
  const maxFontSize = 40;
  let fontSize = parseInt(window.getComputedStyle(display).fontSize);
  if (fontSize < maxFontSize) {
    display.style.fontSize = `${fontSize + 1}px`;
  }
  displayUpdate();
}

function clearDisplay() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  display.style.fontSize = '40px'; // Reset font size to default
  display.innerText = "0";
}


//Calculation functions
function calculate() {
  const num1 = parseFloat(firstNumber);
  const num2 = parseFloat(secondNumber);
  let result;

  if (operator === "+") {
    result = add(num1, num2);
  } else if (operator === "-") {
    result = subtract(num1, num2)
  } else if (operator === "*") {
    result = multiply(num1, num2)
  } else if (operator === "/") {
    if (num2 !== 0) {
      result = divide(num1, num2);
    } else {
      result = "Cannot divide by zero";
    }
  }

  firstNumber = result.toString();
  secondNumber = "";
  operator = "";

  display.innerText = firstNumber;
}

const add = function (num1, num2) {
  return Math.round((num1 + num2) * 100) / 100;
};

const subtract = function (num1, num2) {
  console.log('num1', num1);
  console.log('num2', num2);
  return num1 - num2;
};

const multiply = function (num1, num2) {
  return Math.round((num1 * num2) * 100) / 100;
}

const divide = function (num1, num2) {
  return Math.round((num1 / num2) * 100) / 100;
}

const procent = function (num1) {
  return Math.round((num1 / 100) * 100) / 100;
}