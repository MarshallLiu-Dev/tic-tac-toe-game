// Variáveis globais

const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

// posições possiveis para a vitoria
let positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
// Função inicial

function init() {
    selected = [];

    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;

    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}

init();

// informação do jogador

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player;
    e.target.removeEventListener("click", newMove);
    selected[index] = player;

    setTimeout(() => {
        check();
    }, [100]);

    player = player === "X" ? "O" : "X";
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

 // atualizando o jogador da vez

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

// atualizando o ultimo jogador

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

// verificando  itens selecionados  e vendo se a um  vencedor

    for (pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE!");
        init();
        return;
    }
}

//variáveis para controlar a pontuação de cada jogador e atualizá-las cada vez que um jogador ganhar uma partida.
let scoreX = 0;
let scoreO = 0;

function updateScore() {
    document.querySelector(".scoreX").innerHTML = `X: ${scoreX}`;
    document.querySelector(".scoreO").innerHTML = `O: ${scoreO}`;
}

function check() {
    let playerLastMove = player === "X" ? "O" : "X";

    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!");
            if (playerLastMove === "X") {
                scoreX++;
            } else {
                scoreO++;
            }
            updateScore();
            init();
            return;
        }
    }

    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE!");
        init();
        return;
    }
}

// ////botão de reiniciar

document.querySelector(".restart").addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    updateScore();
    init();
});
