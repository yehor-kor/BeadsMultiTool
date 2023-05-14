let arrowUp = document.querySelectorAll('.move-up')[0],
  switchTheme = document.querySelectorAll('.switch > input[type="checkbox"]')[0],
  color0 = document.querySelectorAll('.color')[0],
  color = document.querySelectorAll('.color')[0].value,
  title = document.getElementsByTagName('title')[0].textContent,
  titleVersion = +title.match(/\d+(?=[.])/),
  bicer = document.getElementsByClassName('bicer'),
  indicator = document.querySelectorAll('.bicer--indicator'),
  indicatorCount = document.querySelectorAll('.count'),
  digitsColor = document.querySelectorAll('.digits'),
  description = document.querySelectorAll('.description')[0],
  row = document.querySelectorAll('.row'),
  rowLast = document.querySelector('.row:last-child'),
  rowUp = document.querySelectorAll('.up .row'),
  rowUpLast = document.querySelector('.up .row:last-child'),
  rowDown = document.querySelectorAll('.down .row'),
  rowDownLast = document.querySelector('.down .row:last-child'),
  fileSaveButton = document.querySelectorAll('.fileSave')[0],
  fileSaveJSONButton = document.querySelectorAll('.fileSaveJSON')[0],
  fileSavePDFButton = document.querySelectorAll('.fileSavePDF')[0],
  fileSaveTXTButton = document.querySelectorAll('.fileSaveTXT')[0],
  fileLoadButton = document.querySelectorAll('.fileLoad')[0],
  fileLoadButtonHide = document.querySelectorAll('.fileLoadHide')[0],
  htmlPage = document.getElementsByTagName('html')[0],
  drawButton = document.querySelectorAll('.drawButton')[0],
  clearButton = document.querySelectorAll('.clearButton')[0],
  drawAllButton = document.querySelectorAll('.drawAllButton')[0],
  colorView = document.querySelectorAll('.colorView')[0],
  width = document.querySelectorAll('.width')[0],
  length = document.querySelectorAll('.length')[0],
  step = document.querySelectorAll('.step')[0],
  amount = document.querySelectorAll('.amount')[0],
  pattern = document.querySelectorAll('.pattern')[0],
  digitsView = document.querySelectorAll('.digitsView')[0],
  amountButton = document.querySelectorAll('.amountButton')[0],
  patternButton = document.querySelectorAll('.patternButton')[0],
  digitsViewButton = document.querySelectorAll('.digitsViewButton')[0],
  widthNormal = 7,
  lengthNormal = 1,
  stepNormal = 0,
  drawButtonIsFocus = !0,
  clearButtonIsFocus = !1,
  colorViewIsFocus = !1,
  bicerHoverColor = '#81e640',
  drawColor = '#00c8ff',
  isFinished = !1,
  drawAccept = !0,
  lineAccept = !1,
  pipette = !1,
  isBeginning = !0,
  isLastBeginning = !0,
  alphabet = 'abcdefghijklmnopqrstuvwxyz',
  colors = {},
  typesOfColor = {},
  lettersOfColor = {},
  dictationColors1 = [],
  dictationColors2 = [],
  z = 0,
  rowSpecial1,
  rowSpecial2,
  rowSpecial3,
  rowSpecial123,
  rowDiv,
  input,
  count;

function prettyLog(e) {
  0 == e
    ? console.log('‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾')
    : 180 == e && console.log('________________________________________');
}

function loadJSON() {
  let e = fileLoadButtonHide.files[0];

  if (e === null) return;
  if ('application/json' != e.type) {
    if ('' != e.type) {
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
            'You have selected the incorrect file type ( ⌒︹⌒ )\nTry opening anything kind of JSON-file'
          );
        }, 250);
    return;
  }
  
  prettyLog(180);
  console.log(e.type);

  let t = new FileReader();

  t.readAsText(e),
    (t.onload = () => {
      let o = t.result,
        l = JSON.parse(o),
        r = -5;
      for (let t of l) {
        if (-5 == r) {
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
          bicer = document.getElementsByClassName('bicer');
          for (let e = 0; e < bicer.length; e++)
            bicer[e].style.backgroundColor = 'transparent';
          console.log(`${e.name} - ${t}`), prettyLog(0);
        } else if (-4 == r) {
          document.querySelectorAll('.width')[0].value = +t.match(/\d+/);
          changeWidth();
        } else if (-3 == r) {
          document.querySelectorAll('.length')[0].value = +t.match(/\d+/);
          changeLength();
        } else if (-2 == r) {
          document.querySelectorAll('.step')[0].value = +t.match(/\d+/);
          changeStep();
        } else if (-1 == r) {
          if (+t.match(/\d+/) == 1) {
            document.querySelectorAll('.amount')[0].checked = false;
            document.querySelectorAll('.field')[1].classList.add('invisible');
          }
          if (+t.match(/\d+/) == 2) {
            document.querySelectorAll('.amount')[0].checked = true;
            document.querySelectorAll('.field')[1].classList.remove('invisible');
          }
        } else {
          if (t == '#000000') {
            bicer[r].style.backgroundColor = 'transparent';
          } else {
            bicer[r].style.backgroundColor = t;
          }

          colors[r] = t;
        }
        r++;
      }
      setTimeout(() => {
        alert('All right! Keep up the good work ( ⌒‿⌒ )');
      }, 250);
    }),
    (t.onerror = () => {
      console.error(t.error),
        setTimeout(() => {
          alert('Something went wrong ( ⌒︹⌒ )');
        }, 250);
    });

  countTypesOfColor();
  fillIndicator();
}

