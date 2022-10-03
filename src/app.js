/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
let palos = ["♦", "♥", "♠", "♣"];
// let numeros = ["A", 2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K"];
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let arrayNumeroCartas = [];
let sortedArray = [];

window.onload = function() {
  //write your code here
  // generateCard();
  document.getElementById("botonCarta").onclick = generateCards;
  document.getElementById("botonSort").onclick = sortedCards;
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

  let color = paloGenerado === "♥" || paloGenerado === "♦" ? "text-danger" : "";
  // console.log(color);
  cartaGenerada.innerHTML += `
  <div id="cartaDiv" class="cartas col bg-light rounded p-3 border text-center">
    <div id="paloColorUno" class="paloUno fs-1 d-flex justify-content-start ${color}">${paloGenerado}</div>
    <div class="numero fs-1 d-flex justify-content-center text-dark">${numeroGenerado}</div>
    <div id="paloColorDos" class="paloDos fs-1 d-flex justify-content-end ${color}" >${paloGenerado}</div>
  </div>`;

  // if (paloGenerado == "♥" && paloGenerado == "♦") {
  //   document.getElementById("paloColorUno").classList.add("text-danger");
  //   document.getElementById("paloColorDos").classList.add("text-danger");
  // } else {
  //   document.getElementById("paloColorUno").classList.remove("text-danger");
  //   document.getElementById("paloColorDos").classList.remove("text-danger");
  // }

  return [numeroGenerado, paloGenerado];
}
//Generas las cartas
function generateCards() {
  arrayNumeroCartas = [];
  let valoresCarta;
  let cartasInput = document.querySelector("input"); // cartasInput viene del input, segun lo ingresado
  document.getElementById("bodyCards").innerHTML = "";

  //Opcional para borrar input
  // if (!cartasInput.value == "") {
  //   arrayNumeroCartas = [];
  //   document.getElementById("bodyCards").innerHTML = "";
  // }

  for (let i = 0; i < cartasInput.value; i++) {
    valoresCarta = generateCard();
    console.log(valoresCarta);
    arrayNumeroCartas.push(valoresCarta);
  }
  console.log(arrayNumeroCartas);
  // Esto no me gusta
  // cartasInput.value = "";
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

//"Sortea" las cartas
const bubbleSort = arr => {
  let wall = arr.length - 1; //iniciamos el wall o muro al final del array
  while (wall > 0) {
    let index = 0;
    while (index < wall) {
      //comparar las posiciones adyacentes, si la correcta es más grande, tenemos que intercambiar
      if (arr[index][0] > arr[index + 1][0]) {
        let aux = arr[index];
        arr[index] = arr[index + 1];
        arr[index + 1] = aux;
      }
      index++;
    }
    wall--; //disminuir la pared para optimizar
  }
  return arr;
};

function sortedCards() {
  // console.log(arrayNumeroCartas);
  sortedArray = bubbleSort(arrayNumeroCartas);
  let cartaGenerada = document.querySelector(".row");
  document.getElementById("bodyCards").innerHTML = "";
  for (let i = 0; i < sortedArray.length; i++) {
    let color =
      sortedArray[i][1] === "♥" || sortedArray[i][1] === "♦"
        ? "text-danger"
        : "";
    cartaGenerada.innerHTML += `
    <div class="cartas col bg-light text-dark rounded p-3 border text-center">
      <div id="paloColorUno" class="paloUno fs-1 d-flex justify-content-start ${color}">${sortedArray[i][1]}</div>
      <div class="numero fs-1 d-flex justify-content-center text-dark">${sortedArray[i][0]}</div>
      <div id="paloColorDos" class="paloDos fs-1 d-flex justify-content-end ${color}">${sortedArray[i][1]}</div>
    </div>`;
  }
  console.log(sortedArray);
  sortedArray = [];
}
