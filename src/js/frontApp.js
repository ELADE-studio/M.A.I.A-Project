const bubble = document.querySelector(".bubble");
const outputArea = document.querySelector(".output-area");

outputArea.addEventListener("mouseover", () => {
  bubble.classList.toggle("writting");
});