function saveJSON() {
  let saveFileName = prompt('Please, name your save', `beads`);

  if (saveFileName === null || saveFileName.trim() === '') {
    return;
  } else {
    let e;
    let t = [];

    width = document.querySelectorAll('.width')[0];
    length = document.querySelectorAll('.length')[0];
    step = document.querySelectorAll('.step')[0];
    bicer = document.getElementsByClassName('bicer');

    let bicerLength = bicer.length - indicator.length;

    if (!amount.checked) bicerLength /= 2;

    for (let o = -5; o < bicerLength; o++) {
      if (-5 == o) {
        let e = `v${titleVersion}`;
        t.push(e);
      } else if (-4 == o) {
        let e = `w${+width.value}`;
        t.push(e);
      } else if (-3 == o) {
        let e = `l${+length.value}`;
        t.push(e);
      } else if (-2 == o) {
        let e = `s${+step.value}`;
        t.push(e);
      } else if (-1 == o) {
        let e = `mod${+amount.checked + 1}`;
        t.push(e);
      } else {
        if (window.getComputedStyle(bicer[o]).backgroundColor == '#000000') {
          e = '#ffffff';
        }
        else {
          e = rgbToHexNums(
            findNums(e = window.getComputedStyle(bicer[o]).backgroundColor)
          );
        }
        t.push(e);
      }
    }
    let o = JSON.stringify(t),
      l = `${saveFileName.trim()}_v${titleVersion}`,
      r = new File([o], l, { type: "application/json" }),
      n = document.querySelectorAll(".linkForSavingFile")[0];
    (n.href = URL.createObjectURL(r)),
    (n.download = l),
    n.click(),
    setTimeout(() => {
      alert('All right! Your file has been saved ( ⌒‿⌒ )');
    }, 250);
  }
}

function savePDF() {
  let blocks = ['header', 'tools1', 'tools2', 'menu-file', 'move-up'];

  blocks.forEach(e => {
    document.querySelector(`.${e}`).classList.add('invisible');
  });

  print();

  blocks.forEach(e => {
    document.querySelector(`.${e}`).classList.remove('invisible');
  });
}

function countTypesOfColor() {
  typesOfColor = {};
  lettersOfColor = {};

  for (let i = 0; i < indicator.length - 1; i++) {
    indicator[i].style.backgroundColor = 'transparent';
    indicatorCount[i].textContent = '';
  }

  for (const [k, v] of Object.entries(colors)) {
    if (!typesOfColor[v]) {
      typesOfColor[v] = 1;
    } else {
      typesOfColor[v] += 1;
    }
  }

  let count = 0;

  for (const [k, v] of Object.entries(typesOfColor)) {
    let i = alphabet[count].toUpperCase();

    if (!lettersOfColor[i]) {
      lettersOfColor[i] = k;
      indicatorCount[count].textContent = `x${v}`;
      indicatorCount[count].style.visibility = 'visible';
      digitsColor[count].style.visibility = 'visible';
    }
    
    count++;
  }

  for (let i = 0; i < indicator.length; i++) {
    if (indicatorCount[i].textContent === 'x0') {
      indicatorCount[i].textContent = '';
      indicatorCount[i].style.visibility = 'hidden';
      digitsColor[i].value = '';
      digitsColor[i].style.visibility = 'hidden';
    }
  }
}

function fillIndicator() {
  let i = 0;

  for (let key in typesOfColor) {
    indicator[i].style.backgroundColor = key;
    i++;
  }

  if (i >= Object.keys(typesOfColor).length) {
    indicator[i].style.backgroundColor = 'transparent';
  }
}

function doPattern(action = 'do') {
  if (action === 'do') {
    for (let i = 0; i < bicer.length - indicator.length; i++) {
      bicer[i].textContent = 'Z';
    }
    
    for (let i = 0; i < bicer.length; i++) {
      let tmp = rgbToHexNums(findNums(bicer[i].style.backgroundColor));

      for (const [k, v] of Object.entries(lettersOfColor)) {
        if (tmp === v) {
          bicer[i].textContent = k;
        } else if (tmp === '#000000' && i < bicer.length - indicator.length) {
          bicer[i].textContent = 'Z';
        }
      }
    }

    description.style.display = 'flex';

    checkContrast();
  } else if (action === 'undo') {
    for (let i = 0; i < bicer.length; i++) {
      bicer[i].textContent = '';
    }

    description.style.display = 'none';
  }
}

