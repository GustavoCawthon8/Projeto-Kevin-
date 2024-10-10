const timer = document.getElementById("timer");
const btn_iniciar = document.getElementById("btn_iniciar");
const btn_reiniciar = document.getElementById("btn_reiniciar");
const btn_parcial = document.getElementById("btn_parcial");
const parceais = document.getElementById("parceais");
let intervalo = null;
let tmpini = null;


const salvarEstado = () => {
  localStorage.setItem("tmpini", tmpini);
  localStorage.setItem("parciais", parceais.innerHTML);
};


const contador = () => {
  const tempoAtual = Date.now();
  let seg = (tempoAtual - tmpini) / 1000;
  timer.innerHTML = convertor(seg);
  salvarEstado();
};


const convertor = (seg) => {
  let hora = Math.floor(seg / 3600);
  let resto = seg % 3600;
  let minutos = Math.floor(resto / 60);
  let segundos = Math.floor(seg % 60);
  let form =
    (hora < 10 ? "0" + hora : hora) + ":" +
    (minutos < 10 ? "0" + minutos : minutos) + ":" +
    (segundos < 10 ? "0" + segundos : segundos);

  return form;
};


btn_iniciar.addEventListener("click", () => {
  tmpini = Date.now();
  localStorage.setItem("tmpini", tmpini);
  intervalo = setInterval(contador, 1000);
});


btn_reiniciar.addEventListener("click", () => {
  clearInterval(intervalo);
  localStorage.clear();
  location.reload();
});


btn_parcial.addEventListener("click", () => {
  let parcial = "<div>" + timer.innerHTML + "</div>";
  parceais.innerHTML += parcial;
  salvarEstado();
});

window.addEventListener("load", () => {
  const tmpiniSalvo = localStorage.getItem("tmpini");
  const parciaisSalvas = localStorage.getItem("parciais");

  if (tmpiniSalvo) {
    tmpini = parseInt(tmpiniSalvo);
    intervalo = setInterval(contador, 1000);
  }

  if (parciaisSalvas) {
    parceais.innerHTML = parciaisSalvas;
  }
});