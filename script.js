// the operations that will be performed on previousValue and currentValue when user clicks "="
const OPERATIONS = {
    "DEL": () => currentValue = currentValue.slice(0, -1), 
    "AC": () => currentValue = "",
    "x": (a, b) => a * b, 
    "/": (a, b) => a / b,
    "+": (a, b) => a + b, 
    "-": (a, b) => a - b,
    ".": () => currentValue += ".", 
    "10^x": () => 10 ** currentValue, 
    "ANS": () => currentValue = previousValue, 
    "=": () => OPERATIONS[operationToPerform](
        parseInt(previousValue),
        parseInt(currentValue)
    )
}

// the previous value calculated, and the current value which is being created
let previousValue = "" 
let currentValue = "" 
let operationToPerform = ""

document.addEventListener("DOMContentLoaded", () => {
    // display the calculator on the screen
    calculator()
})

// calculator constructor
function calculator() {
    const operators = Object.keys(OPERATIONS)
    
    // an array of numbers & operators that will be assigned to the buttons' values
    const calculatorBtns = [
        {"numbers": [7, 8, 9], "operators": operators.slice(0, 2)},
        {"numbers": [4, 5, 6], "operators": operators.slice(2, 4)},
        {"numbers": [1, 2, 3], "operators": operators.slice(4, 6)},
        {"numbers": [0], "operators": operators.slice(6, operators.length)}
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
    // add strings, e.g., 1 + 9 = "19"
    if (!isNaN(parseFloat(btnValue))) {
        currentValue += btnValue
        document.getElementById("current-calculation").innerHTML = currentValue
        return
    }

    // incase user inspects element and changes the value of a button
    if (!Object.keys(OPERATIONS).includes(btnValue))
        return alert("Invalid operator - operator value does not match its functionality")
        
    if (btnValue === "=") {
        temp = `${previousValue} ${operationToPerform} ${currentValue}`
        currentValue = OPERATIONS[btnValue]()
        previousValue = temp
        operationToPerform = btnValue

    } else if (previousValue.length === 0 || currentValue.length === 0) {
        operationToPerform = btnValue
        previousValue = currentValue
        currentValue = ""
        
    } else {
        previousValue = OPERATIONS["="]()
        currentValue = ""
    }
    document.getElementById("previous-calculation").innerHTML = previousValue
    document.getElementById("current-operator").innerHTML = operationToPerform
    document.getElementById("current-calculation").innerHTML = currentValue
}