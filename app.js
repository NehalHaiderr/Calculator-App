let string = "";
let userInput = document.querySelector("#input-prompt");
let buttons = document.querySelectorAll(".buttons");

// Safe math evaluator
function safeCalculate(expr) {
    if (!/^[0-9+\-*/.%\s()]+$/.test(expr)) {
        throw new Error("Invalid characters in expression");
    }

    // Use Function for math only
    const result = Function(`"use strict"; return (${expr})`)();

    if (isNaN(result) || result === undefined) {
        throw new Error("Invalid expression");
    }

    return result;
}

// Main function for processing input (used by both clicks & keyboard)
function handleInput(text) {
    const isOperator = /[+\-*\/%]/;
    const lastChar = string.slice(-1);

    // Decimal logic
    if (text === ".") {
        if (!string || isOperator.test(lastChar)) {
            string += "0.";
            userInput.value = string;
            return;
        }

        const lastOpIndex = Math.max(
            string.lastIndexOf("+"),
            string.lastIndexOf("-"),
            string.lastIndexOf("*"),
            string.lastIndexOf("/"),
            string.lastIndexOf("%")
        );

        const currentNumber = string.slice(lastOpIndex + 1);
        if (currentNumber.includes(".")) return;

        string += ".";
        userInput.value = string;
        return;
    }

    // Delete
    if (text === "DEL" || text === "Backspace") {
        string = string.slice(0, -1);
        userInput.value = string;
        return;
    }

    // Clear
    if (text === "AC" || text === "Escape") {
        string = "";
        userInput.value = string;
        return;
    }

    // Percentage
    if (text === "%") {
        if (string && !/[+\-*/%]$/.test(string)) {
            string = (parseFloat(eval(string)) / 100).toString();
            userInput.value = string;
        }
        return;
    }

    // Equals
    if (text === "=" || text === "Enter") {
        try {
            if (!string) return;
            if (/[+\-*\/%]$/.test(string)) throw new Error("Ends with operator");

            const result = safeCalculate(string);
            string = result.toString();
            userInput.value = string;
        } catch {
            string = "";
            userInput.value = "Error";
        }
        return;
    }

    // Replace double operators
    if (isOperator.test(text) && isOperator.test(lastChar)) {
        string = string.slice(0, -1) + text;
    } else {
        string += text;
    }

    userInput.value = string;
}

// Handle button clicks
buttons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        const text = evt.currentTarget.innerText.trim();
        handleInput(text);
    });
});

// Handle keyboard input
document.addEventListener("keydown", (evt) => {
    const key = evt.key;

    if (
        /[0-9+\-*/.%]/.test(key) || // numbers & operators
        key === "Enter" ||
        key === "Backspace" ||
        key === "Escape" ||
        key === "." // decimal
    ) {
        evt.preventDefault(); // prevent unwanted browser actions
        handleInput(key);
    }
});
