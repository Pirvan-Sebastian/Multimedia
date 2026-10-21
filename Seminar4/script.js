// 1. Model
let persoane = [
  { nume: "Popescu", prenume: "Ion", telefon: "023423222" },
  { nume: "Popescu", prenume: "Ion", telefon: "023423222" },
  { nume: "Vasilescu", prenume: "Maria", telefon: "073423222" },
];

const SERVER_URL = "https://ase.softmentor.ro/agenda";
let filtru = "";
let persoanaSelectata = null;

function getPersoaneFiltrate() {
  return persoane.filter(
    (p) =>
      !filtru ||
      p.nume.toLocaleLowerCase().includes(filtru.toLocaleLowerCase()) ||
      p.prenume.toLocaleLowerCase().includes(filtru.toLocaleLowerCase()) ||
      p.telefon.toLocaleLowerCase().includes(filtru.toLocaleLowerCase()),
  );
}

function esteAceeasi(p1, p2) {
  return (
    p1 != null &&
    p2 != null &&
    p1.nume == p2.nume &&
    p1.prenume == p2.prenume &&
    p1.telefon == p2.telefon
  );
}

// 2. Afisare
function afisare() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  for (const persoana of getPersoaneFiltrate()) {
    const rand = document.createElement("tr");
    tbody.append(rand);

    //verific ca au acelasi continut ce am selctat eu cu ce este in obiectul din tabel
    if (esteAceeasi(persoana, persoanaSelectata)) {
      rand.classList.add("selectat");
    }

    const adaugaCelula = (text) => {
      const celula = document.createElement("td");
      celula.innerText = text;
      celula.addEventListener("click", () => {
        persoanaSelectata=persoana;
        afisare();
      });
      rand.append(celula);
    };
    adaugaCelula(persoana.nume);
    adaugaCelula(persoana.prenume);
    adaugaCelula(persoana.telefon);
  }

  const footer = document.querySelector("tfoot td");
  footer.innerText = `Numar persoane: ${persoane.length}`;
}

// 3. Event Handlers
async function adauga() {
  const persoana = {
    nume: document.querySelector("#nume").value,
    prenume: document.querySelector("#prenume").value,
    telefon: document.querySelector("#telefon").value,
  };
  const raspuns = await fetch(SERVER_URL, {
    method: "POST",
    body: JSON.stringify(persoana),
  });

  if (raspuns.ok) {
    await update();
  } else {
    alert(
      `EROARE: ${raspuns.status} - ${raspuns.statusText}` +
        `${raspuns.headers.get("x-eroare")}`,
    );
  }
}

async function update() {
  const raspuns = await fetch(SERVER_URL);

  if (raspuns.ok) {
    persoane = await raspuns.json();
    afisare();
  } else {
    console.error(
      `EROARE: ${raspuns.status} - ${raspuns.statusText}` +
        `${raspuns.headers.get("x-eroare")}`,
    );
  }
}

// 4. Initializare

async function filter() {
  filtru = document.querySelector("#filtru").value;
}

async function aplicatie() {
  const buton = document.querySelector("#btnAdauga");
  buton.addEventListener("click", adauga);
  document.querySelector("#filtru").addEventListener("input", filter);
  afisare();

  await update();
  setInterval(update, 2000);
}

document.addEventListener("DOMContentLoaded", aplicatie);

//----- Comenzi Consola Tabla ----------------
// raspuns = await fetch("https://ase.softmentor.ro/agenda")
// console.log(raspuns.ok,raspuns.status,raspuns.statusText);
// console.log(raspuns.header.get('content-type'))

// console.table(await raspuns.json())

// raspuns=await fetch("https://ase.softmentor.ro/agenda",{method:'POST', body:JSON.stringify({})})
// console.log(raspuns.header.get('x-eroare'))

// setTimeout(function,time);
// setInterval(function,time);

//pot sa fac cu target pt event handler si sa iau cu closest linia pe care se afla datele, 
//construiesc un obiect cu cele 3 date si apoi fac cum faceam inainte sa vad unde cum se potrivesc si fac colorat
