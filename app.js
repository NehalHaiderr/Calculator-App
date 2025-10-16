let string = "";
let userInput = document.querySelector("#input-prompt");
let buttons = document.querySelectorAll(".buttons");

buttons.forEach((button) => {
    button.addEventListener("click", (evt) => {
        const btn = evt.currentTarget;               // the actual button element
        const text = btn.innerText.trim();         // reliable button text
        const isOperator = /[+\-*\/%]/;
        const lastChar = string.slice(-1);

        if (text === "%") {
            string += "/100";
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

        if (text === "=") {
            try {
                // guard: nothing to evaluate or trailing operator -> ignore or show error
                if (!string) return;
                if (/[*+\-\/%\.]$/.test(string)) {
                    userInput.value = "Error";
                    string = "";
                    return;
                }

                // evaluate and keep numeric result for toFixed
                const result = eval(string);
                if (typeof result === "number" && isFinite(result)) {
                    string = String(result);
                    if (Number.isInteger(result)) {
                        userInput.value = string;
                    }

                    else {
                        userInput.value = result.toFixed(3).replace(/\.?0+$/, "");
                    }
                } else {
                    // non-number result (e.g. undefined) — just show it
                    string = String(result);
                    userInput.value = string;
                }
            }
            catch (err) {
                userInput.value = "Error";
                string = "";
            }
            return;
        }

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
            if (currentNumber.includes(".")) {
                return;
            }

            string += ".";
            userInput.value = string;
            return;
        }

        // basic guard: don't append operator after another operator
        if (isOperator.test(text) && isOperator.test(lastChar)) {
            // replace consecutive operator (e.g. allow change 5+ to 5-)
            string = string.slice(0, -1) + text;
        } else {
            string += text;
        }
        userInput.value = string;
    });
})