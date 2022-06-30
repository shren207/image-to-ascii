import lenna from "/lenna.png";
// https://en.wikipedia.org/wiki/Lenna (lenna : standard test image)
// * 따로 파일 업로드하지 않으며, local 에 있는 파일 사용

const MAX_MAGNITUDE = Math.sqrt(255 * 255 + 255 * 255 + 255 * 255);
// vector = magnitude 와 direction 을 가지는 객체

// const SHADES = [" ", ".", "-", "=", "+", "*", "%", "#", "@"];
const SHADES = [
  ".",
  "'",
  "`",
  "^",
  '"',
  ",",
  ":",
  ";",
  "I",
  "l",
  "!",
  "i",
  ">",
  "<",
  "~",
  "+",
  "_",
  "-",
  "?",
  "]",
  "[",
  "}",
  "{",
  "1",
  ")",
  "(",
  "|",
  "/",
  "t",
  "f",
  "j",
  "r",
  "x",
  "n",
  "u",
  "v",
  "c",
  "z",
  "X",
  "Y",
  "U",
  "J",
  "C",
  "L",
  "Q",
  "0",
  "O",
  "Z",
  "m",
  "w",
  "q",
  "p",
  "d",
  "b",
  "k",
  "h",
  "a",
  "o",
  "*",
  "#",
  "M",
  "W",
  "&",
  "8",
  "%",
  "B",
  "@",
  "$",
];

class AsciiArt {
  public static fromURL(rawurl: string) {
    // * url을 받아서 이미지를 return하는 메서드
    const image = new Image(); // * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image (creates a new HTMLImageElement)
    image.src = rawurl;
    return new AsciiArt(image);
  }

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

  constructor(public image: HTMLImageElement) {
    this.canvas = document.createElement("canvas"); // 타입 추론이 되기 때문에 타입 명시 생략 가능
    this.context = this.canvas.getContext("2d")!; // 타입 추론이 되기 때문에 타입 명시 생략 가능

    document.body.append(this.canvas); // * <div id="app"></div> 에 append하시지 않고 body에 append하셨다.
    image.addEventListener("load", () => {
      // * canvas의 width, height를 image의 width, height로 설정 => canvas 동적으로 결정됨
      this.canvas.width = image.width;
      this.canvas.height = image.height;
      this.render();
    });
  }

  // ! 이미지를 grayScale하지 않는다! (굳이 그럴 필요가 없었구나..)
  render() {
    // ? drawImage, getImageData 대한 공부 필요
    this.context.drawImage(this.image, 0, 0); // * 이미지를 canvas에 그림
    const { data } = this.context.getImageData(
      // * canvas에서 이미지를 얻어옴
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
    // * Uint8ClampedArray : 1차원 배열,
    // * 4n : R, 4n+1 : G, 4n+2 : B, 4n+3 : A
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height); // * 더 이상 이미지는 필요 없으므로 canvas에서 지움

    const fontSize = 9; // * fontSize가 적은 값일수록 Ascii Art가 더 정교하게 출력됨

    this.context.font = `${fontSize}px Monaco`; // * https://fontsgeek.com/monaco-font => monaco font 사용
    this.context.textBaseline = "top"; // * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline (예시 이미지 존재)
    this.context.textAlign = "left"; // * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign (예시 이미지 존재)

    const { width: textWidth } = this.context.measureText("A"); // ? measureText가 왜 필요한 거지?
    // console.log(textWidth); // * 6.0009765625 pixels

    const row = (this.canvas.width / fontSize) * 30; // * row의 크기만큼 loop가 돌아가기 때문에, 값이 커질수록 Ascii Art가 더 정교하게 출력됨
    const col = (this.canvas.height / textWidth) * 30; // * column의 크기만큼 loop가 돌아가기 때문에, 값이 커질수록 Ascii Art가 더 정교하게 출력됨
    const width = this.canvas.width / col;
    const height = this.canvas.width / row;

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        const x = j * width;
        const y = i * height;
        const cursor = (Math.floor(x) + Math.floor(y) * this.canvas.width) * 4; // ? 잘 모르겠음
        const r = data[cursor];
        const g = data[cursor + 1];
        const b = data[cursor + 2];
        const magnitude = Math.sqrt(r * r + g * g + b * b); // *  magnitude 값이 클 수록 밝은 색으로 출력됨
        const intensity = 1 - magnitude / MAX_MAGNITUDE; // * 0 ~ 1 사이의 값을 가짐

        this.context.fillStyle = `rgb(${r}, ${g}, ${b})`;
        // console.log(
        //   `Math.floor(SHADES.length * intensity) : ${Math.floor(
        //     SHADES.length * intensity
        //   )}`
        // );
        // * Math.floor(SHADES.length * intensity) => 0 ~ 9 사이의 값을 가짐
        this.context.fillText(
          // * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText (fillText는 fillStyle의 영향을 받는다)
          SHADES[Math.floor(SHADES.length * intensity)], // " ", ".", "-", "=", "+", "*", "%", "#", "@"
          x,
          y
        );
      }
    }
  }
}

AsciiArt.fromURL(lenna);
