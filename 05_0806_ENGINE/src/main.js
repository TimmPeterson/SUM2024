import { Render } from "./rnd/rnd.js"
import { vec3 } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate, matrScale } from "./mth/mat4.js"
import { Prim, vertex } from "./rnd/res/prim.js"
import { Figure } from "./plat/plat.js"
import { Shader } from "./rnd/res/shd.js"
import { Timer } from "./timer/timer.js"
import { UniformBuffer } from "./rnd/res/buf.js"
import { Material } from "./rnd/res/mtl.js"
import { Texture } from "./rnd/res/tex.js"
import { onPinch } from "./input/tch.js"

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
      matrScale(vec3(5.8)), matrScale(vec3(4.7)),
      matrScale(vec3(4)), matrScale(vec3(3.2)),
      matrScale(vec3(2.1)), matrScale(vec3(1.2)), matrScale(vec3(0.3)), matrScale(vec3(4))
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
    [vec3(0.1), vec3(0, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90, 1.0],
    [vec3(0.1), vec3(0.3, 0.35, 0.7), vec3(0.5, 0.5, 0.0), 40, 1.0],
    [vec3(0.1), vec3(0.4, 0.6, 0.4), vec3(1, 1, 1), 90, 0.4],
    [vec3(0.1), vec3(0.7, 0.7, 0.7), vec3(0.5, 0.5, 0.5), 90, 1.0],
    [vec3(0.1), vec3(0.6, 0.2, 0.5), vec3(0.3, 0.3, 0.3), 40, 1.0],
    [vec3(0.1), vec3(0.7, 0.7, 0), vec3(0.9, 0.9, 0.9), 90, 1.0],
  ];

  canvases[6] = document.getElementById(`myCan7`);
  canvases[6].hm = Hammer(canvases[6]);
  canvases[6].hm.get("rotate").set({ enable: true });
  canvases[7] = document.getElementById(`myCan8`);
  canvases[7].hm = Hammer(canvases[7]);
  canvases[7].hm.get("rotate").set({ enable: true });

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
  prims[0].transform = matrTranslate(vec3(0, -0.3, 0));

  // Timer creation
  let timer = new Timer();
  // Test material and primitive 
  let render_model = new Render(canvases[6]);
  let shader_model = new Shader(render_model, "default");
  let mtl = new Material(shader_model, ...mtl_props[0]);
  let test_pr = new Prim(mtl, "cow");
  test_pr.transform = matrTranslate(vec3(0, -4.5, 0));

  let render_texture = new Render(canvases[7]);
  let shader_texture = new Shader(render_texture, "default");
  let mtl_texture = new Material(shader_texture, ...mtl_props[0]);
  //let tex = new Texture(render_texture, "bin/textures/PNG.PNG");
  let tex = new Texture(render_texture, "./bin/textures/em.jpg");
  mtl_texture.attachTexture(tex, 0);
  mtl_texture.update();
  let f = new Figure();
  f.setCube();
  let prim_tex = f.makePrim(mtl_texture);

  let mt = new Material(shaders[2], vec3(0.1), vec3(1, 0, 0.4), vec3(0.5, 0.5, 0.0), 40, 1);
  let cube = f.makePrim(mt);

  //test_pr.transform = matrTranslate(vec3(0, -5.0, 0));
  //canvases[6].style.width = "50%";
  //////////////////////////////
  // Mouse event handlers setting
  //////////////////////////////
  let rotSpeed = 0.01;
  let ss = [1, 1, 1, 1, 1, 1, 1, 1];
  let scales1 = [];
  for (let i = 0; i < 8; i++) {
    rots[i] = mat4(1);
    scales1[i] = mat4(1);

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
    let f3 = (dist, delta) => {
      d = delta / 20.0;
      if (ss[i] + d > 0)
        ss[i] += d;
      scales1[i] = matrScale(vec3(ss[i]));
    };
    let f4 = e => {
      rots[i] = rots[i].mul(matrRotate(0.22 * e.velocityX, vec3(0, 1, 0)));
      rots[i] = rots[i].mul(matrRotate(0.22 * e.velocityY, vec3(1, 0, 0)));
    };
    let onTap = e => {
      if (canvases[i].style.width == "35%") {
        canvases[i].style.width = "20%";
        canvases[i].style.position = "static";
        canvases[i].style.top = "auto";
        canvases[i].style.left = "auto";
        return;
      }

      canvases[i].style.width = "35%";
      canvases[i].style.position = "fixed";
      canvases[i].style.top = "0";
      canvases[i].style.left = "0";
      canvases[i].style.position = "absolute";
      canvases[i].style.top = "5%";
      canvases[i].style.left = "32%";

      for (let c = 0; c < canvases.length; c++) {
        if (c != i) {
          canvases[c].style.width = "20%";
          canvases[c].style.position = "static";
          canvases[c].style.top = "auto";
          canvases[c].style.left = "auto";
        }
      }
    };

    //canvases[i].addEventListener("mousemove", f1);
    canvases[i].addEventListener("wheel", f2);
    canvases[i].hm.on("rotate", f3);
    canvases[i].hm.on("pan", f4);
    canvases[i].hm.on("tap", onTap);
    onPinch(canvases[i], () => { }, f3, () => { });
  }

  // Each frame rendering function declaration
  const draw = () => {

    // Timer reponse
    //timer.response();

    let t = timer.getTime();

    // Frame render
    for (let i = 0; i < 6; i++) {
      //  Starting posting cringe 
      renders[i].renderStart();

      if (i == 2) {
        cube.render(scales1[2].mul(matrScale(vec3(0.5)).mul(scales[2].mul(matrRotate(3 * t, vec3(0, 1, 0)).mul(rots[2].mul(matrTranslate(vec3(0, 0, -10))))))));
      }  
      // Rendering [i] primitive
      prims[i].render(scales1[i].mul(scales[i].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[i].mul(matrTranslate(vec3(0, 0, -10)))))));
      renders[i].renderEnd();
    }

    render_model.renderStart();
    test_pr.render(scales1[6].mul(scales[6].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[6].mul(matrTranslate(vec3(0, 0, -10)))))));
    render_model.renderEnd();
    render_texture.renderStart();
    prim_tex.render(scales1[7].mul(scales[7].mul(matrRotate(t, vec3(0, 1, 0)).mul(rots[7].mul(matrTranslate(vec3(0, 0, -10)))))));
    render_texture.renderEnd();

    window.requestAnimationFrame(draw);
  };
  draw();
}

window.addEventListener("load", () => {
  main();
});