class CustomVideoPlayer {
  constructor() {
    this.init();
    this.addListeners();
  }

  init() {
    this.videoPlayer = document.querySelector(".player__video");
    this.skipButtons = [...document.querySelectorAll("[data-skip]")];
    this.btnPlayVideo = document.querySelector(".toggle");
    this.inputVolume = document.querySelector("[name=volume]");
    this.inputSpeed = document.querySelector("[name=playbackRate]");
    this.progress = document.querySelector(".progress");
    this.progressFilled = document.querySelector(".progress__filled");

    this.videoPlayer.volume = Number(this.inputVolume.value);
    this.videoPlayer.playbackRate = Number(this.inputSpeed.value);
    this.progressFilled.style.flexBasis = 0;
    this.clickedProgress = false;
  }

  addListeners() {
    this.btnPlayVideo.addEventListener("click", this.toggleVideoPlayer);
    this.videoPlayer.addEventListener("click", this.toggleVideoPlayer);
    this.progress.addEventListener("click", this.changeProgressBar);
    this.skipButtons.forEach((item) => {
      item.addEventListener("click", this.skip);
    });
    this.inputVolume.addEventListener("change", this.changeVolume);
    this.inputSpeed.addEventListener("change", this.changePlaybackRate);
    this.progress.addEventListener(
      "mousemove",
      (ev) => this.clickedProgress && this.changeProgressBar(ev)
    );
    this.progress.addEventListener(
      "mousedown",
      () => (this.clickedProgress = true)
    );
    this.progress.addEventListener(
      "mouseup",
      () => (this.clickedProgress = false)
    );

    // oninput not work on IE10
    this.inputVolume.addEventListener("input", this.changeVolume);
    this.inputSpeed.addEventListener("input", this.changePlaybackRate);
  }

  skip = (ev) => {
    this.videoPlayer.currentTime += Number(ev.target.dataset.skip);
  };

  toggleVideoPlayer = () => {
    this.videoPlayer.paused ? this.playVideo() : this.pauseVideo();
  };

  playVideo() {
    this.btnPlayVideo.innerText = "||";
    this.videoPlayer.play();
  }

  pauseVideo() {
    this.btnPlayVideo.innerText = "►";
    this.videoPlayer.pause();
  }

  changePlaybackRate = (ev) => {
    this.videoPlayer.playbackRate = Number(ev.target.value);
  };

  changeVolume = (ev) => {
    this.videoPlayer.volume = Number(ev.target.value);
  };

  changeProgressBar = (ev) => {
    const percent = ev.offsetX / this.progress.offsetWidth;
    const spentVideoTime = percent * this.videoPlayer.duration;
    this.videoPlayer.currentTime = spentVideoTime;
    this.progressFilled.style.flexBasis = `${percent * 100}%`;
  };
}

const player = new CustomVideoPlayer();
