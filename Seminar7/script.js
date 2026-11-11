let image, canvas, width, height, context;
let mouseX = 0,
  mouseY = 0;

function afisare() {
  context.drawImage(image, 0, 0);

  context.fillStyle = "red";
  context.font = "bold 24pt Tahoma";
  context.fillText(`${mouseX},${mouseY}`, 10, 30);

  const imageData = context.getImageData(0, 0, width, height);
  const v = imageData.data;

  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const i = y * width * 4 + x * 4;
      v[i + 2] = 255;

      if (x == mouseX || y == mouseY) v[i] = 255;
      
      //calculez distanta intre 2 puncte -- x un punct oricare din canvas si mx care e unde e mouse-ul
      let d = (x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY);
      d = Math.sqrt(d);

      if (d < 100) {
        //in cerc
        v[i + 3] = 230 - d;
      } else {
        v[i] = v[i + 1] = v[i + 2] = (v[i] + v[i + 1] + v[i + 2]) / 3;
        v[i + 3] = 10 + Math.random() * 180;
      }

    }
  context.putImageData(imageData, 0, 0);
}

function miscareMouse(e) {
  mouseX = Math.round(e.x - canvas.getBoundingClientRect().x);
  mouseY = Math.round(e.y - canvas.getBoundingClientRect().y);
}

function aplicatie() {
  canvas = document.querySelector("canvas");
  width = canvas.width;
  height = canvas.height;

  canvas.addEventListener("mousemove", miscareMouse);

  context = canvas.getContext("2d");
  image = document.createElement("img");
  image.src = "./assets/penguins.jpg";
  image.addEventListener("load", (e) => {
    setInterval(afisare, 33);
  });
}

document.addEventListener("DOMContentLoaded", aplicatie);

//--------------NOTITE------------------------------------------------
//Raster=matrice de culori,pixeli adica siasa sunt facute imaginile!
//Matrice Liniarizabila=MAtrice pe care o pot scrie sub forma de linie!
//[A,B,C]
//[D,E,F] -- <=>[A,B,C,D,E,F] pe linie si [A,D,B,E,C,F] pe coloane! YEY!

//ca ceva sa fie gri trebuie sa fac media aritmetica intre R G B
//+2 motifica blue ca +0 e rosu, +1green si +2blue din RGB SI +3 opacitate! --ca in CSS
