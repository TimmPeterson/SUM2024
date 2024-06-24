import { vec3 } from "../mth/vec3.js"
import { vec2 } from "../mth/vec2.js"
import { mat4, matrFrustum, matrView } from "../mth/mat4.js"
import { UniformBuffer } from "./res/buf.js"
import { Timer } from "../timer/timer.js"
import { Shader } from "./res/shd.js"
import { Texture } from "./res/tex.js"
import { vertex } from "./res/prim.js"
import { Control } from "../ctrl/ctrl.js"

// General class for rendering.
// One render per canvas.
export class Render {
    transparents = [];

    setFrustum() {
        let m = mat4(1);
        let rx = this.projSize, ry = this.projSize;

        /* Correct aspect ratio */
        if (this.width >= this.height)
            rx *= this.width / this.height;
        else
            ry *= this.height / this.width;

        this.matrProj = matrFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.farClip);
    }

    setCam(loc, at, up) {
        this.matrView = matrView(loc, at, up);
        this.updateMatrixes();
    }

    updateMatrixes() {
        let right = vec3(
            this.matrView.a[0][0],
            this.matrView.a[1][0],
            this.matrView.a[2][0]
        );
        let up = vec3(
            this.matrView.a[0][1],
            this.matrView.a[1][1],
            this.matrView.a[2][1]);
        let dir = vec3(-this.matrView.a[0][2],
            -this.matrView.a[1][2],
            -this.matrView.a[2][2]);

        let data = this.matrProj.linearize().concat(this.matrView.linearize());
        data = data.concat(dir.linearize(), [0], right.linearize(), [0], up.linearize(), [0]);
        data = data.concat([this.canvas.width, this.canvas.height, this.projSize, this.projDist]);
        this.matrixUBO.update(new Float32Array(data));
    }

    renderStart() {
        this.timer.response();
        this.control.response();

        //this.timeUBO.update(new Float32Array([this.timer.localTime, this.timer.localDeltaTime, this.timer.globalTime, this.timer.globalDeltaTime]));
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    }

    renderEnd() {
        if (this.transparents.length != 0) {
            this.gl.enable(this.gl.BLEND);
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

            for (let p of this.transparents) {
                p.prim.renderNow(p.world);
            }
            this.gl.disable(this.gl.BLEND);
            this.transparents = [];
        }
    }

    constructor(canvas) {
        this.canvas = canvas;

        // Default camera properties
        this.projSize = 0.2;
        this.projDist = 0.1;
        this.farClip = 300;

        // Evaluating canvas size
        let rect = canvas.getBoundingClientRect();
        this.width = 1920;//rect.right - rect.left + 1;
        this.height = 1080;//rect.bottom - rect.top + 1;

        // Getting GL context
        this.gl = canvas.getContext("webgl2", {
            premultipliedAlpha: false,
            alpha: false
        });
        this.gl.clearColor(0.9, 0.9, 0.9, 1);
        this.gl.enable(this.gl.DEPTH_TEST);

        // Contol init
        this.control = new Control(this);

        // Initializing camera
        this.matrixUBO = new UniformBuffer(this, "u_camera", 16 * 4 * 2 + 4 * 16, 0);
        this.setFrustum();
        this.setCam(vec3(0, 0, 0), vec3(0, 0, -1), vec3(0, 1, 0));
        this.updateMatrixes();

        // Initializing prim ubo
        this.primUBO = new UniformBuffer(this, "u_primitive", 16 * 4, 1);

        // Initializing timer
        this.timer = new Timer();
        this.timeUBO = new UniformBuffer(this, "u_time", 16, 2);
    }

    newShader(fileName) {
        return new Shader(this, fileName);
    }

    newTexture(fileName) {
        return new Texture(this, fileName);
    }

    newUniformBuffer(bufferName, bufferSize, binding) {
        return new UniformBuffer(this, bufferName, bufferSize, binding);
    }

    newSkySphere(texName) {
        const vertexes = [vertex(vec3(-1, -1, 0.999), vec3(0)), vertex(vec3(-1, 3, 0.999), vec3(0)), vertex(vec3(3, -1, 0.999), vec3(0))];
        const indicies = [0, 1, 2];
        const shd = this.newShader("sky sphere");
        const mtl = shd.newMaterial(vec3(0), vec3(0), vec3(0), 0, 1.0);
        const tex = this.newTexture(texName);
        mtl.attachTexture(tex, 0);
        return mtl.newPrimitive(vertexes, indicies);
    }
}

