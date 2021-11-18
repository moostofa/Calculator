document.addEventListener("DOMContentLoaded", () => {
    calculator()
})

function calculator() {
    const calculatorBtns = [
        {"numbers": [7, 8, 9], "operators": ["DEL", "AC"]},
        {"numbers": [4, 5, 6], "operators": ["x", "/"]},
        {"numbers": [1, 2, 3], "operators": ["+", "-"]},
        {"numbers": [0], "operators": [".", "10^x", "ANS", "="]}
    ]

    calculatorBtns.forEach(btnRow => {
        const row = document.createElement("div")
        row.classList = "row"

        btnRow["numbers"].forEach(number => {
            const btnDiv = document.createElement("div")

            const btn = document.createElement("button")
            btn.value = btn.innerHTML = number
            btn.classList = "btn btn-lg btn-primary"

            btnDiv.appendChild(btn)
            row.appendChild(btnDiv)
        })

        btnRow["operators"].forEach(operator => {
            const btnDiv = document.createElement("div")
            btnDiv.classList = "item"

            const btn = document.createElement("button")
            btn.value = btn.innerHTML = operator
            btn.classList = "btn btn-lg btn-warning"

            btnDiv.appendChild(btn)
            row.appendChild(btnDiv)
        })
        document.querySelector(".container").appendChild(row)
    })
}

/*
function calculator() {
    let operators = [
        {"clear":"AC"},
        {"add":"+", "subtract":"-"},
        {"multiply":"x", "divide":"/"},
        {"equal":"="}
    ]
    for (let i = 9; i >= 0;) {
        const row = document.createElement("div")
        row.classList = "row"

        Object.entries(operators.shift()).forEach(([key, value]) => {
            const operatorBtn = document.createElement("button")
            operatorBtn.value = key
            operatorBtn.innerHTML = value
            operatorBtn.classList = "btn btn-warning"
            row.append(operatorBtn)
        })

        for (let j = 0; j < 3; j++, i--) {
            if (i < 0) break
            const numberBtn = document.createElement("button")
            numberBtn.value = numberBtn.innerHTML = i
            numberBtn.classList = "btn btn-primary btn-lg"
            row.appendChild(numberBtn)
        }
        document.querySelector(".container").appendChild(row)
    }
    operators.forEach(element => Object.entries(element).forEach(([key, value]) => {
        console.log(`key: ${key}, value: ${value}`)
    }))
}

function calculator() {
    const calculatorBtns = [
        {"numbers": [7, 8, 9], "operators": {"clear": "AC"}},
        {"numbers": [4, 5, 6], "operators": {"multiply": "x", "divide": "/"}},
        {"numbers": [1, 2, 3], "operators": {"add": "+", "subtract": "-"}},
        {"numbers": [0], "operators": {"equal": "="}},
    ]
    calculatorBtns.forEach(btnRow => {
        const row = document.createElement("div")
        row.classList = "row align-items-center justify-content-center"

        btnRow["numbers"].forEach(number => {
            const col = document.createElement("div")
            col.classList = "col-sm"

            const numberBtn = document.createElement("button")
            numberBtn.value = numberBtn.innerHTML = number
            numberBtn.classList = "btn btn-primary btn-lg"

            col.appendChild(numberBtn)
            row.appendChild(col)
        })

        console.log(`numbers: ${btnRow["numbers"]}`)
        Object.entries(btnRow["operators"]).forEach(([key, value]) => {
            console.log(`action: ${key}, sign: ${value}`)
        })

        document.querySelector(".container").appendChild(row)
    })
    for (let i = 0; i < 4; i++) {
        const row = document.createElement("div")
        row.classList = "row"
        for (let j = 0; j < 4; j++) {
            const col = document.createElement("div")
            col.innerHTML = "hello"
            col.classList = "col"
            row.appendChild(col)
        }
        document.querySelector(".container").appendChild(row)
    }
}
*/