export class Texture {
    constructor(rnd, url) {
        const gl = rnd.gl;

        this.rnd = rnd;
        this.texId = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this.textId);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]); // opaque blue
        gl.texImage2D(
            gl.TEXTURE_2D,
            level,
            internalFormat,
            width,
            height,
            border,
            srcFormat,
            srcType,
            pixel,
        );

        const image = new Image();
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, this.texId);
            gl.texImage2D(
                gl.TEXTURE_2D,
                level,
                internalFormat,
                srcFormat,
                srcType,
                image,
            );

            if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
                // Yes, it's a power of 2. Generate mips.
                gl.generateMipmap(gl.TEXTURE_2D);
            } else {
                // No, it's not a power of 2. Turn off mips and set
                // wrapping to clamp to edge
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        };
        image.crossOrigin = "anonymous"
        image.src = url;
    }

    apply(num) {
        this.rnd.gl.activeTexture(this.rnd.gl.TEXTURE0 + num);
        this.rnd.gl.bindTexture(this.rnd.gl.TEXTURE_2D, this.texId);
    }
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}