function doDigits(action = 'do') {
  if (action === 'do') {
    let e = +document.querySelectorAll('.step')[0].value;
    let f = +document.querySelectorAll('.width')[0].value;
    let g = +document.querySelectorAll('.length')[0].value;
    let bicerDown1 = document.querySelectorAll('.field:nth-child(1) .down .bicer');
    let bicerDown2 = document.querySelectorAll('.field:nth-child(2) .down .bicer');
    let countRowSteps = g - e * (f / 2);
    let countTheSame = 1;
    let countRows = 1;
    let countColumns = 1;
    let isMidpoint = false;
    
    toRead('notxt');

    for (let i = 0; i < bicer.length; i++) {
      bicer[i].textContent = '';
    }
    
    for (let i = 1; i < dictationColors1.length; i++) {
      let pos = (countColumns - 1) * f + (countRows - 1);

      if (dictationColors1[i - 1] !== dictationColors1[i] || countColumns === countRowSteps) {
        bicerDown1[pos].textContent = `${countTheSame}`;
        countTheSame = 1;
        countColumns++;
      } else {
        countTheSame++;
        countColumns++;
      }

      if (countColumns - 1 === countRowSteps) {
        if (countRowSteps !== g && !isMidpoint) {
          countRowSteps += e;
        } else {
          countRowSteps -= e;
          isMidpoint = true;
        }

        countRows++;
        countTheSame = 1;
        countColumns = 1;
      }
    }

    bicerDown1[g * f - 1].textContent = `${countTheSame}`;

    countRowSteps = g - e * (f / 2);
    countTheSame = 1;
    countRows = 1;
    countColumns = 1;
    isMidpoint = false;

    for (let i = 1; i < dictationColors2.length; i++) {
      let pos = (countColumns - 1) * f + (countRows - 1);

      if (dictationColors2[i - 1] !== dictationColors2[i] || countColumns === countRowSteps) {
        bicerDown2[pos].textContent = `${countTheSame}`;
        countTheSame = 1;
        countColumns++;
      } else {
        countTheSame++;
        countColumns++;
      }

      if (countColumns - 1 === countRowSteps) {
        if (countRowSteps !== g && !isMidpoint) {
          countRowSteps += e;
        } else {
          countRowSteps -= e;
          isMidpoint = true;
        }

        countRows++;
        countTheSame = 1;
        countColumns = 1;
      }
    }

    bicerDown2[g * f - 1].textContent = `${countTheSame}`;

    checkContrast();
  } else if (action === 'undo') {
    for (let i = 0; i < bicer.length; i++) {
      bicer[i].textContent = '';
    }
  }
}

function getContrastColor(color) {
  if (color.charAt(0) === '#') {
    color = color.substr(1);
  }
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }

  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white depending on the luminance
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

function checkContrast() {
  for (let i = 0; i < bicer.length; i++) {
    let bgColor = rgbToHexNums(findNums(bicer[i].style.backgroundColor));
    
    if (!(i in colors) && i < bicer.length - indicator.length) {
      bgColor = '#ffffff';
    }

    let contrastColor = getContrastColor(bgColor);

    bicer[i].style.color = contrastColor;
  }
}

function rgbToHexNums(e) {
  let t = String(e.replace(/\d+/, '')),
    o = String(t.replace(/\d+/, '')),
    l = +e.match(/\d+/),
    r = +t.match(/\d+/),
    n = +o.match(/\d+/);
  return (
    (l = l.toString(16)),
    (r = r.toString(16)),
    (n = n.toString(16)),
    1 == l.length && (l = '0' + l),
    1 == r.length && (r = '0' + r),
    1 == n.length && (n = '0' + n),
    '#' + l + r + n
  );
}

function rgbToHex(e, t, o) {
  return (
    (e = e.toString(16)),
    (t = t.toString(16)),
    (o = o.toString(16)),
    1 == e.length && (e = '0' + e),
    1 == t.length && (t = '0' + t),
    1 == o.length && (o = '0' + o),
    '#' + e + t + o
  );
}

function findNums(e) {
  return String(e.match(/\d+/g));
}

