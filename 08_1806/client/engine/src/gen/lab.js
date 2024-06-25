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
        this.end = [new Room(render, "./bin/rooms/end.png")];

        this.map = [];
        this.loaded = false;
        this.image = null;
        Jimp.read(fileName, (err, image) => {
            this.loaded = true;
            this.map = image.bitmap.data;
            this.image = image;
        });
        this.rnd = render;
    }

    render() {
        this.prevPos = vec3(this.position);
        this.velocity = this.rnd.control.velocity;
        this.acceleration = this.rnd.control.acceleration;
        this.position = this.rnd.control.position;
        this.velocity = this.rnd.control.velocity;
        this.keyTab = this.rnd.control.keyTab;
        this.forward = this.rnd.control.forward;
        this.right = this.rnd.control.right;
        this.up = this.rnd.control.up;
        this.moveSpeed = this.rnd.control.moveSpeed;

        this.velocity -= this.acceleration * this.rnd.timer.globalDeltaTime;
        this.position.y = this.position.y + this.velocity * this.rnd.timer.globalDeltaTime;
        if (this.position.y < 2.5)
            this.position.y = 2.5;
        this.rnd.control.velocity = this.velocity;
        this.rnd.control.acceleration = this.acceleration;
        this.rnd.control.position.y = this.position.y;

        if (this.keyTab["KeyA"]) {
            this.position = this.position.add(this.right.mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
        } if (this.keyTab["KeyD"]) {
            this.position = this.position.sub(this.right.mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
        } if (this.keyTab["KeyW"]) {
            this.position = this.position.add(vec3(this.forward.x, 0, this.forward.z).norm().mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
        } if (this.keyTab["KeyS"]) {
            this.position = this.position.sub(vec3(this.forward.x, 0, this.forward.z).norm().mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
        } if (this.keyTab["ShiftLeft"]) {
            this.position = this.position.sub(this.up.mul(this.moveSpeed * this.rnd.timer.globalDeltaTime));
        } if (this.keyTab["Space"]) {
            //this.position = this.position.add(this.up.mul(this.moveSpeed * this.render.timer.globalDeltaTime));
        }

        if (this.image != null) {
            let xz = this.rnd.control.position.div(10);
            xz = vec3(Math.floor(xz.x), 0.5, Math.floor(xz.z));
            let xz10 = vec3(xz);
            xz10.x = Math.floor(0.5 + this.position.x) % 10;
            xz10.z = Math.floor(0.5 + this.position.z) % 10;
            let c = Jimp.intToRGBA(this.image.getPixelColor(xz.x, xz.z));
            let room;
            if (xz.x % 2 == 0 && xz.z % 2 != 0) {
                room = this.vert[0];
            } else if (xz.x % 2 != 0 && xz.z % 2 == 0) {
                room = this.horz[0];
            } else if (c.r == 255) {
                room = this.rooms[0];
            } else if (c.g == 255) {
                room = this.rooms[1];
            } else if (c.b == 255) {
                room = this.rooms[2];
            }
            let res;

            if (room != undefined)
                res = Jimp.intToRGBA(room.image.getPixelColor(xz10.x, xz10.z));

            if (res == undefined || !(res.r == 255 && res.b == 255 && res.g == 255)) {
                this.rnd.control.position = this.position;
            } else {
                // let n = vec3(Math.floor(this.prevPos.x + 0.5), 0, Math.floor(this.prevPos.z + 0.5)).sub(
                //     vec3(Math.floor(this.position.x + 0.5), 0, Math.floor(this.position.z + 0.5))
                // ).norm();
                // console.log(n);
                // if (n.z == 0) {
                //     this.rnd.control.position.z = this.position.z;
                // } else if (n.x == 0) {
                //     this.rnd.control.position.x = this.position.x;
                // }
            }
        } else
            this.rnd.control.position = this.position;
        ///////////////
        ///////////////
        ///////////////
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
                if (c.r == 128 && c.g == 128 && c.b == 128)
                    this.end[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                else if (c.r == 255 && c.g == 255 && c.b == 255)
                    this.vert[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
            }
        for (let y = 0; y < this.image.bitmap.height; y += 2)
            for (let x = 1; x < this.image.bitmap.width; x += 2) {
                let c = Jimp.intToRGBA(this.image.getPixelColor(x, y));
                if (c.r == 128 && c.g == 128 && c.b == 128)
                    this.end[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
                else if (c.r == 255 && c.g == 255 && c.b == 255)
                    this.horz[0].render(matrTranslate(vec3(10 * x, 0, 10 * y)));
            }
    }
}