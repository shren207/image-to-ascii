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
    // * file upload를 이런식으로 하면 불편하다 (다른 방식이 있다)
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
    // 이미지 비율 유지
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
  };
}

window.addEventListener("load", () => {
  new App();
});
