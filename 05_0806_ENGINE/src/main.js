import { Render } from "./rnd/rnd.js"
import { vec3 } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate, matrScale } from "./mth/mat4.js"
import { Prim, vertex } from "./rnd/res/prim.js"
import { Figure } from "./plat/plat.js"
import { Shader } from "./rnd/res/shd.js"
import { Timer } from "./timer/timer.js"
import { UniformBuffer } from "./rnd/res/buf.js"
import { Material } from "./rnd/res/mtl.js"

function tpLog(text) {
  window.par.innerHTML += text + "<br />";
}

function main() {
  window.par = document.getElementById("p");
  console.log("MAIN LOADED");
  //tpLog("MAIN LOADED");

  let canvases = [];
  let renders = [];
  let shaders = [];
  let prims = [];
  let UBOs = [];
  let figures = [];
  let rots = [];
  let mtls = [];
  let scales =
    [
      matrScale(vec3(3)), matrScale(vec3(2.8)),
      matrScale(vec3(2.7)), matrScale(vec3(2.2)),
      matrScale(vec3(1.8)), matrScale(vec3(1))
    ];

  for (let i = 0; i < 6; i++)
    figures[i] = new Figure();
  figures[0].setTetrahedron();
  figures[1].setOctahedron();
  figures[2].setCube();
  figures[3].setIcohedron();
  figures[4].setDodecahedron();
  figures[5].setStar();

  let mtl_props = [
    [vec3(0.1), vec3(0, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90],
    [vec3(0.1), vec3(0, 0, 0.7), vec3(0.5, 0.5, 0.0), 40],
    [vec3(0.1), vec3(0.2, 0.5, 0.5), vec3(0.5, 0.5, 0.5), 40],
    [vec3(0.1), vec3(0.7, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90],
    [vec3(0.1), vec3(0.2, 0.2, 0.2), vec3(0.1, 0.1, 0.1), 15],
    [vec3(0.1), vec3(0.7, 0.7, 0), vec3(0.9, 0.9, 0.9), 90],
  ];

  try {
    for (let i = 0; i < 6; i++) {
      // Getting canvas from html
      canvases[i] = document.getElementById(`myCan${i + 1}`);

      // Initializing render object 
      renders[i] = new Render(canvases[i]);

      // Initializing shader for render object
      shaders[i] = new Shader(renders[i], "default");

      // Initializing material relaterd to shader
      mtls[i] = new Material(shaders[i], ...mtl_props[i]);

      // Creating primitive using material
      prims[i] = figures[i].makePrim(mtls[i]);

      // Initializing Hammer on canvas
      canvases[i].hm = Hammer(canvases[i]);
      canvases[i].hm.get("rotate").set({ enable: true });
    }
  } catch (err) {
    tpLog(`${err.name} : ${err.message}`);
  }

  // Timer creation
  let timer = new Timer();

  // Test material and primitive 
  let mtl = new Material(shaders[3], ...mtl_props[0]);
  let f = new Figure();
  f.setDodecahedron();
  let test_pr = f.makePrim(mtl);

  //////////////////////////////
  // Mouse event handlers setting
  //////////////////////////////
  let rotSpeed = 0.01;
  for (let i = 0; i < 6; i++) {
    rots[i] = mat4(1);

    let f1 = e => {
      rots[i] = rots[i].mul(matrRotate(rotSpeed * e.movementX, vec3(0, 1, 0)));
      rots[i] = rots[i].mul(matrRotate(rotSpeed * e.movementY, vec3(1, 0, 0)));
    };
    let f2 = e => {
      if (e.deltaY > 0)
        scales[i] = scales[i].mul(matrScale(vec3(0.9)));
      else
        scales[i] = scales[i].mul(matrScale(vec3(1.1)));
    };

    let d, old = 0;
    let f3 = e => {
      d = e.angle - old;
      old = e.angle;
      rots[i] = rots[i].mul(matrRotate(d, vec3(0, 0, 1)));
    };
    let f4 = e => {
      rots[i] = rots[i].mul(matrRotate(0.1 * e.velocityX, vec3(0, 1, 0)));
      rots[i] = rots[i].mul(matrRotate(0.1 * e.velocityY, vec3(1, 0, 0)));
    };

    //canvases[i].addEventListener("mousemove", f1);
    canvases[i].addEventListener("wheel", f2);
    canvases[i].hm.on("rotate", f3);
    canvases[i].hm.on("pan", f4);
  }

  // Each frame rendering function declaration
  const draw = () => {

    // Timer reponse
    timer.response();

    let t = timer.getTime();

    // Frame render
    try {
      for (let i = 0; i < 6; i++) {
        // 
        renders[i].renderStart();
        if (i == 3) // Test primitive render
          test_pr.render(scales[i].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[i].mul(matrTranslate(vec3(2, 2, -10))))));

        // Rendering [i] primitive
        prims[i].render(scales[i].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[i].mul(matrTranslate(vec3(0, 0, -10))))));
      }
    } catch (err) {
      tpLog(`${err.name} : ${err.message}`);
    }

    window.requestAnimationFrame(draw);
  };
  draw();
}

window.addEventListener("load", () => {
  main();
});