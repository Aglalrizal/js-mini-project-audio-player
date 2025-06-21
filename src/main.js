import { convertTime } from "./utils";

const audioContext = window.AudioContext ?? window.webkitAudioContext;
const audioCtx = new AudioContext();

const audioElement = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const volumeSlider = document.getElementById("volume");
const seeker = document.getElementById("seeker");
const time = document.getElementById("time");
const duration = document.getElementById("duration");

const audioSource = audioCtx.createMediaElementSource(audioElement);

window.addEventListener("load", () => {
  time.textContent = convertTime(audioElement.currentTime);
  duration.textContent = convertTime(audioElement.duration);
});

playBtn.addEventListener("click", (e) => {
  const targetEl = e.target;
  if (audioCtx.state == "suspended") {
    audioCtx.resume();
  }
  if (targetEl.getAttribute("class") === "paused") {
    audioElement.play();
    targetEl.setAttribute("class", "playing");
  } else if (targetEl.getAttribute("class") == "playing") {
    audioElement.pause();
    targetEl.setAttribute("class", "paused");
  }
});

const gainNode = audioCtx.createGain();

volumeSlider.addEventListener("input", () => {
  gainNode.gain.value = volumeSlider.value;
});

audioSource.connect(gainNode).connect(audioCtx.destination);