function changeWidth() {
  let e = +document.querySelectorAll('.width')[0].value;
  rowUp = document.querySelectorAll('.up .row');
  rowDown = document.querySelectorAll('.down .row');
  
  if (e > widthNormal) {
    if (e <= 60) {
      for (let i = 0; i < e - widthNormal; i++) {
        for (let j = 0; j < rowDown.length; j++) {
          (input = document.createElement('span')),
            (input.className = 'bicer'),
            rowDown[j].append(input);
        }
        rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (let j = 0; j < z + 8; j++) {
          (input = document.createElement('span')),
            (input.className = 'bicer'),
            rowDiv.append(input);
        }
        rowUpLast = document.querySelectorAll('.up .row:last-child')[0].after(
          rowDiv
        );
        rowDiv = rowDiv.cloneNode(rowDiv);
        rowUpLast = document.querySelectorAll('.up .row:last-child')[1].after(
          rowDiv
        );
        'Earrings v2.0' == title
          ? (rowDiv = rowDiv.cloneNode(rowDiv),
          rowUpLast = document.querySelectorAll('.up .row:last-child')[0].after(rowDiv),
          rowDiv = rowDiv.cloneNode(rowDiv),
          rowUpLast = document.querySelectorAll('.up .row:last-child')[1].after(rowDiv))
          : ('Earrings v3.0' != title &&
              'Earrings v5.0' != title) ||
            (
                rowDiv = rowDiv.cloneNode(rowDiv), 
                rowUpLast = document.querySelectorAll('.up .row:last-child')[0].after(rowDiv),
                rowDiv = rowDiv.cloneNode(rowDiv),
                rowUpLast = document.querySelectorAll('.up .row:last-child')[1].after(rowDiv),
                rowDiv = rowDiv.cloneNode(rowDiv),
                rowUpLast = document.querySelectorAll('.up .row:last-child')[0].after(rowDiv),
                rowDiv = rowDiv.cloneNode(rowDiv),
                rowUpLast = document.querySelectorAll('.up .row:last-child')[1].after(rowDiv)
            ),
        'Earrings v5.0' == title &&
          (rowSpecial123 = document.querySelectorAll('.special123')),
        z++;
      }

      if ('Earrings v4.0' == title) {
        if (!isBeginning) {
          rowUpLast = document.querySelectorAll('.up .row:nth-last-child(2)')[0].remove();
          rowUpLast = document.querySelectorAll('.up .row:nth-last-child(2)')[1].remove();
        } else {
          isBeginning = false;
        }

        rowDiv = rowDiv.cloneNode(rowDiv);
        rowUpLast = document.querySelectorAll('.up .row:last-child')[0].after(rowDiv);
        rowDiv = rowDiv.cloneNode(rowDiv);
        rowUpLast = document.querySelectorAll('.up .row:last-child')[1].after(rowDiv);
      }

      widthNormal = e;
    }
  }
  else if (e < widthNormal) {
    if (e >= 2) {
      for (let i = 0; i < Math.abs(e - widthNormal); i++) {
        for (let j = 0; j < rowDown.length; j++) {
          document.querySelectorAll('.down .row .bicer:last-child')[j].remove();
        }
        rowUpLast = document.querySelectorAll('.up .row:last-child')[0].remove();
        rowUpLast = document.querySelectorAll('.up .row:last-child')[1].remove();
        'Earrings v2.0' == title
          ? (
            rowUpLast = document.querySelectorAll('.up .row:last-child')[0].remove(),
            rowUpLast = document.querySelectorAll('.up .row:last-child')[1].remove()
          )
          : ('Earrings v3.0' != title &&
              'Earrings v5.0' != title) ||
            (
              rowUpLast = document.querySelectorAll('.up .row:last-child')[0].remove(),
              rowUpLast = document.querySelectorAll('.up .row:last-child')[1].remove(),
              rowUpLast = document.querySelectorAll('.up .row:last-child')[0].remove(),
              rowUpLast = document.querySelectorAll('.up .row:last-child')[1].remove()
            ),
        'Earrings v5.0' == title &&
          (rowSpecial123 = document.querySelectorAll('.special123')),
        z--;
      }

      if ('Earrings v4.0' == title) {
        rowUpLast = document.querySelectorAll('.up .row:last-child')[0].remove();
        rowUpLast = document.querySelectorAll('.up .row:last-child')[1].remove();

        rowDiv = rowDiv.cloneNode(rowDiv);
        rowUpLast = document.querySelectorAll('.up .row:last-child')[0].after(rowDiv);
        rowDiv = rowDiv.cloneNode(rowDiv);
        rowUpLast = document.querySelectorAll('.up .row:last-child')[1].after(rowDiv);

        if (!isLastBeginning) {
          document.querySelectorAll('.up .row .bicer:last-child')[e * 2 + 1].remove();
          document.querySelectorAll('.up .row .bicer:last-child')[e].remove();
        } else {
          isLastBeginning = false;
        }
      }

      widthNormal = e;
    }
  }
  if ('Earrings v5.0' == title && !isFinished) {
    for (let e = 0; e < 4; e++) {
      for (let e = 0; e < rowSpecial123.length; e++) {
        document.querySelectorAll('.row.special123 > .bicer:last-child')[e].remove();
      }
    }
    isFinished = !0;
  }

  start();
}

