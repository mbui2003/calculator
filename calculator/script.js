// Variables to store numbers, operator, and current operation
let firstNum = '';
let secondNum = '';
let operator = '';
let currentOperation = '';

// DOM Element Selection
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');
const currentOperationScreen = document.querySelector('#currentNum');

// Mathematical Operations
function add(firstNum, secondNum) {
    return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
    return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
    return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
    return firstNum / secondNum;
}

// Function to perform the selected operation
function operate() {
    let num1 = Number(firstNum);
    let num2 = Number(secondNum);
    let answer = 0;

    // Switch statement to determine the operation
    switch (operator) {
        case '+':
            answer = add(num1, num2);
            break;
        case '-':
            answer = subtract(num1, num2);
            break;
        case 'x':
            answer = multiply(num1, num2);
            break;
        case '÷':
            answer = divide(num1, num2);
            break;
    }

    // Reset variables for the next operation
    secondNum = '';
    firstNum = answer.toString();
    operator = '';
}

// Function to handle operator button clicks
const chooseOp = (oper) => {
    // Check if firstNum is empty
    if (firstNum === '') {
        operator = '';
    } else if (firstNum !== '' && secondNum !== '') {
        // If both numbers are present, perform the current operation
        operate();
        operator = oper;
        currentOperationScreen.textContent = `${firstNum} ${operator}`;
    } else {
        // Set the operator if only the first number is present
        operator = oper;
        currentOperationScreen.textContent = `${firstNum} ${operator}`;
    }
};

// Function to handle number button clicks
const chooseNum = arg => {
    // Check if an operator is selected
    if (operator === '') {
        if (firstNum.length <= 11) {
            // Append the digit to the first number
            firstNum += arg;
            currentOperationScreen.textContent = `${firstNum}`;
        }
    } else if (operator !== '') {
        if (secondNum.length <= 11) {
            // Append the digit to the second number if an operator is selected
            secondNum += arg;
            currentOperationScreen.textContent = `${firstNum} ${operator} ${secondNum} `;
        }
    }
};

// Event listeners for number buttons
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        chooseNum(button.getAttribute('data-number'));
    });
});

// Event listeners for operator buttons
operatorButtons.forEach((op) => {
    op.addEventListener('click', () => {
        chooseOp(op.getAttribute('data-operator'));
    });
});

// Event listener for the equal button
equalButton.addEventListener('click', () => {
    // Perform the operation and update the display
    operate();
    currentOperationScreen.textContent = `${firstNum}`;
});

// Event listener for the delete button
deleteButton.addEventListener('click', () => {
    // Handle deleting digits based on the current state
    if (firstNum !== '' && operator === '' && secondNum === '') {
        firstNum = firstNum.slice(0, -1);
        if (firstNum.length === 0) {
            currentOperationScreen.textContent = "0";
        } else {
            currentOperationScreen.textContent = firstNum;
        }
    } else if (firstNum !== '' && operator !== '' && secondNum === '') {
        // Clear the operator if deleting in the second number entry
        operator = '';
        currentOperationScreen.textContent = `${firstNum} ${operator}`;
    } else if (firstNum !== '' && operator !== '' && secondNum !== '') {
        // Delete digits in the second number entry
        secondNum = secondNum.slice(0, -1);
        currentOperationScreen.textContent = `${firstNum} ${operator} ${secondNum}`;
    }
});

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    // Clear all variables and reset the display
    currentOperationScreen.textContent = "0";
    operator = '';
    firstNum = '';
    secondNum = '';
});
