import { mat4, matrTranslate } from "../mth/mat4";
import { Figure } from "../plat/plat.js";
import { vec3 } from "../mth/vec3.js";

export class Room {
  constructor(render, fileName) {
    this.map;
    this.blocks = [];

    this.shader = render.newShader("default");
    this.mtl = this.shader.newMaterial(
      vec3(0.1),
      vec3(1, 0.5, 1.0),
      vec3(0.3),
      90,
      1.0
    );
    this.tex = render.newTexture("./bin/textures/wallpaper.png ");
    this.mtl.attachTexture(this.tex, 0);
    this.mtl.update();
    this.mtl1 = this.shader.newMaterial(
      vec3(0.1),
      vec3(1, 0.5, 1.0),
      vec3(0.3),
      90,
      1.0
    );
    this.tex1 = render.newTexture("./bin/textures/p.png");
    this.mtl1.attachTexture(this.tex1, 0);
    this.mtl1.update();
    this.mtlCail = this.shader.newMaterial(
      vec3(0.1),
      vec3(1, 0.5, 1.0),
      vec3(0.3),
      90,
      1.0
    );
    this.texCail = render.newTexture("./bin/textures/cail.png");
    this.mtlCail.attachTexture(this.texCail, 0);
    this.mtlCail.update();

    let fcube = new Figure();
    fcube.setCube();
    this.cube = fcube.makePrim(this.mtl);
    this.cubeFloor = fcube.makePrim(this.mtl1);
    this.cubeCail = fcube.makePrim(this.mtlCail);
    this.map = null;
    this.image = null;
    Jimp.read(fileName, (err, image) => {
      this.map = image.bitmap.data;
      this.image = image;
    });
  }
  render(world) {
    if (this.map == null) return;
    for (let block of this.blocks) {
      block.render(mat4(1));
    }
    for (let y = 0; y < this.image.bitmap.height; y++)
      for (let x = 0; x < this.image.bitmap.width; x++) {
        let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));

        if (c.r == 255) {
          for (let i = 0; i < 5; i++) {
            this.cube.render(matrTranslate(vec3(x, i, y)).mul(world));
          }
        } else if (c.b == 255) {
          this.cubeFloor.render(matrTranslate(vec3(x, 0, y)).mul(world));
          this.cubeCail.render(matrTranslate(vec3(x, 5, y)).mul(world));
        }
      }
  }

  putPixel(x, y, c) {
    this.image.setPixelColor(x, y, c);
  }
}

export function imgToContext2d(canvas, context, image) {
  let fracw = Math.floor(canvas.width / image.bitmap.width);
  let frach = Math.floor(canvas.height / image.bitmap.height);
  for (let y = 0; y < image.bitmap.height; y++)
    for (let x = 0; x < image.bitmap.width; x++) {
      let c = Jimp.intToRGBA(image.getPixelColor(x, y));
      context.fillStyle = `rgba(${c.r}, ${c.g}, ${c.b}, 1.0)`;
      context.fillRect(x * fracw, y * frach, fracw, frach);
    }
}
