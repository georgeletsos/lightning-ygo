function directive(el) {
  el.addEventListener("mousedown", pulse);
}

function pulse(e) {
  const el = e.currentTarget;
  el.classList.add("animated", "pulse", "faster");
  el.addEventListener("animationend", handleAnimationEnd);
}

function handleAnimationEnd(e) {
  const el = e.currentTarget;
  el.classList.remove("animated", "pulse", "faster");
  el.removeEventListener("animationend", handleAnimationEnd);
}

export const Pulse = {
  bind: directive
};

export default Pulse;
