class _buffer {
    constructor(rnd, type, size) {
        this.rnd = rnd;
        this.type = type;    // Buffer type (gl.***_BUFFER)
        this.size = size;    // Buffer size in bytes
        this.id = null;
        if (size == 0 || type == undefined)
            return;
        this.id = rnd.gl.createBuffer();
        this.rnd.gl.bindBuffer(type, this.id);
        this.rnd.gl.bufferData(type, size, rnd.gl.STATIC_DRAW);
    }

    update(data) {
        this.rnd.gl.bindBuffer(this.type, this.id);
        this.rnd.gl.bufferSubData(this.type, 0, data);
    }
}

export class UniformBuffer extends _buffer {
    constructor(rnd, name, size, bindPoint) {
        super(rnd, rnd.gl.UNIFORM_BUFFER, size);
        this.name = name;
        this.bindPoint = bindPoint; // Buffer GPU binding point
    }

    apply(shd) {
        if (this.rnd == undefined || shd.prg == undefined || shd.uniformBlocks[this.name] == undefined)
            return;
        shd.rnd.gl.uniformBlockBinding(shd.prg, shd.uniformBlocks[this.name].index, this.bindPoint);
        shd.rnd.gl.bindBufferBase(shd.rnd.gl.UNIFORM_BUFFER, this.bindPoint, this.id);
    }
}