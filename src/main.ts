import "./style.css";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Image to Ascii Art</h1>
  <p>
      <input type="file" />
  </p>    
  <canvas></canvas>
`;

class App {
  static instance: App;

  canvas: HTMLCanvasElement =
    document.querySelector<HTMLCanvasElement>("canvas")!;
  context: CanvasRenderingContext2D;
  fileInput: HTMLInputElement =
    document.querySelector<HTMLInputElement>('input[type="file"]')!;

  constructor() {
    App.instance = this; // Singleton Pattern

    this.canvas.width = window.innerWidth / 2;
    this.canvas.height = window.innerHeight / 2;
    this.canvas.style.backgroundColor = "white";

    this.context = this.canvas.getContext("2d")!;

    this.fileInput.addEventListener("change", this.fileInputChange);
  }

  fileInputChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.addEventListener("load", this.fileReaderLoad);
    reader.readAsDataURL(file);
  };

  fileReaderLoad = (event: Event) => {
    const image = new Image();
    image.addEventListener("load", this.imageLoad);
    image.src = (event.target as FileReader).result as string;
  };

  imageLoad = (event: Event) => {
    const image = event.target as HTMLImageElement;
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);

    // const imageData = this.context.getImageData(
    //   0,
    //   0,
    //   this.canvas.width,
    //   this.canvas.height
    // );
    // const data = imageData.data;
    // const ascii = " .:+*#%@";
    // for (let i = 0; i < data.length; i += 4) {
    //   const r = data[i];
    //   const g = data[i + 1];
    //   const b = data[i + 2];
    //   const gray = Math.floor(r * 0.3 + g * 0.59 + b * 0.11);
    //   const index = Math.floor((gray / 255) * (ascii.length - 1));
    //   data[i] = ascii.charCodeAt(index);
    //   data[i + 1] = ascii.charCodeAt(index);
    //   data[i + 2] = ascii.charCodeAt(index);
    // }
    // this.context.putImageData(imageData, 0, 0);
  };
}

window.addEventListener("load", () => {
  new App();
});
