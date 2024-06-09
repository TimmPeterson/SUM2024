import { Render } from "./rnd/rnd.js"
import { vec3 } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate, matrScale } from "./mth/mat4.js"
import { Prim, vertex } from "./rnd/res/prim.js"
import { Figure } from "./plat/plat.js"

console.log("MAIN LOADED");

let rnd1, rnd2, rnd3, rnd4, rnd5, rnd6;

function main() {

  let canvas1 = document.getElementById("myCan1");
  let canvas2 = document.getElementById("myCan2");
  let canvas3 = document.getElementById("myCan3");
  let canvas4 = document.getElementById("myCan4");
  let canvas5 = document.getElementById("myCan5");
  let canvas6 = document.getElementById("myCan6");

  canvas1.addEventListener("mousemove", onClick1);
  canvas2.addEventListener("mousemove", onClick2);
  canvas3.addEventListener("mousemove", onClick3);
  canvas4.addEventListener("mousemove", onClick4);
  canvas5.addEventListener("mousemove", onClick5);
  canvas6.addEventListener("mousemove", onClick6);
  canvas1.addEventListener("wheel", onScroll);
  canvas2.addEventListener("wheel", onScroll);
  canvas3.addEventListener("wheel", onScroll);
  canvas4.addEventListener("wheel", onScroll);
  canvas5.addEventListener("wheel", onScroll);
  canvas6.addEventListener("wheel", onScroll);
  
  let x = vec3(1, 3, 5);
  let v = vec3(x);

  console.log(v);

  rnd1 = new Render(canvas1);
  rnd2 = new Render(canvas2);
  rnd3 = new Render(canvas3);
  rnd4 = new Render(canvas4);
  rnd5 = new Render(canvas5);
  rnd6 = new Render(canvas6);

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
  fig.setStar();
  //fig.setCube();
  let prim4 = fig.makePrim(rnd4);
  fig.setTetrahedron();
  let prim5 = fig.makePrim(rnd5);
  //let prim3 = fig.makePrim(rnd1);
  fig.setCube();
  let prim6 = fig.makePrim(rnd6);

  const draw = () => {
    // drawing

    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    rnd1.renderStart();
    prim1.render(rnd1, matrRotate(t, vec3(0, 1, 0)).mul(rot1.mul(matrTranslate(vec3(0, 0, -3)))));//matrRotate(t, vec3(0, 1, 0)));
    rnd2.renderStart();
    prim2.render(rnd2, matrRotate(t, vec3(0, 1, 0)).mul(rot2.mul(matrTranslate(vec3(0, 0, -5)))));//matrRotate(t, vec3(0, 1, 0)));
    rnd3.renderStart();
    prim3.render(rnd3, matrRotate(t, vec3(0, 1, 0)).mul(rot3.mul(matrTranslate(vec3(0, 0, -3)))));//matrRotate(t, vec3(0, 1, 0)));
    rnd4.renderStart();
    prim4.render(rnd4, matrScale(vec3(0.3)).mul(matrRotate(t, vec3(0, 1, 0)).mul(rot4.mul(matrTranslate(vec3(0, 0, -3))))));//matrRotate(t, vec3(0, 1, 0)));
    rnd5.renderStart();
    prim5.render(rnd5, matrRotate(t, vec3(0, 1, 0)).mul(matrRotate(6, vec3(0, 0, 1)).mul(rot5).mul(matrTranslate(vec3(0, -0.3, -2.2)))));
    rnd6.renderStart();
    prim6.render(rnd6, matrRotate(t, vec3(0, 1, 0)).mul(rot6.mul(matrTranslate(vec3(0, 0, -3)))));//matrRotate(t, vec3(0, 1, 0)));
/*    
    rnd1.renderStart();
    prim1.render(rnd1, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
    rnd2.renderStart();
    prim2.render(rnd2, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -5))));//matrRotate(t, vec3(0, 1, 0)));
    rnd3.renderStart();
    prim3.render(rnd3, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
    rnd4.renderStart();
    prim4.render(rnd4, matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
    rnd5.renderStart();
    prim5.render(rnd5, matrRotate(6, vec3(0, 0, 1)).mul(matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, -0.3, -2.2)))));
*/
    // animation register
    window.requestAnimationFrame(draw);
  };
  draw();
}

let rot1 = mat4(1), rot2 = mat4(1), rot3 = mat4(1), rot4 = mat4(1), rot5 = mat4(1), rot6 = mat4(1);
let rotSpeed = 0.008;

function onClick1(e) {
  e.preventDefault();
  if (e.buttons != 1)
    return;
  rot1 = rot1.mul(matrRotate(e.movementX * rotSpeed, vec3(0, 1, 0)));
  rot1 = rot1.mul(matrRotate(e.movementY * rotSpeed, vec3(1, 0, 0)));
}
function onClick2(e) {
  e.preventDefault();
  if (e.buttons != 1)
    return;
  rot2 = rot2.mul(matrRotate(e.movementX * rotSpeed, vec3(0, 1, 0)));
  rot2 = rot2.mul(matrRotate(e.movementY * rotSpeed, vec3(1, 0, 0)));
}
function onClick3(e) {
  e.preventDefault();
  if (e.buttons != 1)
    return;
  rot3 = rot3.mul(matrRotate(e.movementX * rotSpeed, vec3(0, 1, 0)));
  rot3 = rot3.mul(matrRotate(e.movementY * rotSpeed, vec3(1, 0, 0)));
}
function onClick4(e) {
  e.preventDefault();
  if (e.buttons != 1)
    return;
  rot4 = rot4.mul(matrRotate(e.movementX * rotSpeed, vec3(0, 1, 0)));
  rot4 = rot4.mul(matrRotate(e.movementY * rotSpeed, vec3(1, 0, 0)));
}
function onClick5(e) {
  e.preventDefault();
  if (e.buttons != 1)
    return;
  rot5 = rot5.mul(matrRotate(e.movementX * rotSpeed, vec3(0, 1, 0)));
  rot5 = rot5.mul(matrRotate(e.movementY * rotSpeed, vec3(1, 0, 0)));
}
function onClick6(e) {
  e.preventDefault();
  if (e.buttons != 1)
    return;
  rot6 = rot6.mul(matrRotate(e.movementX * rotSpeed, vec3(0, 1, 0)));
  rot6 = rot6.mul(matrRotate(e.movementY * rotSpeed, vec3(1, 0, 0)));
}

function onScroll(e) {
  e.preventDefault();
}

window.addEventListener("load", () => {
  main();
});