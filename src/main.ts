import "./style.css";
import "./AsciiArt.ts";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = `
  <h1>Image to Ascii Art</h1>
<!--  <p>-->
<!--      <input type="file" />-->
<!--  </p>    -->
<!--  <canvas></canvas>-->
`;

// const grayScale = `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,"^`'.`;

// class App {
//   static instance: App;
//
//   canvas: HTMLCanvasElement =
//     document.querySelector<HTMLCanvasElement>("canvas")!;
//   context: CanvasRenderingContext2D;
//   fileInput: HTMLInputElement =
//     document.querySelector<HTMLInputElement>('input[type="file"]')!;
//
//   constructor() {
//     App.instance = this; // Singleton Pattern
//
//     this.canvas.width = window.innerWidth / 2;
//     this.canvas.height = window.innerHeight / 2;
//     this.canvas.style.backgroundColor = "white";
//
//     this.context = this.canvas.getContext("2d")!;
//
//     this.fileInput.addEventListener("change", this.fileInputChange);
//   }
//
//   fileInputChange = (event: Event) => {
//     const file = (event.target as HTMLInputElement).files![0];
//     const reader = new FileReader();
//     // * file upload를 이런식으로 하면 불편하다 (다른 방식이 있다)
//     reader.addEventListener("load", this.fileReaderLoad);
//     reader.readAsDataURL(file);
//   };
//
//   fileReaderLoad = (event: Event) => {
//     const image = new Image();
//     image.addEventListener("load", this.imageLoad);
//     image.src = (event.target as FileReader).result as string;
//   };
//
//   imageLoad = (event: Event) => {
//     const image = event.target as HTMLImageElement;
//
//     // 이미지 비율 50% 축소
//     this.canvas.width = image.width / 2;
//     this.canvas.height = image.height / 2;
//     this.context.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
//
//     const toGrayScale = (r: number, g: number, b: number) =>
//       0.21 * r + 0.72 * g + 0.07 * b;
//
//     const convertToGrayScales = (
//       context: CanvasRenderingContext2D,
//       width: number,
//       height: number
//     ) => {
//       const imageData = context.getImageData(0, 0, width, height);
//       // 이러면 imageData를 픽셀로 조회가능함
//       console.log(imageData);
//
//       const grayScales = [];
//
//       for (let i = 0; i < imageData.data.length; i += 4) {
//         // ImageData.data의 3의 배수 index는 필요없는듯 => 0 ~ 2 배수 값만 필요로 하고 있음
//         // 3의 배수의 값들은 전부 255로 나옴
//         const r = imageData.data[i];
//         const g = imageData.data[i + 1];
//         const b = imageData.data[i + 2];
//
//         const grayScale = toGrayScale(r, g, b);
//         imageData.data[i] =
//           imageData.data[i + 1] =
//           imageData.data[i + 2] =
//             grayScale;
//         grayScales.push(grayScale);
//       }
//
//       context.putImageData(imageData, 0, 0);
//
//       return grayScales;
//     };
//     convertToGrayScales(this.context, this.canvas.width, this.canvas.height);
//   };
// }

// window.addEventListener("load", () => {
//   new App();
// });
