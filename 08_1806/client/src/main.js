import { Render } from "./rnd/rnd.js"
import { vec3 } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate, matrScale } from "./mth/mat4.js"
import { Figure } from "./plat/plat.js"
import { Lab, imgToContext2d } from "./gen/gen.js"
import { Control } from "./ctrl/ctrl.js"

function main() {
  let figure = new Figure();
  figure.setDodecahedron();

  let canvas = document.getElementById("mainFrame");
  let render = new Render(canvas);
  let shader = render.newShader("default");
  let material = shader.newMaterial(vec3(0.1), vec3(0, 0.5, 1.0), vec3(0.3), 90, 1.0);
  let prim = figure.makePrim(material);

  let control = new Control(render);
  let lab = new Lab(material, "./bin/maps/map.png");
  render.setCam(vec3(5, 5, 5), vec3(0), vec3(0, 1, 0));

  let canvasFlow = document.getElementById("flowFrame");
  let contextFlow = canvasFlow.getContext("2d");
  canvasFlow.addEventListener("click", (e) => {
    if (lab.image != null)
      imgToContext2d(canvasFlow, contextFlow, lab.image);
  });

  canvas.onclick = function () {
    canvas.requestPointerLock();
  }

  //window.addEventListener("keydown", (e) => {
  //  console.log("hi");
  //});


  const draw = () => {
    render.renderStart();
    control.response();
    prim.render(matrRotate(render.timer.localTime, vec3(0, 1, 1)).mul(matrTranslate(vec3(0, 0, 0))));
    lab.render();
    window.requestAnimationFrame(draw);
  };
  draw();
}

window.onload = main;