let arrowUp = document.querySelectorAll('.move-up')[0],
  switchTheme = document.querySelectorAll('.switch > input[type="checkbox"]')[0],
  rangeTwoSpecial1,
  rangeTwoSpecial2,
  rangeTwoSpecial3,
  rangeTwoSpecial123,
  input,
  input2,
  div,
  count,
  bicerHoverColor = '#81e640',
  drawColor = '#ff0000',
  color0 = document.querySelectorAll('.color')[0],
  color = document.querySelectorAll('.color')[0].value,
  title = document.getElementsByTagName('title')[0].textContent,
  titleVersion = +title.match(/\d+(?=[.])/),
  bicer = document.getElementsByClassName('bicer'),
  indicator = document.getElementsByClassName('indicator'),
  rangeTwo = document.querySelectorAll('.range.two'),
  rangeLast = document.querySelector('.range.last:last-child'),
  fileSaveButton = document.querySelectorAll('.fileSave')[0],
  fileSaveJSONButton = document.querySelectorAll('.fileSaveJSON')[0],
  fileSavePDFButton = document.querySelectorAll('.fileSavePDF')[0],
  fileLoadButton = document.querySelectorAll('.fileLoad')[0],
  fileLoadButtonHide = document.querySelectorAll('.fileLoadHide')[0],
  htmlPage = document.getElementsByTagName('html')[0],
  drawButton = document.querySelectorAll('.drawButton')[0],
  clearButton = document.querySelectorAll('.clearButton')[0],
  drawAllButton = document.querySelectorAll('.drawAllButton')[0],
  colorView = document.querySelectorAll('.colorView')[0],
  drawButtonIsFocus = !0,
  clearButtonIsFocus = !1,
  colorViewIsFocus = !1,
  width = document.querySelectorAll('.width')[0],
  widthNormal = 7,
  isFinished = !1,
  drawAccept = !0,
  lineAccept = !1,
  pipette = !1,
  colors = {},
  z = 0;

function prettyLog(e) {
  0 == e
    ? console.log("‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾")
    : 180 == e && console.log("________________________________________");
}

function loadJSON() {
  let e = fileLoadButtonHide.files[0];
  if (null == e) return;
  if ("application/json" != e.type) {
    if ("" != e.type) {
      prettyLog(180), console.warn(e.type), console.warn(e.name), prettyLog(0);
      let t = e.type.match(/(?<=[/]).+/).toString();
      setTimeout(() => {
        alert(
          `You have selected the incorrect file type ${t.toUpperCase()} ( ⌒︹⌒ )\nTry opening anything kind of JSON-file`
        );
      }, 250);
    } else
      prettyLog(180),
        console.warn(e.name),
        prettyLog(0),
        setTimeout(() => {
          alert(
            "You have selected the incorrect file type ( ⌒︹⌒ )\nTry opening anything kind of JSON-file"
          );
        }, 250);
    return;
  }
  prettyLog(180), console.log(e.type);
  let t = new FileReader();
  t.readAsText(e),
    (t.onload = () => {
      let o = t.result,
        l = JSON.parse(o),
        r = -2;
      for (let t of l) {
        if (-2 == r) {
          let o = +t.match(/\d+/);
          if (titleVersion != o)
            return (
              console.warn(`${e.name} - ${t}`),
              prettyLog(0),
              void setTimeout(() => {
                alert(
                  `Perhaps you didn't change version of beads_save file ( ⌒︹⌒ )\nYou need v${titleVersion}, not a v${o}`
                );
              }, 250)
            );
          bicer = document.getElementsByClassName("bicer");
          for (let e = 0; e < bicer.length; e++)
            bicer[e].style.backgroundColor = "transparent";
          console.log(`${e.name} - ${t}`), prettyLog(0);
        } else
          -1 == r
            ? ((document.querySelectorAll(".width")[0].value = +t.match(/\d+/)),
              changeWidth())
            : (bicer[r].style.backgroundColor = t);
        r++;
      }
      setTimeout(() => {
        alert("All right! Keep up the good work ( ⌒‿⌒ )");
      }, 250);
    }),
    (t.onerror = () => {
      console.error(t.error),
        setTimeout(() => {
          alert("Something went wrong ( ⌒︹⌒ )");
        }, 250);
    });
}

