import { Render } from "./rnd/rnd.js";
import { vec3 } from "./mth/vec3.js";
import { mat4, matrRotate, matrTranslate, matrScale } from "./mth/mat4.js";
import { Figure } from "./plat/plat.js";
import { Room, imgToContext2d } from "./gen/gen.js";
import { Control } from "./ctrl/ctrl.js";
import { wsInit, onInterval, getPlayers } from "./ws.js";
import { Labirint } from "./gen/lab.js";
import { shaderUpdateInit } from "./shd_upd.js";
import { Cows } from "./gen/cows.js";

function main() {
  let figure = new Figure();
  figure.setDodecahedron();

  let canvas = document.getElementById("mainFrame");
  let render = new Render(canvas);
  wsInit(render);
  let shader = render.newShader("default");
  shaderUpdateInit(shader);
  let tex = render.newTexture("./bin/textures/em.jpg");
  render.setCam(vec3(5, 5, 5), vec3(0), vec3(0, 1, 0));
  let lab = new Labirint(render, "./bin/labs/def1.png");
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
  let cows = new Cows(lab);

  canvas.onclick = function () {
    $("#textArea").slideUp();
    $('#apply').slideUp();
    $('#mainFrame').css({ 'width': '100vw' });
    canvas.requestPointerLock();
  };

  window.addEventListener("keydown", e => {
    if (e.code == 'Tab') {
      $("#textArea").slideDown();
      $('#apply').slideDown();
      $('#mainFrame').css({ 'width': '80vw' });
    }
  });

  //let sky = render.newSkySphere("./bin/textures/space.png");
  let sky = render.newSkySphere("./bin/textures/water.jpg");

  const draw = () => {
    let p = getPlayers();

    render.renderStart();
    for (let player in p.players) {
      if (p.id != player) {
        p.prims[player].mtl.attachTexture(p.avatars[player], 0);
        p.prims[player].render(mat4(p.players[player].coords.trans).mul(
          matrTranslate(p.players[player].coords.pos)
        ));
      }
    }

    //prim.render(
    //  matrRotate(render.timer.localTime, vec3(0, 1, 1)).mul(
    //    matrTranslate(vec3(0, 0, 0))
    //  )
    //);
    //sky.render(mat4(1));
    lab.render();
    cows.render();
    render.renderEnd();
    window.requestAnimationFrame(draw);
  };
  draw();
}

window.onload = main;
