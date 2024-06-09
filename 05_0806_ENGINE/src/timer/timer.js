////////////////////////////
// Timer class module
////////////////////////////

export class Timer {
    constructor() {        
        this.globalTime = this.localTime = this.getTime();
        this.globalDeltaTime = this.localDeltaTime = 0;
        this.startTime = this.oldTime = this.oldTimeFPS = this.globalTime;
        this.frameCounter = 0;
        this.isPause = false;
        this.FPS = 30.0;
        this.pauseTime = 0;
    }

    // Get current global time funtion
    getTime() {
        const date = new Date();
        let t =
            date.getMilliseconds() / 1000.0 +
            date.getSeconds() +
            date.getMinutes() * 60;
        return t;
    };

    // Get current FPS function
    getFPS() {
        return this.FPS.toFixed(3);
    }

    pauseEnbale() {
        this.isPause = true;
    }

    pauseDisable() {
        this.isPause = false;
    }

    pauseSwitch() {
        if (this.isPause == false)
            this.isPause = true;
        else
            this.isPause = false;
    }

    // Reponse timer function
    response(tag_id = null) {
        let t = this.getTime();

        this.globalTime = t;
        this.globalDeltaTime = t - this.oldTime;

        if (this.isPause) {
            this.localDeltaTime = 0;
            this.pauseTime += t - this.oldTime;
        } 
        else {
            this.localDeltaTime = this.globalDeltaTime;
            this.localTime = t - this.pauseTime - this.startTime;
        }

        this.frameCounter++;
        if (t - this.oldTimeFPS > 3) {
            this.FPS = this.frameCounter / (t - this.oldTimeFPS);
            this.oldTimeFPS = t;
            this.frameCounter = 0;
            if (tag_id != null)
                document.getElementById(tag_id).innerHTML = this.getFPS();
        }

        this.oldTime = t;
    };
}