function saveJSON() {
  bicer = document.getElementsByClassName("bicer");
  let e,
    t = [];
  for (let o = -2; o < bicer.length; o++)
    if (-2 == o) {
      let e = `v${titleVersion}`;
      t.push(e);
    } else if (-1 == o) {
      let e = `w${+document.querySelectorAll(".width")[0].value}`;
      t.push(e);
    } else
      (e = rgbToHexNums(
        findNums((e = window.getComputedStyle(bicer[o]).backgroundColor))
      )),
        t.push(e);
  let o = JSON.stringify(t),
    l = `beads_save_v${titleVersion}`,
    r = new File([o], l, { type: "application/json" }),
    n = document.querySelectorAll(".linkForSavingFile")[0];
  (n.href = URL.createObjectURL(r)),
    (n.download = l),
    n.click(),
    setTimeout(() => {
      alert("All right! Your file has been saved ( ⌒‿⌒ )");
    }, 250);
}

function savePDF() {
  print();
}

function rgbToHexNums(e) {
  let t = String(e.replace(/\d+/, "")),
    o = String(t.replace(/\d+/, "")),
    l = +e.match(/\d+/),
    r = +t.match(/\d+/),
    n = +o.match(/\d+/);
  return (
    (l = l.toString(16)),
    (r = r.toString(16)),
    (n = n.toString(16)),
    1 == l.length && (l = "0" + l),
    1 == r.length && (r = "0" + r),
    1 == n.length && (n = "0" + n),
    "#" + l + r + n
  );
}

function rgbToHex(e, t, o) {
  return (
    (e = e.toString(16)),
    (t = t.toString(16)),
    (o = o.toString(16)),
    1 == e.length && (e = "0" + e),
    1 == t.length && (t = "0" + t),
    1 == o.length && (o = "0" + o),
    "#" + e + t + o
  );
}

function findNums(e) {
  return String(e.match(/\d+/g));
}

