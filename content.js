const url = window.location.href;
console.log("url: ", url);

let dragging = false;
let startX, startY, startRight, startBottom;

fetch("https://httpbin.org/post", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: url })
});

const avatar = document.createElement("div");
avatar.textContent = "👾";
avatar.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-size: 48px;
  cursor: grab;
  z-index: 999999;
`;

avatar.addEventListener("mousedown", (e) => {
  dragging = true;
  startX = e.clientX;
  startY = e.clientY;
  startRight = parseInt(avatar.style.right);
  startBottom = parseInt(avatar.style.bottom);
  avatar.style.transition = "none";
  avatar.style.cursor = "grabbing";
  e.preventDefault()
})

avatar.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  avatar.style.right = (startRight - dx) + "px"
  avatar.style.bottom = (startBottom - dy) + "px"
})

avatar.addEventListener("mouseup", () => {
  dragging = false
  avatar.style.cursor = "grab"
})

document.body.appendChild(avatar);
