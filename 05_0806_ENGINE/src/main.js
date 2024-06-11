import { Render } from "./rnd/rnd.js"
import { vec3 } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate, matrScale } from "./mth/mat4.js"
import { Prim, vertex } from "./rnd/res/prim.js"
import { Figure } from "./plat/plat.js"
import { Shader } from "./rnd/res/shd.js"
import { Timer } from "./timer/timer.js"
import { UniformBuffer } from "./rnd/res/buf.js"

console.log("MAIN LOADED");

let rnd1;

function main() {

  let canvases = [];
  let renders = [];
  let shaders = [];
  let prims = [];
  let UBOs = [];
  let figures = [];
  let rots = [];
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

  let a = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  for (let i = 0; i < 6; i++) {
    canvases[i] = document.getElementById(`myCan${i + 1}`);
    renders[i] = new Render(canvases[i]);
    shaders[i] = new Shader(renders[i], "default");
    prims[i] = figures[i].makePrim(shaders[i]);
    UBOs[i] = new UniformBuffer(renders[i], "u_testBlock", 64, i + 1);
    UBOs[i].update(new Float32Array(a));
    canvases[i].hm = Hammer(canvases[i]);
    canvases[i].hm.get("rotate").set({ enable: true });
  }

  // Timer creation
  let timer = new Timer();

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

    // timer reponse
    timer.response();

    let t = timer.getTime();

    // frame render
    for (let i = 0; i < 6; i++) {
      renders[i].renderStart();
      prims[i].render(scales[i].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[i].mul(matrTranslate(vec3(0, 0, -10))))));
      UBOs[i].apply(shaders[i]);
    }

    window.requestAnimationFrame(draw);
  };
  draw();
}

window.addEventListener("load", () => {
  main();
});