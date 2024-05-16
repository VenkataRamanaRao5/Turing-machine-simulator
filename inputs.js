document.getElementById("addRow").addEventListener('click', e => {
    e.preventDefault()
    e.stopImmediatePropagation()
    table.innerHTML += '<tr><td></td><td></td><td></td><td></td></tr>'
})

function setTape(str) {
    console.log(str)
    container.innerHTML = ''
    tape.innerHTML = `
<span id="0" class="square active">
<span class="symbol">${str ? str[0] : ''}</span>
<div id="head">${state}</div>
</span>`
    for (let i = 1; i < str.length; i++) {
        tape.innerHTML += `
<span id="${i}" class="square">
    <span class="symbol">${str[i]}</span>
</span>`
    }
    container.appendChild(tape)
}

function setTable(map) {
    while (table.rows.length > 1)
        table.deleteRow(1)
    let s, i, counter = 1, row
    map.forEach((value, key) => {
        [s, i] = JSON.parse(key)
        document.getElementById("addRow").click()
        row = table.rows.item(counter).cells
        row[0].textContent = s
        row[1].textContent = i
        row[2].textContent = value[1].join(', ')
        row[3].textContent = value[0]
        counter++
    });
}

let sets = document.getElementsByClassName("set")
for (let i = 0; i < sets.length; i++) {
    sets[i].addEventListener('click', e => {
        e.preventDefault()
        e.stopImmediatePropagation()
        index = 0
        opt = e.target.getAttribute('data-opt')
        switch (opt) {
            case '0':
                state = table.rows.item(1).cells[0].textContent
                for (let i = 1; i < table.rows.length; i++) {
                    let row = table.rows.item(i).cells
                    transitionTable.set(JSON.stringify([row[0].textContent, row[1].textContent]), [row[3].textContent, row[2].textContent.split(/, ?/).filter(e => e)])
                }
                setTape(tapeInput.value)
                break
            case '1':
                state = 'q0'
                setTape(tapeInput.value)
                transitionTable = new Map([
                    [JSON.stringify(['q0', '0']), ['q6', ['E', 'R']]],
                    [JSON.stringify(['q6', '0']), ['q6', ['0', 'R']]],
                    [JSON.stringify(['q6', '1']), ['q1', ['1', 'R']]],
                    [JSON.stringify(['q5', '0']), ['q5', ['0', 'L']]],
                    [JSON.stringify(['q5', '1']), ['q5', ['1', 'L']]],
                    [JSON.stringify(['q5', '']), ['q0', ['E', 'R']]],
                    [JSON.stringify(['q0', '1']), ['q7', ['E', 'R']]],
                    [JSON.stringify(['q7', '0']), ['q7', ['E', 'R']]],
                    [JSON.stringify(['q7', '1']), ['q8', ['E', 'R']]],
                    [JSON.stringify(['q1', '0']), ['q2', ['X', 'R']]],
                    [JSON.stringify(['q2', '0']), ['q2', ['0', 'R']]],
                    [JSON.stringify(['q2', '1']), ['q2', ['1', 'R']]],
                    [JSON.stringify(['q2', '']), ['q3', ['0', 'L']]],
                    [JSON.stringify(['q3', '1']), ['q3', ['1', 'L']]],
                    [JSON.stringify(['q3', 'X']), ['q1', ['X', 'R']]],
                    [JSON.stringify(['q1', '1']), ['q4', ['1', 'L']]],
                    [JSON.stringify(['q4', 'X']), ['q4', ['0', 'L']]],
                    [JSON.stringify(['q4', '1']), ['q5', ['1', 'R']]],
                    [JSON.stringify(['q3', '0']), ['q3', ['0', 'L']]]
                ])
                setTable(transitionTable)
                break
            case '2':
                state = 'b'
                setTape(tapeInput.value)
                transitionTable = new Map([
                    [JSON.stringify(['b', '0']), ['c', ['X', 'R']]],
                    [JSON.stringify(['b', 'Y']), ['e', ['Y', 'R']]],
                    [JSON.stringify(['c', '0']), ['c', ['0', 'R']]],
                    [JSON.stringify(['c', '1']), ['d', ['Y', 'L']]],
                    [JSON.stringify(['c', 'Y']), ['c', ['Y', 'R']]],
                    [JSON.stringify(['d', '0']), ['d', ['0', 'L']]],
                    [JSON.stringify(['d', 'X']), ['b', ['X', 'R']]],
                    [JSON.stringify(['d', 'Y']), ['d', ['Y', 'L']]],
                    [JSON.stringify(['e', 'Y']), ['e', ['Y', 'R']]],
                    [JSON.stringify(['e', '']), ['f', ['', 'R']]]
                ])
                setTable(transitionTable)
                break
        }
        container.style.display = "grid"
        input.style.display = "none"
        edit.style.display = "block"
        tran = setTimeout(transition, delay)
    })
}

document.getElementById("close").addEventListener('click', (e) => {
    e.preventDefault()
    e.stopImmediatePropagation()
    container.style.display = "block"
    input.style.display = "none"
    edit.style.display = "block"
    tran = setTimeout(transition, delay)
})

document.getElementById("showInput").addEventListener('click', (e) => {
    clearTimeout(auto)
    clearTimeout(tran)
    console.log("here")
    e.preventDefault()
    e.stopImmediatePropagation()
    container.style.display = "none"
    input.style.display = "block"
    edit.style.display = "none"
})
