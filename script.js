document.addEventListener("DOMContentLoaded", () => {
    calculator()
})

function calculator() {
    for (let i = 1; i <= 9;) {
        const row = document.createElement("div")
        row.classList = "row"
        for (let j = 0; j < 3; j++, i++) {
            const btn = document.createElement("button")
            btn.value = btn.innerHTML = i
            btn.classList = "btn btn-primary"
            row.appendChild(btn)
        }
        document.querySelector(".container").appendChild(row)
    }
}