function changeWidth() {
  let e = +document.querySelectorAll(".width")[0].value;
  if (e > widthNormal)
    if (e < 27) {
      for (let t = 0; t < e - widthNormal; t++) {
        for (let e = 0; e < rangeTwo.length; e++)
          ((input = document.createElement("span")).type = "button"),
            (input.className = "bicer"),
            rangeTwo[e].append(input);
        (div = document.createElement("div")).className = "range last";
        for (let e = 0; e < z + 8; e++)
          ((input2 = document.createElement("span")).type = "button"),
            (input2.className = "bicer"),
            div.append(input2);
        (rangeLast = document.querySelector(".range.last:last-child")).after(
          div
        ),
          "Earrings v2.0" == title ||
          "Earrings v5.0" == title ||
          "Earrings v9.0" == title
            ? ((div = div.cloneNode(div)), rangeLast.after(div))
            : ("Earrings v3.0" != title &&
                "Earrings v6.0" != title &&
                "Earrings v7.0" != title &&
                "Earrings v10.0" != title) ||
              ((div = div.cloneNode(div)),
              rangeLast.after(div),
              (div = div.cloneNode(div)),
              rangeLast.after(div)),
          "Earrings v7.0" == title
            ? ((rangeTwoSpecial1 = document.querySelectorAll(".special1")),
              (rangeTwoSpecial2 = document.querySelectorAll(".special2")))
            : "Earrings v8.0" == title || "Earrings v9.0" == title
            ? ((rangeTwoSpecial1 = document.querySelectorAll(".special1")),
              (rangeTwoSpecial2 = document.querySelectorAll(".special2")),
              (rangeTwoSpecial3 = document.querySelectorAll(".special3")))
            : "Earrings v10.0" == title &&
              (rangeTwoSpecial123 = document.querySelectorAll(".special123")),
          z++;
      }
      (widthNormal = e), start();
    } else document.querySelectorAll(".width")[0].value = 26;
  else if (e < widthNormal)
    if (e > 1) {
      for (let t = 0; t < Math.abs(e - widthNormal); t++) {
        for (let e = 0; e < rangeTwo.length; e++)
          document
            .querySelectorAll(".range.two > .bicer:last-child")
            [e].remove();
        (rangeLast = document.querySelector(".range.last:last-child")).remove(),
          "Earrings v2.0" == title ||
          "Earrings v5.0" == title ||
          "Earrings v9.0" == title
            ? (rangeLast = document.querySelector(
                ".range.last:last-child"
              )).remove()
            : ("Earrings v3.0" != title &&
                "Earrings v6.0" != title &&
                "Earrings v7.0" != title &&
                "Earrings v10.0" != title) ||
              ((rangeLast = document.querySelector(
                ".range.last:last-child"
              )).remove(),
              (rangeLast = document.querySelector(
                ".range.last:last-child"
              )).remove()),
          "Earrings v7.0" == title
            ? ((rangeTwoSpecial1 = document.querySelectorAll(".special1")),
              (rangeTwoSpecial2 = document.querySelectorAll(".special2")))
            : "Earrings v8.0" == title || "Earrings v9.0" == title
            ? ((rangeTwoSpecial1 = document.querySelectorAll(".special1")),
              (rangeTwoSpecial2 = document.querySelectorAll(".special2")),
              (rangeTwoSpecial3 = document.querySelectorAll(".special3")))
            : "Earrings v10.0" == title &&
              (rangeTwoSpecial123 = document.querySelectorAll(".special123")),
          z--;
      }
      (widthNormal = e), start();
    } else document.querySelectorAll(".width")[0].value = 2;
  if ("Earrings v7.0" != title || isFinished)
    if (("Earrings v8.0" != title && "Earrings v9.0" != title) || isFinished) {
      if ("Earrings v10.0" == title && !isFinished) {
        for (let e = 0; e < 4; e++)
          for (let e = 0; e < rangeTwoSpecial123.length; e++)
            document
              .querySelectorAll(".range.two.special123 > .bicer:last-child")
              [e].remove();
        isFinished = !0;
      }
    } else {
      for (let e = 0; e < 2; e++)
        for (let e = 0; e < rangeTwoSpecial3.length; e++)
          document
            .querySelectorAll(".range.two.special3 > .bicer:last-child")
            [e].remove();
      for (let e = 0; e < 4; e++)
        for (let e = 0; e < rangeTwoSpecial1.length; e++)
          document
            .querySelectorAll(".range.two.special1 > .bicer:last-child")
            [e].remove();
      for (let e = 0; e < 6; e++)
        for (let e = 0; e < rangeTwoSpecial2.length; e++)
          document
            .querySelectorAll(".range.two.special2 > .bicer:last-child")
            [e].remove();
      isFinished = !0;
    }
  else {
    for (let e = 0; e < 2; e++)
      for (let e = 0; e < rangeTwoSpecial1.length; e++)
        document
          .querySelectorAll(".range.two.special1 > .bicer:last-child")
          [e].remove();
    for (let e = 0; e < 4; e++)
      for (let e = 0; e < rangeTwoSpecial2.length; e++)
        document
          .querySelectorAll(".range.two.special2 > .bicer:last-child")
          [e].remove();
    isFinished = !0;
  }
}

