const display = document.querySelector(".display");
let firstNumber = "";
let secondNumber = "";
let operator = "";


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

  console.log(firstNumber);
  console.log(secondNumber);
  console.log(operator);
}

function addDigit(digit) {
  if (operator == "") {
    if (firstNumber.length < 17) {
      firstNumber += digit;
    }
  }
  else {
    if (secondNumber.length < 17) {
      secondNumber += digit;
    }
  }
  displayUpdate();
}

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
      result = "Error";
    }
  }

  firstNumber = result.toString();
  secondNumber = "";
  operator = "";

  display.innerText = firstNumber;
}

function equalButton() {
  if (firstNumber != "" && operator != "" && secondNumber != "") {
    calculate();
  }
}


function deleteLast() {
  if (secondNumber != "") {
    secondNumber = secondNumber.slice(0, -1);
  } else if (operator != "") {
    operator = "";
  } else if (firstNumber != "") {
    firstNumber = firstNumber.slice(0, -1);
  }

  displayUpdate();
}

function clearDisplay() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  display.innerText = "0";
}



const add = function (num1, num2) {
  return Math.round((num1 + num2) * 100) / 100;
};

const subtract = function (num1, num2) {
  return Math.round((num1 - num2) * 100) / 100;
};

const multiply = function (num1, num2) {
  return Math.round((num1 * num2) * 100) / 100;
}

const divide = function (num1, num2) {
  return Math.round((num1 / num2) * 100) / 100;
}