function changeLength() {
  let e = +document.querySelectorAll('.length')[0].value;
  rowDown = document.querySelectorAll('.down .row');

  if (e > lengthNormal) {
    if (e <= 150) {
      for (let i = 0; i < e - lengthNormal; i++) {
        rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (let j = 0; j < widthNormal; j++) {
          input = document.createElement('span');
          input.className = 'bicer';
          rowDiv.append(input);
        }
        document.querySelectorAll('.down')[0].insertAdjacentElement(
          'afterbegin', 
          rowDiv
        );
        rowDiv = rowDiv.cloneNode(rowDiv);
        document.querySelectorAll('.down')[1].insertAdjacentElement(
          'afterbegin', 
          rowDiv
        );
      }
      lengthNormal = e;
    }
  }
  else if (e < lengthNormal) {
    if (e >= 0) {
      for (let i = 0; i < Math.abs(e - lengthNormal); i++) {
        document.querySelectorAll('.down .row:first-child')[0].remove();
        if (e >= 1) {
          document.querySelectorAll('.down .row:first-child')[1].remove();
        }
        else {
          document.querySelectorAll('.down .row:first-child')[0].remove();
        }
      }
      lengthNormal = e;
    }
  }

  start();
}

function changeStep() {
  let e = +document.querySelectorAll('.step')[0].value;
  let f = +document.querySelectorAll('.width')[0].value;
  let g = +document.querySelectorAll('.length')[0].value;
  let rowDown1 = document.querySelectorAll('.field:nth-child(1) .down .row');
  let rowDown2 = document.querySelectorAll('.field:nth-child(2) .down .row');

  if (e === 0) {
    // Resetting down parts

    for (let i = 0; i < g; i++) {
      rowDown1[i].remove();
      rowDown2[i].remove();
    }

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < g; j++) {
        rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        for (let k = 0; k < f; k++) {
          input = document.createElement('span');
          input.className = 'bicer';
          rowDiv.append(input);
        }

        document.querySelectorAll('.down')[i].insertAdjacentElement('afterbegin', rowDiv);
      }
    }
  }
  else if (e > 0 && e <= 10) {
    // Clearing down parts
    for (let i = 0; i < g; i++) {
      rowDown1[i].remove();
      rowDown2[i].remove();
    }

    // Filling down parts as they were at start states
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < g; j++) {
        rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        for (let k = 0; k < f; k++) {
          input = document.createElement('span');
          input.className = 'bicer';
          rowDiv.append(input);
        }

        document.querySelectorAll('.down')[i].insertAdjacentElement('afterbegin', rowDiv);
      }
    }

    let countRows = 0;

    for (let i = 0; i < f * (f / 2 - 1); i++) {
      if (i % e === 0 && i >= e) countRows++;

      for (let j = f / 2 - 1; j > countRows; j--) {
        document.querySelectorAll(`.field:nth-child(1) .down .row:nth-last-child(${i + 1}) .bicer`)[0].remove();
        document.querySelectorAll(`.field:nth-child(2) .down .row:nth-last-child(${i + 1}) .bicer`)[0].remove();
        document.querySelectorAll(`.field:nth-child(1) .down .row:nth-last-child(${i + 1}) .bicer`)[0].remove();
        document.querySelectorAll(`.field:nth-child(2) .down .row:nth-last-child(${i + 1}) .bicer`)[0].remove();
      }
    }
  }

  start();
}

function toRead(action = 'txt') {
  let bicerDown1 = document.querySelectorAll('.field:nth-child(1) .down .bicer');
  let bicerDown2 = document.querySelectorAll('.field:nth-child(2) .down .bicer');
  let e = +document.querySelectorAll('.step')[0].value;
  let f = +document.querySelectorAll('.width')[0].value;
  let g = +document.querySelectorAll('.length')[0].value;
  let countRowSteps = g - e * (f / 2);
  let countRows = 0;
  let countColumns = 0;
  let isMidpoint = false;

  dictationColors1 = [];
  dictationColors2 = [];

  for (let i = 0; i < bicerDown1.length + f - 1; i += f) {
    if (countRows >= countRowSteps) {
      if (countRowSteps !== g && !isMidpoint) {
        countRowSteps += e;
      } else {
        countRowSteps -= e;
        isMidpoint = true;
      }

      countColumns++;
      i = countColumns;
      countRows = 0;
    }

    let t = findNums(bicerDown1[i].style.backgroundColor);
    let r = rgbToHexNums(t);

    if (r === '#000000') {
      dictationColors1.push('Z');
    }

    for (let j = 0; j < alphabet.length; j++) {
      if (lettersOfColor[alphabet[j].toUpperCase()] === r) {
        dictationColors1.push(alphabet[j].toUpperCase());
      }
    }
    
    countRows++;
  }

  countRowSteps = g - e * (f / 2);
  countRows = 0;
  countColumns = 0;
  isMidpoint = false;

  for (let i = 0; i < bicerDown2.length + f - 1; i += f) {
    
    if (countRows >= countRowSteps) {
      if (countRowSteps !== g && !isMidpoint) {
        countRowSteps += e;
      } else {
        countRowSteps -= e;
        isMidpoint = true;
      }

      countColumns++;
      i = countColumns;
      countRows = 0;
    }

    let t = findNums(bicerDown2[i].style.backgroundColor);
    let r = rgbToHexNums(t);

    if (r === '#000000') {
      dictationColors2.push('Z');
    }

    for (let j = 0; j < alphabet.length; j++) {
      if (lettersOfColor[alphabet[j].toUpperCase()] === r) {
        dictationColors2.push(alphabet[j].toUpperCase());
      }
    }
    
    countRows++;
  }
  
  // write in file
  if (action === 'txt') {
    toTextFile();
  }
}

