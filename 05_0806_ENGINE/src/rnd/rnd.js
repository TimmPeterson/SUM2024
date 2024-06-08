import { mat4 } from "../mth/mat4.js"

export class Render {

    renderStart() {
        // console.log(`Frame ${x++}`);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);

        /*
        if (this.timeLoc != -1) {
            const date = new Date();
            let t =
                date.getMinutes() * 60 +
                date.getSeconds() +
                date.getMilliseconds() / 1000;

            this.gl.uniform1f(this.timeLoc, t);
        }
            */
        //}
    } // End of 'render' function

    constructor(canvas) {
        this.canvas = canvas;

        this.projSize = 0.1;
        this.projDist = 0.1;
        this.farClip = 300;

        let rect = canvas.getBoundingClientRect();
        this.width = rect.right - rect.left + 1;
        this.height = rect.bottom - rect.top + 1;

        this.gl = canvas.getContext("webgl2");
        this.gl.clearColor(0.9, 0.9, 0.9, 1);

        this.gl.enable(this.gl.DEPTH_TEST);
    }
}

