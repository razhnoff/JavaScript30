class WebcamHub {
  constructor() {
    this.init();
    this.addEventListeners();
  }

  init() {
    this.video = document.querySelector(".player");
    this.canvas = document.querySelector(".photo");
    this.ctx = this.canvas.getContext("2d");
    this.strip = document.querySelector(".strip");
    this.snap = document.querySelector(".snap");

    this.fileNameId = 0;

    this.getUserVideo();
  }

  getUserVideo() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    navigator.getUserMedia(
      { audio: false, video: true },
      (stream) => {
        this.video.srcObject = stream;
        this.video.play();
      },
      (err) => {
        console.log("Error " + err);
      }
    );
  }

  addEventListeners() {
    this.video.addEventListener("canplay", this.drawImage);
  }

  drawImage = () => {
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    setInterval(() => {
      this.ctx.drawImage(
        this.video,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      let data = this.ctx.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      for (let i = 0; i < data.data.length; i += 4) {
        data.data[i - 250] = data.data[i + 0];
        data.data[i + 500] = data.data[i + 1];
        data.data[i - 550] = data.data[i + 2];
      }
      this.ctx.putImageData(data, 0, 0);
    }, 0);
  };

  getFileName() {
    return `image_${this.fileNameId++}`;
  }

  takePhotoBridge() {
    const link = document.createElement("a");
    const imageData = this.canvas.toDataURL("image/png");
    link.href = imageData;
    link.setAttribute("download", this.getFileName());
    link.innerHTML = `<img src="${imageData}" alt="${this.getFileName()}_name"/>`;
    this.strip.prepend(link);
  }
}

const webcamInstance = new WebcamHub();

function takePhoto() {
  webcamInstance.takePhotoBridge();
}
