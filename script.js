// the operations that will be performed on previousValue and currentValue when user clicks "="
const OPERATIONS = {
    "arithmetic": {
        "x": (a, b) => a * b, 
        "/": (a, b) => a / b,
        "+": (a, b) => a + b, 
        "-": (a, b) => a - b,
        "=": () => OPERATIONS["arithmetic"][operationToPerform](parseFloat(previousValue), parseFloat(currentValue))
    },
    "visual": {
        "DEL": () => currentValue = currentValue.slice(0, -1), 
        "AC": () => currentValue = "",
        ".": () => currentValue += ".",  // incomplete
        "10^x": () => 10 ** currentValue, 
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
document.addEventListener("DOMContentLoaded", () => {
    calculator()
})

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

        // -- key -- is "numbers" or "operators" and -- value -- is an array (.forEach() can be used)
        Object.entries(btnRow).forEach(([key, value]) => {
            value.forEach(val => {
                const btn = document.createElement("button")
                btn.value = btn.innerHTML = val

                // different button colour depending on if it is a "number" or "operator" button
                btn.classList = `btn btn-lg btn-${key === "numbers" ? "primary" : "warning"}`
                btn.addEventListener("click", () => calculate(btn.value))
                row.appendChild(btn)
            })
        })
        // add the row of buttons to the calculator
        document.querySelector(".container").appendChild(row)
    })
}

// 1. If a number button is clicked, append the currentValue string with that number
// 2. If an operator button is clicked, validate the button value and save it as the operation to be performed
function calculate(btnValue) {
    // incase user inspects element and changes the value of a button
    if (!OPERATIONS.operators().includes(btnValue))
    return alert("Invalid button: Button value provided does not match its expected value")

    // add strings, e.g., 1 + 9 = "19"
    if (!isNaN(parseFloat(btnValue))) {
        currentValue += btnValue
        document.getElementById("current-calculation").innerHTML = currentValue
        return
    }

    // a string that will display the previous step of the calculation to the user
    temp = `${previousValue} ${operationToPerform} ${currentValue}`

    // if either the previous or current value are empty, another operand is required
    // else, a calculation can be performed with the two operands
    if (previousValue.length === 0 || currentValue.length === 0) {
        operationToPerform = btnValue
        previousValue = currentValue
        currentValue = ""
    } else {
        const result = OPERATIONS["arithmetic"]["="]()
        currentValue = (btnValue === "=") ? result : ""
        previousValue = (btnValue === "=") ? "" : result
        operationToPerform = btnValue
    }
    document.getElementById("previous-calculation").innerHTML = temp
    document.getElementById("current-operator").innerHTML = operationToPerform
    document.getElementById("current-calculation").innerHTML = currentValue
}