function toTextFile() {
  let g = +document.querySelectorAll('.length')[0].value;
  let prevResult = '';
  let result = '';
  let countTheSame = 1;
  let countRows = 1;
  let countColumns = 1;
  
  for (let i = 1; i < dictationColors1.length; i++) {
    if (dictationColors1[i - 1] !== dictationColors1[i] || countColumns === g) {
      prevResult += `${countTheSame}${dictationColors1[i - 1]} `;
      countTheSame = 1;
      countColumns++;
    } else {
      countTheSame++;
      countColumns++;
    }

    if (countColumns - 1 === g) {
      result += `Row ${countRows} - ${prevResult}  \n`;
      prevResult = '';
      countRows++;
      countTheSame = 1;
      countColumns = 1;
    }
  }

  result += `Row ${countRows} - ${prevResult}${countTheSame}${dictationColors1[dictationColors1.length - 1]}  \n`;

  if (amount.checked) {
    prevResult = '';
    countTheSame = 1;
    countRows = 1;
    countColumns = 1;
    result += `\n`;

    for (let i = 1; i < dictationColors2.length; i++) {
      if (dictationColors2[i - 1] !== dictationColors2[i] || countColumns === g) {
        prevResult += `${countTheSame}${dictationColors2[i - 1]} `;
        countTheSame = 1;
        countColumns++;
      } else {
        countTheSame++;
        countColumns++;
      }

      if (countColumns - 1 === g) {
        result += `Row ${countRows} - ${prevResult}  \n`;
        prevResult = '';
        countRows++;
        countTheSame = 1;
        countColumns = 1;
      }
    }

    result += `Row ${countRows} - ${prevResult}${countTheSame}${dictationColors2[dictationColors2.length - 1]}  \n`;
  }

  let o = result,
    l = `beads_read_v${titleVersion}`,
    r = new File([o], l, { type: 'text/plain' }),
    n = document.querySelectorAll('.linkForSavingFile')[0];
  n.href = URL.createObjectURL(r);
  n.download = l;
  n.click();
}

function start() {
  color0.value = drawColor;
  color = document.querySelectorAll('.color')[0].value;
  drawButton.style.backgroundColor = '#7aff81';
  
  for (let e = 0; e < bicer.length - indicator.length; e++) {
    (bicer[e].onmousedown = function (t) {
      if (drawAccept && 0 === t.button && !pipette) {
        if (color[0] !== '#') {
          color = rgbToHexNums(findNums(color));
        }

        this.style.backgroundColor = color;
        lineAccept = !0;
        for (let t = 0; t < bicer.length; t++) t == e && (colors[t] = color);
      }
      if (drawAccept || 0 !== t.button || pipette) {
        if (pipette && '#81e640' != bicerHoverColor) {
          let t = findNums(
            (color = window.getComputedStyle(bicer[e]).backgroundColor)
          );
          (color0.value = rgbToHexNums(t)), (pipette = !1), drawButton.click();
        } else {
          pipette && '#81e640' == bicerHoverColor
            ? ((color = 'transparent'), drawButton.click())
            : pipette && ((pipette = !1), drawButton.click());
        }
      }
      else {
        (this.style.backgroundColor = 'transparent'), (lineAccept = !0);
        for (let t = 0; t < bicer.length; t++) t == e && delete colors[t];
      }
      pipette ||
        'cell' != window.getComputedStyle(this).cursor ||
        (bicer[e].style.cursor = 'crosshair');
    }),
    (bicer[e].onmouseover = function () {
      let t = findNums(window.getComputedStyle(this).backgroundColor);
      if (
        bicerHoverColor = rgbToHexNums(t),
        lineAccept && drawAccept && !pipette
      ) {
        this.style.backgroundColor = color;
        for (let t = 0; t < bicer.length; t++) t == e && (colors[t] = color);
      } else if (lineAccept && !pipette) {
        this.style.backgroundColor = 'transparent';
        for (let t = 0; t < bicer.length; t++) t == e && delete colors[t];
      } else if (pipette && '#81e640' != bicerHoverColor) {
        let e = findNums(
          color = window.getComputedStyle(this).backgroundColor
        );
        color0.value = rgbToHexNums(e);
      } else {
        pipette && '#81e640' == bicerHoverColor && (color0.value = 'transparent');
        this.style.backgroundColor = '#81e640';
      }
    }),
    (bicer[e].onmouseout = function() { 
      this.style.backgroundColor = (colors[e] !== color) && (!typesOfColor[colors[e]]) ? 'transparent' : (colors[e] === color) ? color : colors[e];
    }),
    (bicer[e].onmousemove = function () {
      if (!pipette && 'cell' == window.getComputedStyle(this).cursor) {
        for (let e = 0; e < bicer.length - indicator.length; e++) {
          bicer[e].style.cursor = 'crosshair';
        }
      }

      countTypesOfColor();
      fillIndicator();
    }),
    (bicer[e].onmouseup = function () {
      (lineAccept = !1),
      (pipette = !1),
      0 != Object.keys(colors).length && count != Object.keys(colors).length
        ? (console.log('Total - ' + Object.keys(colors).length),
          (count = Object.keys(colors).length))
          : 0 == Object.keys(colors).length && console.log('Total - 0');
      
      countTypesOfColor();
      fillIndicator();

      if (pattern.checked) {
        doPattern();
      }

      if (digitsView.checked) {
        doDigits();
      }
    });
  }
}

