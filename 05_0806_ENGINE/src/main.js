import { Render } from "./rnd/rnd.js"
import { vec3 } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate } from "./mth/mat4.js"
import { Prim, vertex } from "./rnd/res/prim.js"
import { Figure } from "./plat/plat.js"
import { Shader } from "./rnd/res/shd.js"

console.log("MAIN LOADED");

let rnd1, rnd2, rnd3, rnd4, rnd5;

function main() {

  let canvas1 = document.getElementById("myCan1");

  let x = vec3(1, 3, 5);
  let v = vec3(x);

  console.log(v);

  rnd1 = new Render(canvas1);

  let shd = new Shader(rnd1, "default");
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

  fig.setDodecahedron();
  let prim1 = fig.makePrim(shd);

  const draw = () => {
    // drawing

    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    rnd1.renderStart();
    prim1.render(matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -3))));//matrRotate(t, vec3(0, 1, 0)));
    // animation register
    window.requestAnimationFrame(draw);
  };
  draw();
}

window.addEventListener("load", () => {
  main();
});