// CALCULATOR PROJECT

const display = document.getElementById("display");

let lastInput = "";
let currentInput = "";

function appendToDisplay(input) {
    const operators = ["+", "-", "*", "/"];

    // Prevent multiple operators in a row
    if (operators.includes(input)) {
        if (display.value === "" || operators.includes(lastInput)) {
            return; // Invalid operator input
        }
    }

    // Prevent multiple decimals in the same number
    if (input === ".") {
        const parts = display.value.split(/[\+\-\*\/]/); // split by operators
        const lastNumber = parts[parts.length - 1];
        if (lastNumber.includes(".")) return;
    }

    display.value += input;
    lastInput = input;
}

function clearDisplay() {
    display.value = "";
    lastInput = "";
}

function calculate() {
    try {
        // Avoid evaluating invalid endings like "7+"
        if (["+", "-", "*", "/"].includes(lastInput)) {
            display.value = "Error!";
            return;
        }

        const result = eval(display.value);

        // Optional: Handle divide-by-zero
        if (result === Infinity || result === -Infinity) {
            display.value = "Error!";
        } else {
            display.value = result;
        }

        lastInput = "";
    } catch (error) {
        display.value = "Error!";
    }
}

function backspace() {
    const value = display.value;
    if (value.length > 0) {
        display.value = value.slice(0, -1);
        lastInput = display.value[display.value.length - 1] || "";
    }
}

let history = [];

function calculate() {
    try {
        if (["+", "-", "*", "/"].includes(lastInput)) {
            display.value = "Error!";
            return;
        }

        const result = eval(display.value);
        if (result === Infinity || result === -Infinity) {
            display.value = "Error!";
        } else {
            const expression = display.value + " = " + result;
            history.push(expression);
            updateHistory();
            display.value = result;
        }

        lastInput = "";
    } catch (error) {
        display.value = "Error!";
    }
}

function updateHistory() {
    const list = document.getElementById("history-list");
    list.innerHTML = "";
    history.slice(-10).reverse().forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

function toggleTheme() {
    document.body.classList.toggle("light");
    const themeBtn = document.getElementById("theme-toggle");
    themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
}

function toggleHistory() {
    const container = document.getElementById("history-container");
    container.style.display = container.style.display === "block" ? "none" : "block";
}
