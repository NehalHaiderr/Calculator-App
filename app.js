let string = "";
let userInput = document.querySelector("#input-prompt");
let buttons = document.querySelectorAll(".buttons");

function safeCalculate(expr) {
    // Prevent invalid characters
    if (!/^[0-9+\-*/.%\s()]+$/.test(expr)) {
        throw new Error("Invalid characters in expression");
    }

    // Convert % to /100 for math
    expr = expr.replace(/%/g, "/100");

    // Use Function() safely — only math allowed
    const result = Function(`"use strict"; return (${expr})`)();

    // Handle NaN or undefined results
    if (isNaN(result) || result === undefined) {
        throw new Error("Invalid expression");
    }

    return result;
}


buttons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        const btn = evt.currentTarget;
        const text = btn.innerText.trim();
        const isOperator = /[+\-*\/%]/;
        const lastChar = string.slice(-1);

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
            )

            const currentNumber = string.slice(lastOpIndex + 1);

            if (currentNumber.includes(".")) {
                return;
            }

            string += "."
            userInput.value = string;
            return;
        }

        if (text === "DEL") {
            string = string.slice(0, -1);
            userInput.value = string;
            return;
        }

        if (text === "AC") {
            string = "";
            userInput.value = string;
            return;
        }

        if (text === "%") {
            if (string && !/[+\-*/%]$/.test(string)) {
                string = (parseFloat(eval(string)) / 100).toString();
                userInput.value = string;
            }
            return;
        }

        if (text === "=") {
            try {
                if (!string) return;

                if (/[+\-*\/%]$/.test(string)) {
                    throw new Error("Ends with operator");
                }

                const result = safeCalculate(string);
                string = result.toString();
                userInput.value = string;
            }

            catch (err) {
                string = "";
                userInput.value = "Error";
            }
            return;
        }

        if (isOperator.test(text) && isOperator.test(lastChar)) {
            string = string.slice(0, -1) + text;
        }

        else {
            string += text;
        }
        userInput.value = string;
    });
});