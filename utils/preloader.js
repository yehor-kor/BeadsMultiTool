let loader = document.querySelectorAll(".preloader")[0];

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.display = "none";
    document.body.classList.remove("hidden");
  }, 800);
});
