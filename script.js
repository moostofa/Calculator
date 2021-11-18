// the operations that will be performed on previousValue and currentValue when user clicks "="
const OPERATIONS = {
    "DEL": () => currentValue = currentValue.slice(0, -1), 
    "AC": () => currentValue = "",
    "x": () => console.log("Multiply"), 
    "/": () => console.log("Divide"),
    "+": () => console.log("Add"), 
    "-": () => console.log("Subtract"),
    ".": () => console.log("Decimal place"), 
    "10^x": () => console.log("10 to the power"), 
    "ANS": () => currentValue = previousValue, 
    "=": () => console.log("Equal")
}

// the previous value calculated, and the current value which is being created
let previousValue = currentValue = ""

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
    if (!isNaN(parseInt(btnValue))) {
        currentValue += btnValue
        console.log(currentValue)
        return
    }
    if (!Object.keys(OPERATIONS).includes(btnValue))
        return alert("Invalid operator - operator value does not match its functionality")
    OPERATIONS[btnValue]()
}