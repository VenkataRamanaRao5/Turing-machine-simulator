
let state
let index = 0
let delay = 400
let auto
let tran
let iiter = 0
let tr
let dupOnStateChange = false
let dupOnTapeChange = false
let transitionTable = new Map()
let abbreviatedTable = new Map()
let symbolTable = new Map()

let tape = document.getElementById('tape')
let head = document.getElementById('head')
const outer = document.getElementById('container')
const input = document.getElementById('input')
const edit = document.getElementById('showInput')
const table = document.getElementById('table')
const vars = document.getElementById('vars')
const tapeInput = document.getElementById('tapeInput')

/*const transitionTable = new Map([
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
*/

function duplicateTape() {
    console.log("Here")
    let cont = tape.outerHTML
    square = document.getElementById(index)
    square.classList.remove('active')
    for (let i of tape.children)
        i.removeAttribute('id')
    head.removeAttribute('id')
    tape.removeAttribute('id')
    tape.classList.remove('current')
    outer.innerHTML += cont
    tape = document.getElementById('tape')
    head = document.getElementById('head')
    tape.scrollIntoView()
}

function updateHead(from, to, text) {
    let f = document.getElementById(from)
    f.classList.remove('active')
    f.lastElementChild.remove()
    head.innerText = text
    let t = document.getElementById(to)
    if (!t) {
        if (to > 0)
            tape.innerHTML += `<span id=${to} class=square><span class=symbol></span></span>`
        else
            tape.innerHTML = `<span id=${to} class=square><span class=symbol></span></span>` + tape.innerHTML
        t = document.getElementById(to)
    }
    t.classList.add('active')
    t.appendChild(head)
}

function writeSymbol(symbol) {
    square = document.getElementById(index)
    square.firstElementChild.innerText = symbol
}

function transition() {
    square = document.getElementById(index)
    iiter = 0
    tr = transitionTable.get(JSON.stringify([state, square.firstElementChild.innerText]))
    if (tr) {
        if (tr[1].length == 0) {
            state = tr[0]
            updateHead(index, index, state)
            tran = setTimeout(transition, delay)
        }
        else {
            auto = setTimeout(iter, delay)
        }
    }
    else {
        window.alert("Transition End!")
    }
}

function iter() {
    if (iiter == tr[1].length - 1) {
        if (dupOnStateChange && state != tr[0])
            duplicateTape()
        state = tr[0]
    }
    switch (tr[1][iiter]) {
        case 'L':
            index--
            updateHead(index + 1, index, state)
            break
        case 'R':
            index++
            updateHead(index - 1, index, state)
            break
        case 'E': case 'B':
            if (dupOnTapeChange && document.getElementById(index).firstElementChild.innerText != '')
                duplicateTape()
            writeSymbol('')
            break
        default:
            if (dupOnTapeChange && document.getElementById(index).firstElementChild.innerText != tr[1][iiter])
                duplicateTape()
            writeSymbol(tr[1][iiter])
    }
    if (iiter == tr[1].length - 1)
        tran = setTimeout(transition, delay)
    else {
        iiter++
        auto = setTimeout(iter, delay)
    }
}

function pausePlay(e) {
    console.log(e.target)

    if (Array(document.body, outer, tape).includes(e.target) && outer.style.display != "none") {
        if (auto) {
            clearTimeout(auto)
            auto = null
        }
        else
            auto = setTimeout(iter, delay)
    }
}
document.body.addEventListener('click', pausePlay)
document.body.addEventListener('keypress', pausePlay)

window.addEventListener('beforeunload', (e) => {
    e.preventDefault()
    sessionStorage.setItem('TMtransition', JSON.stringify(Array.from(transitionTable.entries())))
})

window.addEventListener('load', (e) => {
    if (sessionStorage.getItem('TMtransition')) {
        transitionTable = new Map(JSON.parse(sessionStorage.getItem('TMtransition')))
        setTable(transitionTable)
    }
})
