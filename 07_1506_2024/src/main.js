const INF = 255000;

function intersection(x1, x2, fx1, fx2) {
    return ((fx1 + x1 * x1) - (fx2 + x2 * x2)) / (2 * x1 - 2 * x2);
}

function doLine(dists, width, y) {
    let xs = [];
    let fxs = [];

    for (let x = 0; x < width; x++) {
        let fx = dists[x + y * width];

        if (fx != INF) {
            xs.push(x);
            fxs.push(fx);
        }
    }

    let l = xs.length;
    if (l == 0)
        return;

    for (let i = 0; i < xs.length - 2; i++) {
        let x1 = xs[i];
        let x2 = xs[i + 1];
        let x3 = xs[i + 2];
        let fx1 = fxs[i];
        let fx2 = fxs[i + 1];
        let fx3 = fxs[i + 2];
        let s = intersection(x1, x3, fx1, fx3);
        let fs = fx1 + (s - x1) * (s - x1);
        let f2s = fx2 + (s - x2) * (s - x2);

        if (f2s >= fs) {
            xs.splice(i + 1, 1);
            fxs.splice(i + 1, 1);
            i = 0;
            l--;
        }
    }

    let prev = 0;
    for (let i = 0; i < xs.length - 1; i++) {
        let s = Math.round(intersection(xs[i], xs[i + 1], fxs[i], fxs[i + 1]));

        for (let x = Math.max(0, prev); x < s && x < width; x++) {
            dists[x + y * width] = Math.min(255, (fxs[i] + (x - xs[i]) * (x - xs[i])));
        }
        prev = s;
    }
    for (let x = prev; x < width; x++)
        dists[x + y * width] = Math.min(255, fxs[l - 1] + (x - xs[l - 1]) * (x - xs[l - 1]));
}

function main() {
    let img_dst = new Image();   // Image structure from source image
    let canvas = document.getElementById("myCan");   // Canvas for source image
    let context = canvas.getContext("2d");           // Context for source image
    let canvas1 = document.getElementById("myCan1"); // Canvas for result image
    let context1 = canvas1.getContext("2d");         // Context for result image

    let bits_src = [];     // Array with 1/0 evaluated from image
    let bits = [];         // Array with starting values for algorithm (0/INF)

    img_dst.onload = () => {
        context.drawImage(img_dst, 0, 0); // Drawing source image to the context

        // Getting array from source image
        bits_src = Array.from(context.getImageData(0, 0, img_dst.width, img_dst.height).data);

        // Evaluating array with bits
        for (let y = 0; y < bits_src.length; y += 4) {
            if ((bits_src[y] + bits_src[y + 1] + bits_src[y + 2]) / 3 > 128)
                bits.push(1);
            else
                bits.push(0);
        }

        for (let y = 0; y < img_dst.height; y++)
            for (let x = 0; x < img_dst.width; x++) {
                if (bits[x + y * img_dst.width] == 1) {
                    context.fillStyle = "rgba(255, 255, 255, 1)";;
                } else {
                    context.fillStyle = "rgba(0, 0, 0, 1)";
                }
                context.fillRect(x, y, 1, 1);
            }


        // Creating starting dists tablet from image
        let dists = [];
        for (let y = 0; y < img_dst.height; y++) {
            for (let x = 0; x < img_dst.width; x++) {
                if (bits[x + y * img_dst.width] == 1)
                    dists.push(INF);
                else
                    dists.push(0);
            }
        }


        for (let y = 0; y < img_dst.height; y++)
            doLine(dists, img_dst.width, y);

        let dists1 = [];
        for (let y = 0; y < img_dst.height; y++)
            for (let x = 0; x < img_dst.width; x++) {
                let nx = y;
                let ny = img_dst.width - x - 1;
                dists1[ny * img_dst.height + nx] = dists[y * img_dst.width + x];
            }
        dists = [...dists1];

        for (let y = 0; y < img_dst.width; y++)
            doLine(dists, img_dst.height, y);

        for (let y = 0; y < img_dst.width; y++)
            for (let x = 0; x < img_dst.height; x++) {
                let nx = img_dst.width - 1 - y;
                let ny = x;
                dists1[ny * img_dst.width + nx] = dists[y * img_dst.height + x];
            }
        dists = [...dists1];

        for (let y = 0; y < img_dst.height; y++)
            for (let x = 0; x < img_dst.width; x++) {
                let c = dists[x + y * img_dst.width];//dists[(img_dst.width - y - 1) + x * img_dst.width];
                context1.fillStyle = `rgba(${c}, ${c}, ${c}, 1)`;
                context1.fillRect(x, y, 1, 1);
            }
    }
    img_dst.src = "./bin/em1.jpg";
}

window.addEventListener("load", () => {
    main();
});