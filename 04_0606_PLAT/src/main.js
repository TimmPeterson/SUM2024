import { Render } from "./rnd/rnd.js"
import { vec3 } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate } from "./mth/mat4.js"
import { Prim, vertex } from "./rnd/res/prim.js"
import { Figure } from "./plat/plat.js"

console.log("MAIN LOADED");

let rnd1, rnd2, rnd3, rnd4, rnd5;

function main() {

  let canvas1 = document.getElementById("myCan1");
  let canvas2 = document.getElementById("myCan2");
  let canvas3 = document.getElementById("myCan3");
  let canvas4 = document.getElementById("myCan4");
  let canvas5 = document.getElementById("myCan5");

  let x = vec3(1, 3, 5);
  let v = vec3(x);

  console.log(v);

  rnd1 = new Render(canvas1);
  rnd2 = new Render(canvas2);
  rnd3 = new Render(canvas3);
  rnd4 = new Render(canvas4);
  rnd5 = new Render(canvas5);

  /*
  let z = 0;
  let vertixes = [
    vertex(vec3(-1, -1, -1), vec3(0)), vertex(vec3(-1, 1, -1), vec3(0)), vertex(vec3(1, 1, -1), vec3(0)), vertex(vec3(1, -1, -1), vec3(0)),
    vertex(vec3(-1, -1, 1), vec3(0)), vertex(vec3(-1, 1, 1), vec3(0)), vertex(vec3(1, 1, 1), vec3(0)), vertex(vec3(1, -1, 1), vec3(0))
  ];
  let indicies = [0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 0, 1, 4, 1, 4, 5, 2, 6, 7, 2, 7, 3, 1, 5, 6, 1, 6, 2, 0, 4, 7, 0, 7, 3];
  */

  let vertexes = [
    vertex(vec3(-1, -1, 0), vec3(0, 0, 1)),
    vertex(vec3(-1, 1, 0), vec3(0, 0, 1)),
    vertex(vec3(1, 1, 0), vec3(0, 0, 1)),
    vertex(vec3(1, -1, 0), vec3(0, 0, 1))
  ]

  let indicies = [
    0, 1, 2, 2, 3, 0
  ]

  //let prim = new Prim(rnd1, vertexes, indicies);

  let fig = new Figure();
  let fig1 = new Figure();

  fig.setOctahedron();
  let prim1 = fig.makePrim(rnd1);
  fig1.setDodecahedron();
  let prim2 = fig1.makePrim(rnd2);
  fig.setIcohedron();
  let prim3 = fig.makePrim(rnd3);
  fig.setCube();
  let prim4 = fig.makePrim(rnd4);
  fig.setTetrahedron();
  let prim5 = fig.makePrim(rnd5);
  //let prim3 = fig.makePrim(rnd1);


  const draw = () => {
    // drawing

    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    rnd1.render();
    prim1.render(rnd1, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
    rnd2.render();
    prim2.render(rnd2, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -5))));//matrRotate(t, vec3(0, 1, 0)));
    rnd3.render();
    prim3.render(rnd3, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
    rnd4.render();
    prim4.render(rnd4, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
    rnd5.render();
    prim5.render(rnd5, matrRotate(6, vec3(0, 0, 1)).mul(matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, -0.3, -2.2)))));

    // animation register
    window.requestAnimationFrame(draw);
  };
  draw();
}

window.addEventListener("load", () => {
  main();
});