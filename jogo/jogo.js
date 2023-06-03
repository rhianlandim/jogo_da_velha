const jogadorAtual = document.querySelector(".jogadorAtual");
const resultado = document.querySelector(".resultado");

let escolhido;
let jogador = "X";

let trincas = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function inicia() {
  escolhido = [];
  jogadorAtual.innerHTML = `"${jogador}" COMEÇA! `;

  document.querySelectorAll(".jogo button").forEach((quadrado) => {
    quadrado.innerHTML = "";
    quadrado.addEventListener("click", marcar);
  });
}

inicia();

function marcar(quadrado) {
  const index = quadrado.target.getAttribute("data-index");
  quadrado.target.innerHTML = jogador;
  resultado.innerHTML= "RESULTADO: ";
  quadrado.target.removeEventListener("click", marcar);
  escolhido[index] = jogador;

  setTimeout(() => {
    checar();
  }, [100]);

  jogador = jogador === "X" ? "O" : "X";
  jogadorAtual.innerHTML = `JOGADOR DA VEZ: ${jogador}`;
}

function checar() {
  let ultimaJogada = jogador === "X" ? "O" : "X";

  const quadrados = escolhido
    .map((quadrado, index) => [quadrado, index])
    .filter((quadrado) => quadrado[0] === ultimaJogada)
    .map((quadrado) => quadrado[1]);

  for (let trinca of trincas) {
    if (trinca.every((quadrado) => quadrados.includes(quadrado))) {
      resultado.innerHTML = `RESULTADO: "${ultimaJogada}" VENCEU!`;

      setTimeout(() => {
        inicia();
      }, [2000]);
      return;
    }
  }

  if (escolhido.filter((quadrado) => quadrado).length === 9) {
    resultado.innerHTML= "RESULTADO: EMPATE!";
    
    setTimeout(() => {
      inicia();
    }, [2000]);
  }
}