function start() {
  color0.value = drawColor;
  color = document.querySelectorAll('.color')[0].value;
  
  for (let e = 0; e < bicer.length; e++) {
    (bicer[e].onmousedown = function (t) {
      if (drawAccept && 1 == t.which && !pipette) {
        (this.style.backgroundColor = color), (lineAccept = !0);
        for (let t = 0; t < bicer.length; t++) t == e && (colors[t] = color);
      }
      if (drawAccept || 1 != t.which || pipette)
        if (pipette && "#81e640" != bicerHoverColor) {
          let t = findNums(
            (color = window.getComputedStyle(bicer[e]).backgroundColor)
          );
          (color0.value = rgbToHexNums(t)), (pipette = !1), drawButton.click();
        } else {
          pipette && "#81e640" == bicerHoverColor
            ? ((color = "transparent"), drawButton.click())
            : pipette && ((pipette = !1), drawButton.click());
        }
      else {
        (this.style.backgroundColor = "transparent"), (lineAccept = !0);
        for (let t = 0; t < bicer.length; t++) t == e && delete colors[t];
      }
      pipette ||
        "cell" != window.getComputedStyle(this).cursor ||
        (bicer[e].style.cursor = "crosshair");
    }),
      (bicer[e].onmouseover = function () {
        let t = findNums(window.getComputedStyle(this).backgroundColor);
        if (
          ((bicerHoverColor = rgbToHexNums(t)),
          lineAccept && drawAccept && !pipette)
        ) {
          this.style.backgroundColor = color;
          for (let t = 0; t < bicer.length; t++) t == e && (colors[t] = color);
        } else if (lineAccept && !pipette) {
          this.style.backgroundColor = "transparent";
          for (let t = 0; t < bicer.length; t++) t == e && delete colors[t];
        } else if (pipette && "#81e640" != bicerHoverColor) {
          let e = findNums(
            (color = window.getComputedStyle(this).backgroundColor)
          );
          color0.value = rgbToHexNums(e);
        } else
          pipette && "#81e640" == bicerHoverColor && (color0.value = "transparent");
      }),
      (bicer[e].onmousemove = function () {
        if (!pipette && "cell" == window.getComputedStyle(this).cursor)
          for (let e = 0; e < bicer.length; e++)
            bicer[e].style.cursor = "crosshair";
      }),
      (bicer[e].onmouseup = function () {
        (lineAccept = !1),
          (pipette = !1),
          0 != Object.keys(colors).length && count != Object.keys(colors).length
            ? (console.log("Total - " + Object.keys(colors).length),
              (count = Object.keys(colors).length))
            : 0 == Object.keys(colors).length && console.log("Total - 0");
      });
  }
}

