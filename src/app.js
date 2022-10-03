/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
let palos = ["♦", "♥", "♠", "♣"];
// let numeros = ["A", 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K"];
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let arrayNumeroCartas = [];

window.onload = function() {
  //write your code here
  // generateCard();
  document.getElementById("botonCarta").onclick = generarCartas;
  document.getElementById("botonSort").onclick = bubbleSort;
  document.getElementById("botonClear").onclick = clearCards;
};

function clearCards() {
  document.getElementById("bodyCards").innerHTML = "";
}
//Generate random card
function generateCard() {
  let paloRandom = Math.floor(Math.random() * palos.length);
  let numeroRandom = Math.floor(Math.random() * numeros.length);
  let paloGenerado = palos[paloRandom];
  let numeroGenerado = numeros[numeroRandom];
  let cartaGenerada = document.querySelector(".row");

  cartaGenerada.innerHTML += `
  <div id="cartaDiv" class="cartas col bg-light text-dark rounded p-3 border text-center">
    <div id="paloColorUno" class="paloUno fs-1 d-flex justify-content-start">${paloGenerado}</div>
    <div class="numero fs-1 d-flex justify-content-center">${numeroGenerado}</div>
    <div id="paloColorDos" class="paloDos fs-1 d-flex justify-content-end">${paloGenerado}</div>
  </div>`;

  if (paloGenerado == "♥" && paloGenerado == "♦") {
    document.getElementById("paloColorUno").classList.add("text-danger");
    document.getElementById("paloColorDos").classList.add("text-danger");
  } else {
    document.getElementById("paloColorUno").classList.remove("text-danger");
    document.getElementById("paloColorDos").classList.remove("text-danger");
  }

  return [paloGenerado, numeroGenerado];
}
//Generas las cartas
function generarCartas() {
  arrayNumeroCartas = new Array();
  let valoresCarta;
  let cartasInput = document.querySelector("input").value; // numeroCartas viene del input, segun lo ingresado
  if (cartasInput >= "21") {
    document.getElementById("bodyCards").innerHTML = "";
  }
  for (let i = 0; i < cartasInput; i++) {
    valoresCarta = generateCard();
    arrayNumeroCartas.push(valoresCarta);
  }

  return arrayNumeroCartas;
}
//Limitar input
let inputLimit = document.getElementById("input");
inputLimit.addEventListener("input", function() {
  if (parseInt(inputLimit.value) < 1) {
    inputLimit.value = "1";
  } else if (parseInt(inputLimit.value) > 21) {
    inputLimit.value = "21";
  }
});

//Sorta las cartas
const bubbleSort = arr => {
  let wall = arrayNumeroCartas.length - 1; //iniciamos el wall o muro al final del arrayNumeroCartasay
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //comparar las posiciones adyacentes, si la correcta es más grande, tenemos que intercambiar
      if (arrayNumeroCartas[index] > arrayNumeroCartas[index + 1]) {
        let aux = arrayNumeroCartas[index];
        arrayNumeroCartas[index] = arrayNumeroCartas[index + 1];
        arrayNumeroCartas[index + 1] = aux;
      }
      index++;
    }
    wall--; //disminuir la pared para optimizar
  }
  console.log(arrayNumeroCartas);
  let cartaGenerada = document.querySelector(".row");
  document.getElementById("bodyCards").innerHTML = "";
  for (let i = 0; i < arrayNumeroCartas.length; i++) {
    cartaGenerada.innerHTML += `
    <div class="cartas col bg-light text-dark rounded p-3 border text-center">
      <div id="paloColorUno" class="paloUno fs-1 d-flex justify-content-start">${arrayNumeroCartas[i].paloGenerado}</div>
      <div class="numero fs-1 d-flex justify-content-center">${arrayNumeroCartas[i].numeroGenerado}</div>
      <div id="paloColorDos" class="paloDos fs-1 d-flex justify-content-end">${arrayNumeroCartas[i].paloGenerado}</div>
    </div>`;
  }
  return arrayNumeroCartas;
};
