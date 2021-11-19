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
            else operationToPerform = ""
        }, 
        "AC": () => {
            if (currentValue !== "") currentValue = ""
            else if (operationToPerform !== "") operationToPerform = ""
            else previousValue = ""
        },
        ".": () => currentValue += ".", 
        "ANS": () => currentValue = previousValue, 
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
                btn.value = btn.innerHTML = val

                // different button colour depending on if it is a "number" or "operator" button
                btn.classList = `btn btn-lg btn-${(key === "numbers") ? "primary" : "warning"}`
                if (btn.value === "=") btn.classList += " equal-btn"    //equal button width = width of 2 buttons
                btn.addEventListener("click", () => calculate(btn.value))
                row.appendChild(btn)
            })
        })
        // add the row of buttons to the calculator
        document.querySelector(".container").appendChild(row)
    })
}

// 1. If a number button was clicked, add its value to the currentValue string
// 2. Else, an operator button was clicked - perform either an arithmetic or visual operation
function calculate(btnValue) {
    if (!isNaN(parseFloat(btnValue))) {
        currentValue += btnValue
    } else {
        // error checking 
        if (!OPERATIONS.operators().includes(btnValue))
            return alert("Invalid button - Button value provided does not match its expected value")

        if (Object.keys(OPERATIONS["arithmetic"]).includes(btnValue)) {
            // if either the previous or current value are empty, another operand is required
            // else, a calculation can be performed with the two operands
            if (previousValue.length === 0 || currentValue.length === 0) {
                previousValue = currentValue
                currentValue = ""
                operationToPerform = btnValue
            } else {
                const result = OPERATIONS["arithmetic"]["="]()
                previousValue = (btnValue === "=") ? "" : result
                currentValue = (btnValue === "=") ? result : ""
                operationToPerform = btnValue
            }
        } else OPERATIONS["visual"][btnValue]()
    }
    document.getElementById("current-calculation").innerHTML = `${operationToPerform} ${currentValue}`
}