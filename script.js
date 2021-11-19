const OPERATIONS = {
    "arithmetic": {
        "x": (a, b) => a * b, 
        "/": (a, b) => a / b,
        "+": (a, b) => a + b, 
        "-": (a, b) => a - b,
        "=": () => OPERATIONS["arithmetic"][operationToPerform](parseFloat(previousValue), parseFloat(currentValue))
    },
    "visual": {
        "DEL": () => {
            if (currentValue !== "") currentValue = currentValue.slice(0, -1) 
            else {
                operationToPerform = ""
                toggleOperatorBtns("ON")
            } 
        }, 
        "AC": () => {
            previousValue = currentValue = operationToPerform = ""
            toggleOperatorBtns("OFF")
        },
        ".": () => currentValue += (!currentValue.includes(".")) ? "." : "", 
        "ANS": () => currentValue = ANS, 
    },
    // combine arithmetic and visual operators and return a list of all operators
    "operators": () => {
        const arithmetic = Object.keys(OPERATIONS["arithmetic"])
        const visual = Object.keys(OPERATIONS["visual"])
        return [...arithmetic, ...visual]
    }
}

// variables to keep track of the current state of the calculation
let previousValue = "" 
let currentValue = "" 
let operationToPerform = ""
let ANS = ""

// display the calculator on the screen after DOM is loaded
document.addEventListener("DOMContentLoaded", () => calculator())

// calculator constructor
function calculator() {
    const operators = OPERATIONS.operators()
    
    // an array of numbers & operators that will be assigned to the buttons' values
    const calculatorBtns = [
        {"numbers": [7, 8, 9], "operators": operators.slice(5, 7)},
        {"numbers": [4, 5, 6], "operators": operators.slice(0, 2)},
        {"numbers": [1, 2, 3], "operators": operators.slice(2, 4)},
        {"numbers": [0], "operators": operators.slice(7, operators.length).concat(operators[4])}
    ]
    // create number and operator buttons for each row
    calculatorBtns.forEach(btnRow => {
        const row = document.createElement("div")
        row.classList = "row"

        // -- key -- will be "numbers" or "operators" and -- value -- is an array of values for the buttons
        Object.entries(btnRow).forEach(([key, value]) => {
            value.forEach(val => {
                const btn = document.createElement("button")
                btn.name = btn.value = btn.innerHTML = val

                // different button colour depending on if it is a "number" or "operator" button
                btn.classList = `btn btn-lg btn-${(key === "numbers") ? "primary" : "warning"}`

                // the equal button will have the width of 2 buttons (in style.css)
                if (btn.value === "=") btn.classList += " equal-btn"    
                btn.addEventListener("click", () => calculate(btn.value))
                row.appendChild(btn)
            })
        })
        // add the row of buttons to the calculator
        document.querySelector(".container").appendChild(row)
    })
    toggleOperatorBtns("OFF")
}

// 1. If a number button was clicked, add its value to the currentValue string
// 2. Else, an operator button was clicked - perform either an arithmetic or visual operation
function calculate(btnValue) {
    let equation = ""
    if (!isNaN(parseFloat(btnValue))) {
        currentValue += btnValue
        toggleOperatorBtns("ON")
    } else {
        // error checking - incase button value was changed
        if (!OPERATIONS.operators().includes(btnValue))
            return alert("Invalid button - Button value provided does not match its expected value")

        if (Object.keys(OPERATIONS["arithmetic"]).includes(btnValue)) {
            // 1. If either the previous or current value are empty, another operand is required
            // 2. else, a calculation can be performed with the two operands
            if (previousValue.length === 0 || currentValue.length === 0 || operationToPerform === "=") {
                previousValue = currentValue
                currentValue = ""
                operationToPerform = btnValue
                toggleOperatorBtns("OFF")
            } else {
                // evaluate the expression with previousValue and currentValue
                const result = OPERATIONS["arithmetic"]["="]()

                // 1. If "=" button is pressed, display result and the last step of the calculation
                // 2. else, one of "x/+-" was pressed, continue the running calculation. Similar logic for toggle() call
                if (btnValue === "=") {
                    equation = `${previousValue} ${operationToPerform} ${currentValue}`
                    currentValue = ANS = result
                } else {
                    previousValue = result
                    currentValue = ""
                }
                toggleOperatorBtns((btnValue === "=") ? "ON" : "OFF")
                operationToPerform = btnValue
            }
        } else OPERATIONS["visual"][btnValue]()
    }
    document.getElementById("previous-calculation").innerHTML = (btnValue === "=") ? equation : previousValue
    document.getElementById("current-operator").innerHTML = operationToPerform
    document.getElementById("current-calculation").innerHTML = currentValue
}

function toggleOperatorBtns(action) {
    const arithmeticOperators = Object.keys(OPERATIONS["arithmetic"])
    arithmeticOperators.forEach(operator => {
        if (action === "ON")
            document.querySelector(`[name = "${operator}"]`).removeAttribute("disabled")
        else
            document.querySelector(`[name = "${operator}"]`).setAttribute("disabled", "")
    })
}

// bug remaining: DEL on an operator ruins the calculation