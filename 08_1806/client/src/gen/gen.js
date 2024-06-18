import { mat4, matrTranslate } from "../mth/mat4";
import { Figure } from "../plat/plat.js"
import { vec3 } from "../mth/vec3.js";

export class Lab {
    constructor(mtl, fileName) {
        this.map;
        this.blocks = [];

        let fcube = new Figure();
        fcube.setCube();
        this.cube = fcube.makePrim(mtl);
        this.map = null;
        this.image = null;
        Jimp.read(fileName, (err, image) => {
            this.map = image.bitmap.data;
            this.image = image;
            /*
            for (let y = 0; y < image.bitmap.height; y++)
                for (let x = 0; x < image.bitmap.width; x++) {
                    let red = Math.floor(Jimp.intToRGBA(image.getPixelColor(x, y)).r / 255 * 5);

                    for (let i = 0; i < red; i++) {
                        let cube = fcube.makePrim(mtl);
                        cube.transform = matrTranslate(vec3(x, i, y));
                        this.blocks.push(cube);
                    }
                }
                    */
        });
    }
    render() {
        if (this.map == null)
            return;
        for (let block of this.blocks) {
            block.render(mat4(1));
        }
        for (let y = 0; y < this.image.bitmap.height; y++)
            for (let x = 0; x < this.image.bitmap.width; x++) {
                let red = Math.floor(Jimp.intToRGBA(this.image.getPixelColor(x, y)).r / 255 * 5);

                for (let i = 0; i < red; i++) {
                    this.cube.render(matrTranslate(vec3(x, i, y)));
                }
            }
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