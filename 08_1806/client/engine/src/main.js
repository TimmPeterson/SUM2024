import { Render } from "./rnd/rnd.js";
import { vec3 } from "./mth/vec3.js";
import { mat4, matrRotate, matrTranslate, matrScale } from "./mth/mat4.js";
import { Figure } from "./plat/plat.js";
import { Room, imgToContext2d } from "./gen/gen.js";
import { Control } from "./ctrl/ctrl.js";
import { wsInit, onInterval, getPlayers } from "./ws.js";
import { Labirint } from "./gen/lab.js";
import { shaderUpdateInit } from "./shd_upd.js";

function main() {
  let figure = new Figure();
  figure.setDodecahedron();

  let canvas = document.getElementById("mainFrame");
  let render = new Render(canvas);
  wsInit(render);
  let shader = render.newShader("default");
  //shader.update(src, "frag");
  shaderUpdateInit(shader);
  /*let material = shader.newMaterial(
    vec3(0.1),
    vec3(0, 0.5, 1.0),
    vec3(0.3),
    90,
    1.0
  );*/
  /*
  let material1 = shader.newMaterial(
    vec3(0.1),
    vec3(1, 0.5, 1.0),
    vec3(0.3),
    90,
    0.5
  );
  let prim = figure.makePrim(material);
  material1.attachTexture(tex, 0);
  material1.update();
  */
  let tex = render.newTexture("./bin/textures/em.jpg");
  render.setCam(vec3(5, 5, 5), vec3(0), vec3(0, 1, 0));
  let lab = new Labirint(render, "./bin/labs/def.png");
  let pl_mtl = shader.newMaterial(
    vec3(0.1),
    vec3(1, 0.1, 0.1),
    vec3(0.3),
    90,
    1.0
  );
  pl_mtl.attachTexture(tex, 0);
  pl_mtl.update();
  let f = new Figure();
  f.setCube();
  let pl_pr = f.makePrim(pl_mtl);

  /*
    let canvasFlow = document.getElementById("flowFrame");
  let contextFlow = canvasFlow.getContext("2d");
  canvasFlow.addEventListener("click", (e) => {
    if (lab.image != null) {
      let fracw = Math.floor(contextFlow.width / lab.image.bitmap.width);
      let frach = Math.floor(contextFlow.height / lab.image.bitmap.height);

      lab.image.setPixelColor("#FFFFFF", e.offsetX / fracw, e.offsetY / frach);
      imgToContext2d(canvasFlow, contextFlow, lab.image);
    }
  });
  */

  canvas.onclick = function () {
    $("#textArea").slideUp();
    $('#apply').slideUp();
    $('#mainFrame').css({ 'width': '100vw' });
    canvas.requestPointerLock();
  };

  // window.addEventListener("dblclick", e => {
  //   if (e.button == 1) {
  //     $("#textArea").slideDown();
  //     $('#apply').slideDown();
  //     $('#mainFrame').css({ 'width': '80vw' });
  //   }
  // });
  window.addEventListener("keydown", e => {
    if (e.code == 'Tab') {
      $("#textArea").slideDown();
      $('#apply').slideDown();
      $('#mainFrame').css({ 'width': '80vw' });
    }
  });
  /*$('html').on('keypress', (e) => {
    if (e.code == 'KeyZ') {
      $("#textArea").slideDown();
      $('#apply').slideDown();
      $('#mainFrame').css({ 'width': '80vw' });
      canvas.requestPointerLock();
    }
  });*/

  //let sky = render.newSkySphere("./bin/textures/space.png");
  //let sky = render.newSkySphere("./bin/textures/water.jpg");

  const draw = () => {
    let p = getPlayers();

    render.renderStart();
    for (let player in p.players) {
      if (p.id != player) {
        p.prims[player].mtl.attachTexture(p.avatars[player], 0);
        p.prims[player].render(mat4(p.players[player].coords.trans).mul(
          matrTranslate(p.players[player].coords.pos)
        ));
        /*
        pl_pr.mtl.shd = p.shaders[player];
        pl_pr.mtl.attachTexture(p.avatars[player], 0);
        pl_pr.render(
          mat4(p.players[player].coords.trans).mul(
            matrTranslate(p.players[player].coords.pos)
          )
        );*/
      }
    }

    //prim.render(
    //  matrRotate(render.timer.localTime, vec3(0, 1, 1)).mul(
    //    matrTranslate(vec3(0, 0, 0))
    //  )
    //);
    lab.render();
    render.renderEnd();
    window.requestAnimationFrame(draw);
  };
  draw();
}

window.onload = main;
