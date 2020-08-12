class CountDownTimer {
  constructor() {
    this.init();
    this.addListeners();
    this.destroy();
  }

  init() {
    this.buttons = [...document.querySelectorAll(".timer__button")];
    this.timeEndNode = document.querySelector(".display__end-time");
    this.timeLeftNode = document.querySelector(".display__time-left");
    this.form = document.querySelector("#custom");
    this.timeEndPhrase = "Be Back At";
  }

  addListeners() {
    this.buttons.forEach((item) => {
      item.addEventListener("click", (ev) => this.btnClickHandler(ev));
    });
    this.form.addEventListener("submit", (ev) => {
      this.submitHandler(ev);
    });
  }

  submitHandler(ev) {
    ev.preventDefault();
    const {
      target: {
        minutes: { value },
      },
    } = ev;
    const seconds = Number(value) * 60;

    this.setTimer(seconds);
    this.setEndTime(seconds);

    ev.target.reset();
  }

  btnClickHandler({
    target: {
      dataset: { time },
    },
  }) {
    const seconds = Number(time);

    this.setTimer(seconds);
    this.setEndTime(seconds);
  }

  setTimer(value) {
    let changedSeconds = value;

    clearInterval(this.timer);

    this.timer = setInterval(() => {
      changedSeconds--;
      this.setTimer(changedSeconds);

      if (changedSeconds === 0) {
        clearInterval(this.timer);
      }
    }, 1000);

    const minutes = Math.floor(changedSeconds / 60);
    const seconds = changedSeconds % 60;

    this.timeLeftNode.innerText = `${this.concatZero(
      minutes
    )}:${this.concatZero(seconds)}`;
  }

  setEndTime(value) {
    const endTime = new Date(Date.now() + value * 1000);

    this.timeEndNode.innerText = `${this.timeEndPhrase} ${this.concatZero(
      endTime.getHours()
    )}:${this.concatZero(endTime.getMinutes())}`;
  }

  concatZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  destroy() {
    this.buttons.forEach((item) => {
      item.removeEventListener("click", (ev) => this.btnClickHandler(ev));
    });
    this.form.removeEventListener("submit", (ev) => {
      this.submitHandler(ev);
    });
  }
}

const timer = new CountDownTimer();
