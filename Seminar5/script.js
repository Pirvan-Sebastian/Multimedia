//1. Model
const culoare = { h: 240, s: 100, l: 50 };
//H in HSL la culori este un cerc si am 360 de grade de culaore cu R=0, G=120, B=240
//S/L are 0-100 ca si procent

function textHsl(h, s, l) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

//2.Afisare
function afisare() {
  const proba = document.querySelector("#proba");
  const text = textHsl(culoare.h, culoare.s, culoare.l);
  proba.style.backgroundColor = text;

  for (let coordonata in culoare) {
    document.querySelector(`#${coordonata}`).value = culoare[coordonata];
    document.querySelector(`#v${coordonata}`).innerText = culoare[coordonata];
  }

  banda("h", 360, 360 / 20, (value) => textHsl(value, 100, 50));
  banda("s", 100, 100 / 20, (value) => textHsl(culoare.h, value, culoare.l));
  banda("l", 100, 100 / 20, (value) => textHsl(culoare.h, culoare.s, value));

  document.querySelector("#txtHsl").innerText = text;
  document.querySelector("#txtRgb").innerText =
    getComputedStyle(proba).backgroundColor;
  //getComputedStyle(x) imi returneaza un obiect cu style ul lui x si pot .propietatiCSS prin el!!!
}
//coordonata este h,s,l 
function banda(coordonata, maxim, pas, functie) {
  const banda = document.querySelector(`#banda${coordonata}`);
  //#bandah,bandas,bandal si le interpolez ca sa le creezautomat cu id ul care e fie h,s,l
  banda.innerHTML = "";
  //value pana la maximulacelei intrari, apoi +pas ca sa merg cu pasul
  for (let value = 0; value <= maxim; value += pas) {
    const patrat = document.createElement("div");
    patrat.classList.add("patrat");
    patrat.style.backgroundColor = functie(value);
    patrat.dataset.coordonata = coordonata;
    patrat.dataset.value = value;
    banda.append(patrat);
  }
}
//3.Event Handlers
function schimbareInput(e) {
  const input = e.target;
  culoare[input.id] = Number(input.value);
  afisare();
}

function clickPatrat(e) {
  const patrat = e.target.closest('.patrat');

  if (!patrat) return;
  //dataset sunt atribute custom cu data-coordonata
  culoare[patrat.dataset.coordonata] = Number(patrat.dataset.value);
  afisare();
}
//4.Initializare
function aplicatie() {
  for (let input of document.querySelectorAll('input[type="range"]')) {
    input.addEventListener("input", schimbareInput); //eventul input adica modific ce fac pe acolo
  }
  document.querySelector("#benzi").addEventListener("click", clickPatrat);
  afisare();
}

document.addEventListener("DOMContentLoaded", aplicatie);
