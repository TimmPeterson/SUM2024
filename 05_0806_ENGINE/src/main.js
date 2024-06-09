import { Render        } from "./rnd/rnd.js"
import { vec3          } from "./mth/vec3.js"
import { mat4, matrRotate, matrTranslate } from "./mth/mat4.js"
import { Prim, vertex  } from "./rnd/res/prim.js"
import { Figure        } from "./plat/plat.js"
import { Shader        } from "./rnd/res/shd.js"
import { Timer         } from "./timer/timer.js"
import { UniformBuffer } from "./rnd/res/buf.js"

console.log("MAIN LOADED");

let rnd1;

function main() {

  // Timer creation
  let timer = new Timer();

  // Rendering context initializing
  let canvas1 = document.getElementById("myCan1");
  rnd1 = new Render(canvas1);
  let shd1 = new Shader(rnd1, "default");
  
  // Primitive creation
  let fig1 = new Figure();
  fig1.setStar();
  let prim1 = fig1.makePrim(shd1);

  let a = [1, 1, 1, 1, 1, 1, 1, 1, 1];

  let UBO = new UniformBuffer(shd1, "u_testBlock", 64, 0);

  // Each frame rendering function declaration
  const draw = () => {

    const date = new Date();
    let t =
      date.getMinutes() * 60 +
      date.getSeconds() +
      date.getMilliseconds() / 1000;

    // timer reponse
    timer.response();

    // frame render
    rnd1.renderStart();
    prim1.render(matrRotate(t, vec3(0, 1, 0)).mul(matrTranslate(vec3(0, 0, -10))));//matrRotate(t, vec3(0, 1, 0)));
    
    
    if (UBO.loaded == false && UBO.shd.prg != null) {
      UBO.apply();
      UBO.update(new Float32Array(a));
    }
    

    window.requestAnimationFrame(draw);
  };
  draw();
}


window.addEventListener("load", () => {
  main();
});