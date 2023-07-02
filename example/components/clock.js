class ComponentClock extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = this.render()
    }

    static get observedAttributes() {
        return ["bind-second", "bind-minute", "bind-hour"];
    }

    attributeChangedCallback() {
        this.querySelector(".second").style.transform = `rotate(${this._degreeSecondHand()}deg)`;
        this.querySelector(".minute").style.transform = `rotate(${this._degreeMinuteHand()}deg)`;
        this.querySelector(".hour").style.transform = `rotate(${this._degreeHourHand()}deg)`;
    }

    _degreeSecondHand() {
        return parseInt(this.getAttribute("bind-second") * 6)
    }
    _degreeMinuteHand() {
        return parseInt(this.getAttribute("bind-minute") * 6);
    }

    _degreeHourHand() {
        return this.getAttribute("bind-hour") * 30;
    }

    render() {
        return `
<div class="component_clock">
  <style>${CSS}</style>
  <div class="clock">
    <div class="wrap">
      <span class="hour"></span>
      <span class="minute"></span>
      <span class="second"></span>
      <span class="dot"></span>
    </div>
  </div>
</div>`;
    }
}

window.customElements.define("component-clock", ComponentClock);

const CSS = `
.component_clock {
  display: flex;
  align-items: center;
  justify-content: center;
}

.clock {
  border-radius: 100%;
  background: #f2f2f2;
  border: 5px solid white;
  box-shadow: inset 2px 3px 8px 0 rgba(0, 0, 0, 0.1);
}

.minute, .hour, .second { border-radius: 3px; }

.wrap {
  overflow: hidden;
  position: relative;
  width: 350px;
  height: 350px;
  border-radius: 100%;
}

.minute,
.hour {
  position: absolute;
  height: 100px;
  width: 6px;
  margin: auto;
  top: -100px;
  left: 0;
  bottom: 0;
  right: 0;
  background: black;
  transform-origin: bottom center;
  transform: rotate(0deg);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.minute {
  position: absolute;
  height: 130px;
  width: 6px;
  top: -130px;
  left: 0;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
  transform: rotate(90deg);
}

.second {
  position: absolute;
  height: 130px;
  width: 2px;
  margin: auto;
  top: -130px;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 4px;
  background: #FF4B3E;
  transform-origin: bottom center;
  transform: rotate(180deg);
  z-index: 1;
}

.dot {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 5px;
  height: 5px;
  border-radius: 100px;
  background: white;
  border: 2px solid #1b1b1b;
  border-radius: 100px;
  margin: auto;
  z-index: 1;
}
`;