(document.body.onload = function () {
  start(), 
  changeWidth(), 
  (drawButton.style.backgroundColor = "#7aff81");
}),
(document.body.onerror = function () {
  setTimeout(() => {
    alert("Something went wrong ( ⌒︹⌒ )\nThere was an error");
  }, 250);
}),
(document.body.onmousemove = function (e) {
  0 == e.which && (lineAccept = !1);
}),
(width.onchange = changeWidth),
(color0.oninput = function () {
  (color = document.querySelectorAll(".color")[0].value),
  (drawAccept = !0),
  (pipette = !1);
}),
(drawAllButton.onmouseover = function () {
  drawAllButton.style.backgroundColor = "#7073ff";
}),
(drawButton.onmouseover = function () {
  drawButton.style.backgroundColor = "#7073ff";
}),
(clearButton.onmouseover = function () {
  clearButton.style.backgroundColor = "#7073ff";
}),
(colorView.onmouseover = function () {
  colorView.style.backgroundColor = "#7073ff";
}),
(drawAllButton.onmouseout = function () {
  drawAllButton.style.backgroundColor = "#a9aff1";
}),
(drawButton.onmouseout = function () {
  drawButton.style.backgroundColor = drawButtonIsFocus
    ? "#7aff81"
    : "#a9aff1";
}),
(clearButton.onmouseout = function () {
  clearButton.style.backgroundColor = clearButtonIsFocus
    ? "#7aff81"
    : "#a9aff1";
}),
(colorView.onmouseout = function () {
  colorView.style.backgroundColor = colorViewIsFocus ? "#7aff81" : "#a9aff1";
}),
(drawButton.onclick = function () {
  (drawAccept = !0),
    (clearButtonIsFocus = !1),
    (colorViewIsFocus = !1),
    (drawButtonIsFocus = !0) &&
      ((drawButton.style.backgroundColor = "#7aff81"),
      (clearButton.style.backgroundColor = "#a9aff1"),
      (colorView.style.backgroundColor = "#a9aff1"));
}),
(clearButton.onclick = function () {
  (drawAccept = !1),
    (drawButtonIsFocus = !1),
    (colorViewIsFocus = !1),
    (clearButtonIsFocus = !0) &&
      ((drawButton.style.backgroundColor = "#a9aff1"),
      (clearButton.style.backgroundColor = "#7aff81"),
      (colorView.style.backgroundColor = "#a9aff1"));
}),
(colorView.onclick = function () {
  if (pipette) {
    if (pipette) {
      for (let e = 0; e < bicer.length; e++)
        bicer[e].style.cursor = "crosshair";
      pipette = !1;
    }
  } else {
    for (let e = 0; e < bicer.length; e++) bicer[e].style.cursor = "cell";
    pipette = !0;
  }
  (drawButtonIsFocus = !1),
    (clearButtonIsFocus = !1),
    (colorViewIsFocus = !0) &&
      ((drawButton.style.backgroundColor = "#a9aff1"),
      (clearButton.style.backgroundColor = "#a9aff1"),
      (colorView.style.backgroundColor = "#7aff81"));
}),
(drawAllButton.onclick = function () {
  for (let e = 0; e < bicer.length; e++)
    e >= bicer.length - indicator.length ||
      (bicer[e].style.backgroundColor = color);
  (pipette = !1), drawButton.click();
}),
(color0.onclick = function () {
  drawButton.click();
}),
(fileSaveButton.onclick = function () {
  "none" == fileSaveJSONButton.style.display &&
  "none" == fileSavePDFButton.style.display
    ? ((fileSaveJSONButton.style.display = "block"),
      (fileSavePDFButton.style.display = "block"))
    : ((fileSaveJSONButton.style.display = "none"),
      (fileSavePDFButton.style.display = "none"));
}),
(fileSaveJSONButton.onmousedown = function () {
  (fileSaveJSONButton.style.display = "none"),
    (fileSavePDFButton.style.display = "none"),
    setTimeout(saveJSON, 100);
}),
(fileSavePDFButton.onmousedown = function () {
  (fileSaveJSONButton.style.display = "none"),
    (fileSavePDFButton.style.display = "none"),
    setTimeout(savePDF, 100);
}),
(fileLoadButtonHide.onchange = function () {
  loadJSON();
}),
(fileLoadButton.onclick = function () {
  fileLoadButtonHide.click();
}),
(htmlPage.oncontextmenu = function () {
  return !1;
}),
(htmlPage.ondragstart = function () {
  return !1;
});

arrowUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}),
switchTheme.addEventListener('change', () => {
  let allElems = document.querySelectorAll(".tools1 > *, .tools2 > *");

  if (switchTheme.checked) {
    document.body.classList.add('theme--dark');
    for (let i = 0; i < allElems.length; i++) {
      if (allElems[i].classList == "drawAllButton" 
        || "colorView" 
        || "drawButton" 
        || "clearButton") {
        allElems[i].classList.add('theme--semidark');
      }
      else {
        allElems[i].classList.add('theme--dark');
      }
    }
  }

  else if (!switchTheme.checked) {
    document.body.classList.remove('theme--dark');
    for (let i = 0; i < allElems.length; i++) {
      if (allElems[i].classList == "drawAllButton" 
        || "colorView" 
        || "drawButton" 
        || "clearButton") {
        allElems[i].classList.remove('theme--semidark');
      }
      else {
        allElems[i].classList.remove('theme--dark');
      }
    }
  }
}),
window.addEventListener('scroll', () => {
  if (arrowUp.classList == 'move-up invisible'
    && 100 <= document.documentElement.scrollTop) {
    arrowUp.classList.remove('invisible');
  }

  if (arrowUp.classList == 'move-up animated' 
    && 0 !== document.documentElement.scrollTop
    && 100 <= document.documentElement.scrollTop) {
    arrowUp.classList.remove('animated');
  }

  if (arrowUp.classList == 'move-up' 
    && 0 === document.documentElement.scrollTop) {
    arrowUp.classList.add('animated');
  }
});
