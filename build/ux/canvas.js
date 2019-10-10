export class Canvas {
    static init(el) {
        this.canvasElement = el;
        this.lights.src = '../../images/leds_safe_dial_minigame.png';
        this.background.src = '../../images/background_safe_minigame.png';
        this.safe.src = '../../images/safe_minigame.png';
        this.screen.src = '../../images/screen_safe_minigame.png';
        this.supportDial.src = '../../images/support_safe_dial_minigame.png';
        window.addEventListener('resize', function () { Canvas.sizeCanvas(); }, false);
        Canvas.context = el.getContext("2d");
        this.background.onload = this.lights.onload = this.safe.onload = this.supportDial.onload = this.screen.onload = Canvas.counter;
    }
    static counter() {
        Canvas.count--;
        if (Canvas.count === 0) {
            Canvas.sizeCanvas();
        }
    }
    static sizeCanvas() {
        // If the browser is large enough scale the canvas to its maximum dimensions.
        if (document.body.clientWidth > this.maxWidth && window.innerHeight > this.maxHeight) {
            Canvas.canvasElement.width = Canvas.maxWidth;
            Canvas.width = Canvas.maxWidth;
            Canvas.canvasElement.height = Canvas.maxHeight;
            Canvas.height = Canvas.maxHeight;
        }
        else {
            // If both width and height are smaller than max determine which ratio is smallest and rescale accordingly.
            // Else if its just width than scale to width otherwise its height and scale to height. 
            document.body.clientWidth < this.maxWidth && document.body.clientHeight < this.maxHeight
                ? document.body.clientWidth / this.maxWidth <= document.body.clientHeight / this.maxHeight
                    ? Canvas.scaleToWidth(Canvas.canvasElement)
                    : Canvas.scaleToHeight(Canvas.canvasElement)
                : document.body.clientWidth < this.maxWidth ? Canvas.scaleToWidth(Canvas.canvasElement) : Canvas.scaleToHeight(Canvas.canvasElement);
        }
        Canvas.drawImages();
    }
    static scaleToWidth(el) {
        el.width = document.body.clientWidth * 0.95;
        Canvas.width = document.body.clientWidth * 0.95;
        el.height = Canvas.width * this.heightToWidthRatio;
        Canvas.height = Canvas.width * this.heightToWidthRatio;
    }
    static scaleToHeight(el) {
        el.height = document.body.clientHeight * 0.95;
        Canvas.height = document.body.clientHeight * 0.95;
        el.width = Canvas.height * this.widthToHeightRatio;
        Canvas.width = Canvas.height * this.widthToHeightRatio;
    }
    static drawImages() {
        const shrinkFactor = Canvas.width / Canvas.maxWidth;
        Canvas.context.drawImage(this.background, 0, 0, Canvas.width, Canvas.height);
        const widthFactor = this.safe.width * shrinkFactor;
        const heightFactor = this.safe.height * shrinkFactor;
        // Make a loop?
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe1"][0] * Canvas.width, Canvas.ratios["safe1"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe2"][0] * Canvas.width, Canvas.ratios["safe2"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe3"][0] * Canvas.width, Canvas.ratios["safe3"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe4"][0] * Canvas.width, Canvas.ratios["safe4"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe5"][0] * Canvas.width, Canvas.ratios["safe5"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe6"][0] * Canvas.width, Canvas.ratios["safe6"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe7"][0] * Canvas.width, Canvas.ratios["safe7"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe8"][0] * Canvas.width, Canvas.ratios["safe8"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.safe, Canvas.ratios["safe9"][0] * Canvas.width, Canvas.ratios["safe9"][1] * Canvas.height, widthFactor, heightFactor);
        Canvas.context.drawImage(this.screen, Canvas.ratios["screen"][0] * Canvas.width, Canvas.ratios["screen"][1] * Canvas.height, this.screen.width * shrinkFactor, this.screen.height * shrinkFactor);
        Canvas.context.drawImage(this.supportDial, Canvas.ratios["supportDial"][0] * Canvas.width, Canvas.ratios["supportDial"][1] * Canvas.height, this.supportDial.width * shrinkFactor, this.supportDial.height * shrinkFactor);
        // Do once
        // draw image under support dial?
        Canvas.behindLightsOne = Canvas.context.getImageData(Canvas.ratios["lights"][0] * Canvas.width, Canvas.ratios["lights"][1] * Canvas.height, this.lights.width / 3, this.lights.height);
        Canvas.context.drawImage(this.lights, 0, 0, this.lights.width / 3, this.lights.height, Canvas.ratios["lights"][0] * Canvas.width, Canvas.ratios["lights"][1] * Canvas.height, this.lights.width * shrinkFactor / 3, this.lights.height * shrinkFactor);
        setInterval(this.changeLights, 1000);
        Canvas.drawn = true;
    }
    static changeLights() {
        Canvas.context.putImageData(Canvas.behindLightsOne, Canvas.ratios["lights"][0] * Canvas.width, Canvas.ratios["lights"][1] * Canvas.height);
        const shrinkFactor = Canvas.width / Canvas.maxWidth;
        Canvas.context.drawImage(Canvas.lights, Canvas.xLights1 * Canvas.lights.width / 3, 0, Canvas.lights.width / 3, Canvas.lights.height, Canvas.ratios["lights"][0] * Canvas.width, Canvas.ratios["lights"][1] * Canvas.height, Canvas.lights.width * shrinkFactor / 3, Canvas.lights.height * shrinkFactor);
        console.log(Canvas.xLights1);
        Canvas.xLights1 < 2
            ? Canvas.xLights1++
            : Canvas.xLights1 = 0;
    }
}
Canvas.drawn = false;
Canvas.maxWidth = 916;
Canvas.maxHeight = 623;
Canvas.widthToHeightRatio = Canvas.maxWidth / Canvas.maxHeight;
Canvas.heightToWidthRatio = Canvas.maxHeight / Canvas.maxWidth;
// How far left is it, how far down, 
// Do divisions once?
Canvas.ratios = {
    "safe1": [(50 / Canvas.maxWidth), (173 / Canvas.maxHeight)],
    "safe2": [(220 / Canvas.maxWidth), (173 / Canvas.maxHeight)],
    "safe3": [(390 / Canvas.maxWidth), (173 / Canvas.maxHeight)],
    "safe4": [(50 / Canvas.maxWidth), (320 / Canvas.maxHeight)],
    "safe5": [(220 / Canvas.maxWidth), (320 / Canvas.maxHeight)],
    "safe6": [(390 / Canvas.maxWidth), (320 / Canvas.maxHeight)],
    "safe7": [(50 / Canvas.maxWidth), (467 / Canvas.maxHeight)],
    "safe8": [(220 / Canvas.maxWidth), (467 / Canvas.maxHeight)],
    "safe9": [(390 / Canvas.maxWidth), (467 / Canvas.maxHeight)],
    "screen": [(578 / Canvas.maxWidth), (183 / Canvas.maxHeight)],
    "supportDial": [(582 / Canvas.maxWidth), (280 / Canvas.maxHeight)],
    "lights": [(582 / Canvas.maxWidth), (270 / Canvas.maxHeight)]
};
Canvas.lights = new Image();
Canvas.background = new Image();
Canvas.safe = new Image();
Canvas.screen = new Image();
Canvas.supportDial = new Image();
Canvas.images = [Canvas.lights, Canvas.background, Canvas.safe, Canvas.screen, Canvas.supportDial];
Canvas.count = Canvas.images.length;
Canvas.xLights1 = 1;
// //Testing custom event making
// this.supportDial.addEventListener('redraw', function(e){
//     console.log("triggered i think")
// })
// let event = new CustomEvent('redraw')
// this.supportDial.dispatchEvent(event)