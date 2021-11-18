const OPERATIONS = {
    "DEL": () => console.log("Delete"), 
    "AC": () => console.log("Clear"),
    "x": () => console.log("Multiply"), 
    "/": () => console.log("Divide"),
    "+": () => console.log("Add"), 
    "-": () => console.log("Subtract"),
    ".": () => console.log("Decimal place"), 
    "10^x": () => console.log("10 to the power"), 
    "ANS": () => console.log("ANS"), 
    "=": () => console.log("Equal")
}

console.log(Object.keys(OPERATIONS))

document.addEventListener("DOMContentLoaded", () => {
    // display the calculator on the screen
    calculator()
})

let current = prev = ""

function calculator() {
    // an array of number & operator values that will be assigned to the buttons
    const calculatorBtns = [
        {"numbers": [7, 8, 9], "operators": ["DEL", "AC"]},
        {"numbers": [4, 5, 6], "operators": ["x", "/"]},
        {"numbers": [1, 2, 3], "operators": ["+", "-"]},
        {"numbers": [0], "operators": [".", "10^x", "ANS", "="]}
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

function calculate(btnValue) {
    if (!isNaN(parseInt(btn))) {
        current += btnValue
    }
    console.log(current)
}