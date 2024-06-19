import { Render } from "./rnd/rnd.js"
import { vec3 } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate, matrScale } from "./mth/mat4.js"
import { Figure } from "./plat/plat.js"
import { Lab, imgToContext2d } from "./gen/gen.js"
import { Control } from "./ctrl/ctrl.js"
import { wsInit, onInterval, getPlayers } from "./ws.js"


function main() {

  let figure = new Figure();
  figure.setDodecahedron();

  let canvas = document.getElementById("mainFrame");
  let render = new Render(canvas);
  wsInit(render);
  let shader = render.newShader("default");
  let material = shader.newMaterial(vec3(0.1), vec3(0, 0.5, 1.0), vec3(0.3), 90, 1.0);
  let material1 = shader.newMaterial(vec3(0.1), vec3(1, 0.5, 1.0), vec3(0.3), 90, 1.0);
  let prim = figure.makePrim(material);
  let tex = render.newTexture("./bin/textures/em.jpg");
  material1.attachTexture(tex, 0);
  material1.update();
  let lab = new Lab(material1, "./bin/maps/map.png");
  render.setCam(vec3(5, 5, 5), vec3(0), vec3(0, 1, 0));

  let pl_mtl = shader.newMaterial(vec3(0.1), vec3(1, .1, .1), vec3(0.3), 90, 1.0);
  let f = new Figure();
  f.setCube();
  let pl_pr = f.makePrim(pl_mtl);

  let canvasFlow = document.getElementById("flowFrame");
  let contextFlow = canvasFlow.getContext("2d");
  canvasFlow.addEventListener("click", (e) => {
    if (lab.image != null)
      imgToContext2d(canvasFlow, contextFlow, lab.image);
  });

  canvas.onclick = function () {
    canvas.requestPointerLock();
  }

  //let sky = render.newSkySphere("./bin/textures/space.png");
  //let sky = render.newSkySphere("./bin/textures/water.jpg");

  //window.addEventListener("keydown", (e) => {
  //  console.log("hi");
  //});


  const draw = () => {
    let p = getPlayers();

    render.renderStart();
    for (let player of p.players) {
      if (p.id != player.id)
        pl_pr.render(mat4(player.coords.trans).mul(matrTranslate(player.coords.pos)));
    }

    prim.render(matrRotate(render.timer.localTime, vec3(0, 1, 1)).mul(matrTranslate(vec3(0, 0, 0))));
    //sky.render(mat4(1));
    lab.render();
    window.requestAnimationFrame(draw);
  };
  draw();
}

window.onload = main;