(window.onload = function () {
  changeWidth();
  changeLength();
  changeStep();
  start();
}),
(document.body.onerror = function () {
  setTimeout(() => {
    alert('Something went wrong ( ⌒︹⌒ )\nThere was an error');
  }, 250);
}),
(document.body.onmousemove = function (e) {
  0 === e.which && (lineAccept = !1);
}),
(width.onchange = changeWidth),
(length.onchange = changeLength),
(step.onchange = changeStep),
(color0.oninput = function () {
  (color = document.querySelectorAll('.color')[0].value),
  (drawAccept = !0),
  (pipette = !1);
}),
(drawAllButton.onmouseover = function () {
  drawAllButton.style.backgroundColor = '#7073ff';
}),
(drawButton.onmouseover = function () {
  drawButton.style.backgroundColor = '#7073ff';
}),
(clearButton.onmouseover = function () {
  clearButton.style.backgroundColor = '#7073ff';
}),
(colorView.onmouseover = function () {
  colorView.style.backgroundColor = '#7073ff';
}),
(drawAllButton.onmouseout = function () {
  drawAllButton.style.backgroundColor = '#cbcfff';
}),
(drawButton.onmouseout = function () {
  drawButton.style.backgroundColor = drawButtonIsFocus
    ? '#7aff81'
    : '#cbcfff';
}),
(clearButton.onmouseout = function () {
  clearButton.style.backgroundColor = clearButtonIsFocus
    ? '#7aff81'
    : '#cbcfff';
}),
(colorView.onmouseout = function () {
  colorView.style.backgroundColor = colorViewIsFocus ? '#7aff81' : '#cbcfff';
}),
(drawButton.onclick = function () {
  (drawAccept = !0),
  (clearButtonIsFocus = !1),
  (colorViewIsFocus = !1),
  (drawButtonIsFocus = !0) &&
    (
      (drawButton.style.backgroundColor = '#7aff81'),
      (clearButton.style.backgroundColor = '#cbcfff'),
      (colorView.style.backgroundColor = '#cbcfff')
    );
}),
(clearButton.onclick = function () {
  (drawAccept = !1),
  (drawButtonIsFocus = !1),
  (colorViewIsFocus = !1),
  (clearButtonIsFocus = !0) &&
    (
      (drawButton.style.backgroundColor = '#cbcfff'),
      (clearButton.style.backgroundColor = '#7aff81'),
      (colorView.style.backgroundColor = '#cbcfff')
    );
}),
(colorView.onclick = function () {
  if (pipette) {
    for (let e = 0; e < bicer.length - indicator.length; e++) {
      bicer[e].style.cursor = 'crosshair';
    }
    pipette = !1;
  } else {
    for (let e = 0; e < bicer.length - indicator.length; e++) {
      bicer[e].style.cursor = 'cell';
    }
    pipette = !0;
  }
  (drawButtonIsFocus = !1),
  (clearButtonIsFocus = !1),
  (colorViewIsFocus = !0) &&
    (
      (drawButton.style.backgroundColor = '#cbcfff'),
      (clearButton.style.backgroundColor = '#cbcfff'),
      (colorView.style.backgroundColor = '#7aff81')
    );
}),
(drawAllButton.onclick = function () {
  let bicerLength = bicer.length - indicator.length;

  if (!amount.checked) bicerLength /= 2;

  for (let e = 0; e < bicerLength; e++) {
    bicer[e].style.backgroundColor = color;
    colors[e] = color;
  }

  countTypesOfColor();
  fillIndicator();

  if (pattern.checked) {
    for (let i = 0; i < bicer.length; i++) {
      if (i < bicer.length - indicator.length + 1) {
        bicer[i].textContent = 'A';
      } else {
        bicer[i].textContent = '';
      }
    }

    checkContrast();
  }
  if (digitsView.checked) {
    doDigits();
  }

  pipette = !1;
  drawButton.click();
}),
(color0.onclick = function () {
  drawButton.click();
}),
(fileSaveButton.onclick = function () {
  'none' === fileSaveJSONButton.style.display &&
  'none' === fileSavePDFButton.style.display &&
  'none' === fileSaveTXTButton.style.display
    ? ((fileSaveJSONButton.style.display = 'block'),
      (fileSavePDFButton.style.display = 'block'),
      (fileSaveTXTButton.style.display = 'block'))
    : ((fileSaveJSONButton.style.display = 'none'),
      (fileSavePDFButton.style.display = 'none'),
      (fileSaveTXTButton.style.display = 'none'));
}),
(fileSaveJSONButton.onmousedown = function () {
  (fileSaveJSONButton.style.display = 'none'),
    (fileSavePDFButton.style.display = 'none'),
    (fileSaveTXTButton.style.display = 'none'),
    setTimeout(saveJSON, 100);
}),
(fileSavePDFButton.onmousedown = function () {
  (fileSaveJSONButton.style.display = 'none'),
    (fileSavePDFButton.style.display = 'none'),
    (fileSaveTXTButton.style.display = 'none'),
    setTimeout(savePDF, 100);
  }),
