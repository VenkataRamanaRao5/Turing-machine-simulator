let state
let index = 0
let delay = 400
let auto
let tran
let iiter = 0
let tr
let transitionTable = new Map()

let tape = document.getElementById('tape')
let head = document.getElementById('head')
const container = document.getElementById('container')
const input = document.getElementById('input')
const edit = document.getElementById('showInput')
const table = document.getElementById('table')
const tapeInput = document.getElementById('tapeInput')

/*const transitionTable = new Map([
    [JSON.stringify(['b', '']), ['o', 'e, R, e, R, 0, R, R, 0, L, L']],
    [JSON.stringify(['o', '1']), ['o', 'R, x, L, L, L']],
    [JSON.stringify(['o', '0']), ['q', '']],
    [JSON.stringify(['q', '0']), ['q', 'R, R']],
    [JSON.stringify(['q', '1']), ['q', 'R, R']],
    [JSON.stringify(['q', '']), ['p', '1, L']],
    [JSON.stringify(['p', 'x']), ['q', 'E, R']],
    [JSON.stringify(['p', 'e']), ['f', 'R']],
    [JSON.stringify(['p', '']), ['p', 'L, L']],
    [JSON.stringify(['f', '1']), ['f', 'R, R']],
    [JSON.stringify(['f', '0']), ['f', 'R, R']],
    [JSON.stringify(['f', '']), ['o', '0, L, L']],
])*/

/*const transitionTable = new Map([
    [JSON.stringify(['b', '']), ['b', ['0']]],
    [JSON.stringify(['b', '0']), ['b', ['R', 'R', '1']]],
    [JSON.stringify(['b', '1']), ['b', ['R', 'R', '0']]]
])*/


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
    if (square.firstElementChild.innerText != symbol) {

        let cont = tape.outerHTML
        square = document.getElementById(index)
        square.classList.remove('active')
        for (let i of tape.children)
            i.id = ''
        head.remove()
        tape.id = ''
        tape.classList.remove('current')
        container.innerHTML += cont
        tape = document.getElementById('tape')
        head = document.getElementById('head')
        square = document.getElementById(index)
        square.firstElementChild.innerText = symbol
    }
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
        case 'E':
            writeSymbol('')
            break
        default:
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
    if (container.style.display != "none") {
        if (auto) {
            clearTimeout(auto)
            auto = null
        }
        else
            auto = setTimeout(iter, delay)
    }
}
window.addEventListener('click', pausePlay)
window.addEventListener('keypress', pausePlay)
