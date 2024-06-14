export function onPinch(element, onPinchStart, onPinchMove, onPinchEnd) {
    let scaling = false;
    let prev_dist = 0;

    element.addEventListener("ontouchstart", e => {
        if (e.touches.length === 2) {
            scaling = true;
            prev_dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            onPinchStart(e);
        }
    });
    element.addEventListener("ontouchmove", e => {
        if (scaling) {
            let dist = Math.hypot(
                e.touches[0].pageX - e.touches[1].pageX,
                e.touches[0].pageY - e.touches[1].pageY
            );
            let delta = dist - prev_dist;
            prev_dist = dist;
            onPinchMove(dist, delta);
        }
    });
    element.addEventListener("ontouchend", e => {
        if (scaling) {
            onPinchEnd(e);
            scaling = false;
        }
    });
}