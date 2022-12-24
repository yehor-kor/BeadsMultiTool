let TOP = document.querySelector("header").getBoundingClientRect().y,
  ABOUT_ME = document.querySelector(".text > img").getBoundingClientRect().y,
  scrollToTop = document.querySelectorAll(".logo-text > span"),
  scrollToAboutMe = document.querySelector("#link-about");

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
  });
