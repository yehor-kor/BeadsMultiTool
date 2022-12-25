let TOP = document.documentElement.scrollTop,
  ABOUT_ME = document.querySelector(".text > img").getBoundingClientRect().y,
  scrollToTop = document.querySelectorAll(".logo-text > span"),
  scrollToAboutMe = document.querySelector("#link-about"),
  arrowUp = document.querySelectorAll(".move-up")[0];

scrollToTop[0].addEventListener("click", () => {
  window.scrollTo({
    top: TOP,
    behavior: "smooth",
  });
}),
scrollToTop[1].addEventListener("click", () => {
  window.scrollTo({
    top: TOP,
    behavior: "smooth",
  });
}),
scrollToAboutMe.addEventListener("click", () => {
  (ABOUT_ME = document
    .querySelector(".text > img")
    .getBoundingClientRect().y),
    window.scrollBy({
      top: ABOUT_ME - 70,
      behavior: "smooth",
    });
}),
arrowUp.addEventListener("click", () => {
  window.scrollTo({
    top: TOP,
    behavior: "smooth",
  });
}),
window.addEventListener("scroll", () => {
  if (arrowUp.classList == "move-up invisible"
    && 200 <= document.documentElement.scrollTop) {
    arrowUp.classList.remove("invisible");
  }

  if (arrowUp.classList == "move-up animated" 
    && TOP !== document.documentElement.scrollTop
    && 200 <= document.documentElement.scrollTop) {
    arrowUp.classList.remove("animated");
  }

  else if (arrowUp.classList == "move-up" 
    && TOP === document.documentElement.scrollTop) {
    arrowUp.classList.add("animated");
  }
});
