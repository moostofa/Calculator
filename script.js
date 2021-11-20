const OPERATIONS = {
    "arithmetic": {
        "x": (a, b) => a * b, 
        "/": (a, b) => a / b,
        "+": (a, b) => a + b, 
        "-": (a, b) => a - b,
        "=": () => {
            const result = OPERATIONS["arithmetic"][operationToPerform](parseFloat(previousValue), parseFloat(currentValue))
            return (result % 1 === 0) ? `${result}` : `${result.toFixed(2)}`
        } 
    },
    "visual": {
        "DEL": () => {
            if (operationToPerform !== "=") {   // prevent editing anything on results screen
                if (currentValue !== "") {
                    currentValue = currentValue.slice(0, -1) 
                    if (currentValue === "") toggleOperatorBtns("OFF")
                }
                else if (operationToPerform !== ""){
                    operationToPerform = ""
                    toggleOperatorBtns("ON")
                    toggleNumberBtns("OFF")
                } 
            }
        }, 
        "AC": () => {
            previousValue = currentValue = operationToPerform = equation = ""
            toggleOperatorBtns("OFF")
            toggleNumberBtns("ON")
        },
        ".": () => {
            if (operationToPerform !== "=" && !currentValue.includes("."))
                currentValue += "."
        }, 
        "ANS": () => {
            currentValue = ANS
            toggleOperatorBtns("ON")
        } 
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
let equation = ""

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

                btn.addEventListener("click", () => operate(btn.value))
                row.appendChild(btn)
            })
        })
        // add the row of buttons to the calculator
        document.querySelector(".container").appendChild(row)
    })
    toggleANSBtn("OFF")
    toggleOperatorBtns("OFF")
}

// 1. If a number button was clicked, add its value to the currentValue string
// 2. Else, an operator button was clicked - perform either an arithmetic or visual operation
function operate(btnValue) {
    if (!isNaN(parseFloat(btnValue))) {
        currentValue += btnValue
        toggleOperatorBtns("ON")
    } else {
        // error checking - incase button value was changed
        if (!OPERATIONS.operators().includes(btnValue))
            return alert("Invalid button - Button value provided does not match its expected value")

        if (Object.keys(OPERATIONS["arithmetic"]).includes(btnValue)) {
            toggleNumberBtns("ON")

            // 1. If either the previous or current value are empty, another operand is required
            // 2. else, a calculation can be performed with the two operands
            if (previousValue.length === 0 || currentValue.length === 0 || operationToPerform === "=") {
                // THIS line prevents calculator from malfunctioning when DEL is used on an operator
                // i.e, prevents previousValue from being changed to "undefined"
                if (currentValue.length !== 0) previousValue = currentValue

                equation = previousValue
                currentValue = ""
                toggleOperatorBtns("OFF")
            } else {
                // evaluate the expression with previousValue and currentValue
                const result = OPERATIONS["arithmetic"]["="]()

                // 1. If "=" button is pressed, display result and the last step of the calculation
                // 2. else, one of "x/+-" was pressed, continue the running calculation
                if (btnValue === "=") {
                    equation = `${previousValue} ${operationToPerform} ${currentValue}`
                    currentValue = ANS = result
                    toggleNumberBtns("OFF")
                } else {
                    equation = previousValue = result
                    currentValue = ""
                }
                toggleOperatorBtns((btnValue === "=") ? "ON" : "OFF")
            }
            operationToPerform = btnValue
        } else OPERATIONS["visual"][btnValue]()
    }
    document.getElementById("previous-calculation").innerHTML = equation
    document.getElementById("current-operator").innerHTML = operationToPerform
    document.getElementById("current-calculation").innerHTML = currentValue
}

// toggle operator buttons to prevent spam
function toggleOperatorBtns(action) {
    const arithmeticOperators = Object.keys(OPERATIONS["arithmetic"])
    arithmeticOperators.forEach(operator => {
        const operatorBtn = document.querySelector(`[name = "${operator}"]`)
        if (action === "ON")
            operatorBtn.removeAttribute("disabled")
        else
            operatorBtn.setAttribute("disabled", "")
    })

    // disable "=" button if we are on result screen OR if an arithmetic operator is to be chosen
    // prevents behaviour like 1 = 4 instead of 1 + 4
    if (document.querySelector("[name = '0']").disabled || operationToPerform === "")
        document.querySelector("[name = '=']").setAttribute("disabled", "")

    toggleANSBtn(`${action === "ON" ? "OFF" : "ON"}`)
}

// toggle number buttons off when results are displayed ("=" operation was performed)
function toggleNumberBtns(action) {
    for (let i = 0; i <= 9; i++) {
        const numberBtn = document.querySelector(`[name = "${i}"]`)
        if (action === "ON")
        numberBtn.removeAttribute("disabled")
        else
        numberBtn.setAttribute("disabled", "")
    }
    toggleANSBtn(action)
}

// ANS button will initially be disabled
// same toggle as numbers buttons and inverse toggle of operator buttons 
function toggleANSBtn(action) {
    const AnsBtn = document.querySelector("[name = 'ANS']")
    if (ANS === "" || action === "OFF") {
        AnsBtn.setAttribute("disabled", "")
    } else {
        AnsBtn.removeAttribute("disabled")
    }
}