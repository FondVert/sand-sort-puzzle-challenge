const first = [
    [0, 1, 2 ,1],
    [0, 4, 1 ,2],
    [0, 2, 3, 4],
    [0, 3, 4, 3],
]
var code
var timer
var passes = 0

function _gen() {
    let success = 0
    for (const a of game) {
        if(a[1] == a[2] && a[1] == a[3]) {
            success++
        }
    }

    let tmp = ""
    for (let i = 0; i < game.length; i++) {
        tmp+="<ul>"
        for (const a of game[i]) {
            tmp+=`<li class="c${a}"></li>`
        }
        tmp+="</ul>"
    }

    document.getElementById("game").innerHTML = tmp
    document.getElementById("counter").innerText = `Passes: ${passes}`

    if(success == game.length) {
        _stop()
        alert(`WON IN ${passes} PASSES`)
    }
}

var game = JSON.parse(JSON.stringify(first))
_gen()

function _run() {
    try {
        eval(code)
    } catch {
        _stop()
        alert('ERROR, CHECK YOUR CODE')
    }
}

function _play() {
    _reset()
    passes = 0
    code = document.getElementById('input').value
    timer = setInterval(_run, 1000);
}

function _stop() {
    try {
        clearInterval(timer)
    } catch {
        null
    }
}

function _reset() {
    _stop()
    passes = 0
    game = JSON.parse(JSON.stringify(first))
    _gen()

}

function move(from, to) {
    let fromColor = 0
    let tmpA = 0
    for (const a of game[from]) {
        tmpA++
        if(a != 0) {
            fromColor = a
            tmpA--
            break
        }
    }
    let tmpB = 0
    if(game[to][0] == 0) {
        for (const a of game[to]) {
            if(a != 0 || a == undefined) {
                tmpB--
                break
            }
            tmpB++
        }
        game[to][tmpB] = fromColor
        game[from][tmpA] = 0
        passes++
        _gen()
    }
}