document.addEventListener("DOMContentLoaded", () => {
    calculator()
})

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