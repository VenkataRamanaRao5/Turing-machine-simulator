document.getElementById("addRow").addEventListener('click', e => {
    e.preventDefault()
    e.stopImmediatePropagation()
    table.innerHTML += '<tr><td></td><td></td><td></td><td></td></tr>'
})

function setTape(str){
    console.log(str)
    tape.innerHTML = `
    <span id="0" class="square active">
        <span class="symbol">${str ? str[0] : ''}</span>
        <div id="head">${state}</div>
    </span>`
    for(let i = 1; i < str.length; i++){
        tape.innerHTML += `
        <span id="${i}" class="square">
            <span class="symbol">${str[i]}</span>
        </span>`
    }
}

function setTable(map){
    while(table.rows.length > 1)
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
for(let i = 0; i < sets.length; i++){
    sets[i].addEventListener('click', e => {
        e.preventDefault()
        e.stopImmediatePropagation()
        index = 0
        opt=e.target.getAttribute('data-opt')
        switch(opt){
            case '0':
                state = table.rows.item(1).cells[0].textContent
                transitionTable = new Map()
                for(let i = 1; i < table.rows.length; i++){
                    let row = table.rows.item(i).cells
                    transitionTable.set(JSON.stringify([row[0].textContent, row[1].textContent]), [row[3].textContent, row[2].textContent.split(/, ?/).filter(e => e)])
                }
                setTape(tapeInput.value)
                break
            case '1':
                state = 'b'
                setTape('')
                transitionTable = new Map([
                    [JSON.stringify(['b', '']), ['o', ['e', 'R', 'e', 'R', '0', 'R', 'R', '0', 'L', 'L']]],
                    [JSON.stringify(['o', '1']), ['o', ['R', 'x', 'L', 'L', 'L']]],
                    [JSON.stringify(['o', '0']), ['q', []]],
                    [JSON.stringify(['q', '0']), ['q', ['R', 'R']]],
                    [JSON.stringify(['q', '1']), ['q', ['R', 'R']]],
                    [JSON.stringify(['q', '']), ['p', ['1', 'L']]],
                    [JSON.stringify(['p', 'x']), ['q', ['E', 'R']]],
                    [JSON.stringify(['p', 'e']), ['f', ['R']]],
                    [JSON.stringify(['p', '']), ['p', ['L', 'L']]],
                    [JSON.stringify(['f', '1']), ['f', ['R', 'R']]],
                    [JSON.stringify(['f', '0']), ['f', ['R', 'R']]],
                    [JSON.stringify(['f', '']), ['o', ['0', 'L', 'L']]],
                ])
                setTable(transitionTable)
                break
            case '2':
                state = 'b'
                setTape(tapeInput.value)
                transitionTable = new Map([
                    [JSON.stringify(['b', '0']), ['c', ['X', 'R']]],
                    [JSON.stringify(['b', 'Y']), ['e', ['Y','R']]],
                    [JSON.stringify(['c', '0']), ['c', ['0', 'R']]],
                    [JSON.stringify(['c', '1']), ['d', ['Y', 'L']]],
                    [JSON.stringify(['c', 'Y']), ['c', ['Y', 'R']]],
                    [JSON.stringify(['d', '0']), ['d', ['0', 'L']]],
                    [JSON.stringify(['d', 'X']), ['b', ['X', 'R']]],
                    [JSON.stringify(['d', 'Y']), ['d', ['Y', 'L']]],
                    [JSON.stringify(['e', 'Y']), ['e', ['Y', 'R']]],
                    [JSON.stringify(['e', '']), ['f', []]]
                ])
                setTable(transitionTable)
                break
        } 
        tape.style.display = "grid"
        input.style.display = "none"
        edit.style.display = "block"
        if(tr)
            auto = setTimeout(iter, delay)
        else
            setTimeout(transition, delay)
    })
}

document.getElementById("close").addEventListener('click', (e) => {
    e.preventDefault()
    e.stopImmediatePropagation()
    tape.style.display = "grid"
    input.style.display = "none"
    edit.style.display = "block"
    if(tr)
        auto = setTimeout(iter, delay)
    else
        setTimeout(transition, delay)
})

document.getElementById("showInput").addEventListener('click', (e) => {
    clearTimeout(auto)
    console.log("here")
    e.preventDefault()
    e.stopImmediatePropagation()
    tape.style.display = "none"
    input.style.display = "block"
    edit.style.display = "none"
})

document.getElementById('encode').addEventListener('click', (e) => {
    window.alert(JSON.stringify(Array.from(transitionTable.entries())))
})

document.getElementById('load').addEventListener('click', (e) => {
    transitionTable = new Map(JSON.parse(window.prompt('Enter map JSON')))
    setTable(transitionTable)
})
