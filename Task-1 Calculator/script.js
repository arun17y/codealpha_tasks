const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '0';
let firstValue = null;
let operator = null;
let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        // Handle clear button
        if (button.classList.contains('clear')) {
            currentInput = '0';
            firstValue = null;
            operator = null;
            expression = '';
            display.textContent = '0';
            return;
        }

        // Handle number and decimal buttons
        if (button.classList.contains('number')) {
            if (currentInput === '0' && value !== '.') {
                currentInput = value;
            } else if (value === '.' && currentInput.includes('.')) {
                return; // Prevent multiple decimals
            } else {
                currentInput += value;
            }
            expression = operator ? `${firstValue} ${operator} ${currentInput}` : currentInput;
            display.textContent = expression;
        }

        // Handle operator buttons
        if (button.classList.contains('operator')) {
            if (firstValue === null) {
                firstValue = parseFloat(currentInput);
                operator = value;
                currentInput = '0';
                expression = `${firstValue} ${operator}`;
                display.textContent = expression;
            } else if (operator) {
                // Calculate intermediate result if operator is pressed again
                const result = calculate(firstValue, parseFloat(currentInput), operator);
                if (result === 'Error') {
                    display.textContent = 'Error';
                    currentInput = '0';
                    firstValue = null;
                    operator = null;
                    expression = '';
                    return;
                }
                firstValue = result;
                operator = value;
                currentInput = '0';
                expression = `${firstValue} ${operator}`;
                display.textContent = expression;
            }
        }

        // Handle equals button
        if (button.classList.contains('equal')) {
            if (firstValue !== null && operator) {
                const result = calculate(firstValue, parseFloat(currentInput), operator);
                display.textContent = result;
                currentInput = result.toString();
                firstValue = null;
                operator = null;
                expression = result.toString();
            }
        }
    });
});

function calculate(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return 0;
    }
}