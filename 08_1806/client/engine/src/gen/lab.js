import { mat4, matrRotate, matrTranslate } from "../mth/mat4";
import { vec3 } from "../mth/vec3";
import { Room } from "./gen";

export class Labirint {
    constructor(render, fileName) {
        this.rooms = [
            new Room(render, "./bin/rooms/room1.png"),
            new Room(render, "./bin/rooms/room2.png"),
            new Room(render, "./bin/rooms/room3.png")
        ];
        this.vert = [new Room(render, "./bin/rooms/vert.png")];
        this.horz = [new Room(render, "./bin/rooms/horz.png")];

        this.map = [];
        this.loaded = false;
        Jimp.read(fileName, (err, image) => {
            this.loaded = true;
            this.map = image.bitmap.data;
            this.image = image;
        });
    }

    render() {
        if (!this.loaded)
            return;
        for (let y = 0; y < this.image.bitmap.height; y += 2)
            for (let x = 0; x < this.image.bitmap.width; x += 2) {
                let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                if (c.r == 255) {
                    this.rooms[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                } else if (c.g == 255) {
                    this.rooms[1].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                } else if (c.b == 255) {
                    this.rooms[2].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                }
            }
        for (let y = 1; y < this.image.bitmap.height; y += 2)
            for (let x = 0; x < this.image.bitmap.width; x += 2) {
                let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                if (c.r == 255 && c.g == 255 && c.b == 255)
                    this.vert[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
            }
        for (let y = 0; y < this.image.bitmap.height; y += 2)
            for (let x = 1; x < this.image.bitmap.width; x += 2) {
                let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                if (c.r == 255 && c.g == 255 && c.b == 255)
                    this.horz[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
            }
    }
}