(fileSaveTXTButton.onmousedown = function () {
  (fileSaveJSONButton.style.display = 'none'),
    (fileSavePDFButton.style.display = 'none'),
    (fileSaveTXTButton.style.display = 'none'),
    setTimeout(toRead, 100);
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

switchTheme.addEventListener('change', () => {
  let allElems = document.querySelectorAll('.tools1 *, .tools2 *, .menu-file *');

  if (switchTheme.checked) {
    document.body.classList.add('theme--dark');
    for (let i = 0; i < allElems.length; i++) {
      if (allElems[i].classList == 'drawAllButton' 
        || 'colorView' 
        || 'drawButton' 
        || 'clearButton') {
        allElems[i].classList.add('theme--semidark');
      }
      else {
        allElems[i].classList.add('theme--dark');
      }
    }
  }
  else if (!switchTheme.checked) {
    document.body.classList.remove('theme--dark');
    document.body.removeAttribute('class');
    for (let i = 0; i < allElems.length; i++) {
      if (allElems[i].classList == 'drawAllButton' 
        || 'colorView' 
        || 'drawButton' 
        || 'clearButton') {
        allElems[i].classList.remove('theme--semidark');
      }
      else {
        allElems[i].classList.remove('theme--dark');
      }
    }
  }
}),
arrowUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}),
amount.addEventListener('change', () => {
  if (amount.checked) {
    document.querySelectorAll('.field')[1].classList.remove('invisible');
  } else if (!amount.checked) {
    document.querySelectorAll('.field')[1].classList.add('invisible');
  }
}),
pattern.addEventListener('change', () => {
  if (pattern.checked) {
    patternButton.style.backgroundColor = '#36fff2';
    digitsViewButton.style.backgroundColor = '#f6e63c';
    digitsView.checked = false;
    description.style.display = 'flex';
    doPattern();
  } else if (!pattern.checked) {
    doPattern('undo');
  }
}),
digitsView.addEventListener('change', () => {
  if (digitsView.checked) {
    digitsViewButton.style.backgroundColor = '#36fff2';
    patternButton.style.backgroundColor = '#f6e63c';
    pattern.checked = false;
    description.style.display = 'none';
    doDigits();
  } else if (!digitsView.checked) {
    doDigits('undo');
  }
}),
patternButton.onmouseover = function () {
  patternButton.style.backgroundColor = '#7aff81';
},
patternButton.onmouseout = function () {
  if (pattern.checked) {
    patternButton.style.backgroundColor = '#36fff2';
  } else if (!pattern.checked) {
    patternButton.style.backgroundColor = '#f6e63c';
  }
},
digitsViewButton.onmouseover = function () {
  digitsViewButton.style.backgroundColor = '#7aff81';
},
digitsViewButton.onmouseout = function () {
  if (digitsView.checked) {
    digitsViewButton.style.backgroundColor = '#36fff2';
  } else if (!digitsView.checked) {
    digitsViewButton.style.backgroundColor = '#f6e63c';
  }
},
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
