import { mat4 } from "../mth/mat4.js"

export class Render {
    // Load and compile shader function
    loadShader(shaderType, shaderSource) {
        const shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, shaderSource);
        this.gl.compileShader(shader);
        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            let buf = this.gl.getShaderInfoLog(shader);
            console.log("Shader compile fail: " + buf);
        }
        return shader;
    } // End of 'loadShader' function

    render() {
        // console.log(`Frame ${x++}`);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.clear(this.gl.DEPTH_BUFFER_BIT);

        if (this.timeLoc != -1) {
            const date = new Date();
            let t =
                date.getMinutes() * 60 +
                date.getSeconds() +
                date.getMilliseconds() / 1000;

            this.gl.uniform1f(this.timeLoc, t);
        }

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
        this.gl.clearColor(0.3, 0.47, 0.8, 1);

        this.gl.enable(this.gl.DEPTH_TEST);
        // Shader creation
        let vs_txt = `#version 300 es
        precision highp float;
        in vec3 InPosition;
        in vec3 InNormal;
            
        out vec2 DrawPos;
        out vec3 DrawNormal;

        uniform float Time;
        uniform mat4 MatrProj;
        
        void main( void )
        {
            gl_Position = MatrProj * vec4(InPosition, 1);
            DrawPos = InPosition.xy;
            DrawNormal = mat3(transpose(inverse(MatrProj))) * InNormal;
        }
        `;

        let fs_txt = `#version 300 es
        precision highp float;
        
        out vec4 OutColor;
        
        in vec2 DrawPos;
        in vec3 DrawNormal;

        uniform float Time;

        void main( void )
        {
            vec3 L = normalize(vec3(0, 1, 1));

            float k = max(0.1, dot(L, normalize(DrawNormal)));

            faceforward(normalize(DrawNormal), vec3(0, 0, 1), normalize(DrawNormal));

            OutColor = vec4(vec3(DrawPos.x, DrawPos.y, 1.0), 1.0);//vec4(normalize(DrawNormal), 1.0);//vec4(k * vec3(DrawPos.x, DrawPos.y, 1.0), 1.0);
        }
        `;

        let vs = this.loadShader(this.gl.VERTEX_SHADER, vs_txt),
            fs = this.loadShader(this.gl.FRAGMENT_SHADER, fs_txt),
            prg = this.gl.createProgram();

        this.gl.attachShader(prg, vs);
        this.gl.attachShader(prg, fs);
        this.gl.linkProgram(prg);

        this.prg = prg;

        if (!this.gl.getProgramParameter(prg, this.gl.LINK_STATUS)) {
            let buf = this.gl.getProgramInfoLog(prg);
            console.log("Shader program link fail: " + buf);
        }

        // Uniform data
        this.timeLoc = this.gl.getUniformLocation(prg, "Time");
        this.posLoc = this.gl.getAttribLocation(prg, "InPosition");
        this.normLoc = this.gl.getAttribLocation(prg, "InNormal");
        this.matrProjLoc = this.gl.getUniformLocation(prg, "MatrProj");
        this.gl.useProgram(prg);
    }
}

