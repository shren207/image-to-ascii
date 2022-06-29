import lenna from "/lenna.png";

const MAX_MAGNITUDE = Math.sqrt(255 * 255 + 255 * 255 + 255 * 255);
const SHADES = [" ", ".", "-", "=", "+", "*", "%", "#", "@"];

class AsciiArt {
  public static fromURL(rawurl: string) {
    const image = new Image();
    image.src = rawurl;
    return new AsciiArt(image);
  }

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(public image: HTMLImageElement) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d")!;

    document.body.append(this.canvas);
    image.addEventListener("load", () => {
      this.canvas.width = image.width;
      this.canvas.height = image.height;
      this.render();
    });
  }

  render() {
    this.context.drawImage(this.image, 0, 0);
    const { data } = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const fontSize = 12;

    this.context.font = `${fontSize}px Monaco`;
    this.context.textBaseline = "top";
    this.context.textAlign = "left";

    const { width: textWidth } = this.context.measureText("A");

    const row = (this.canvas.width / fontSize) * 1.5;
    const col = (this.canvas.height / textWidth) * 1.5;
    const width = this.canvas.width / col;
    const height = this.canvas.width / row;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const x = j * width;
        const y = i * height;
        const cursor = (Math.floor(x) + Math.floor(y) * this.canvas.width) * 4;
        const r = data[cursor];
        const g = data[cursor + 1];
        const b = data[cursor + 2];
        const magnitude = Math.sqrt(r * r + g * g + b * b);
        const intensity = 1 - magnitude / MAX_MAGNITUDE;

        this.context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        this.context.fillText(
          SHADES[Math.floor(SHADES.length * intensity)],
          x,
          y
        );
      }
    }
  }
}

AsciiArt.fromURL(lenna);
