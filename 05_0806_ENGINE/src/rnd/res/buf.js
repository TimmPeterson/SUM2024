import { Shader } from "./shd.js"

class _buffer {
    constructor(shd, type, size) {
        this.shd = shd; 
        this.type = type;    // Buffer type (gl.***_BUFFER)
        this.size = size;    // Buffer size in bytes
        this.id = null;
        if (size == 0 || type == undefined)
            return;
        this.id = shd.rnd.gl.createBuffer();
        this.shd.rnd.gl.bindBuffer(type, this.id);
        this.shd.rnd.gl.bufferData(type, size, shd.rnd.gl.STATIC_DRAW);
    }

    update(data) {
        this.shd.rnd.gl.bindBuffer(this.type, this.id);
        this.shd.rnd.gl.bufferSubData(this.type, 0, data);
    }
  }

export class UniformBuffer extends _buffer {
    constructor(shd, name, size, bindPoint) {
        super(shd, shd.rnd.gl.UNIFORM_BUFFER, size);

        if (this.shd.prg == null)
            this.loaded = false;

        this.name = name;
        this.bindPoint = bindPoint; // Buffer GPU binding point
    }

    apply() {
        if (this.shd.rnd == undefined || this.shd.prg == undefined || this.shd.uniformBlocks[this.name] == undefined)
          return;
        this.shd.rnd.gl.bindBufferRange(this.type, this.shd.uniformBlocks[this.name].index, this.id, 0, this.size);
        this.shd.rnd.gl.uniformBlockBinding(this.shd.prg, this.shd.uniformBlocks[this.name].index, this.bindPoint);
        this.shd.rnd.gl.bindBufferBase(this.shd.rnd.gl.UNIFORM_BUFFER, this.bindPoint, this.id);
    }                        
}