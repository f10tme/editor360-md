// line count
function getCursorLine(textarea) {
  var lines = textarea.value.substr(0, textarea.selectionStart).split("\n");
  return lines.length;
}

// variables
let editor360container = document.querySelector(".editor360"),
  editor360 = document.querySelector(".editor360 .editor"),
  preview360 = document.querySelector(".editor360 .preview"),
  maxScreenBtn = document.querySelector(
    ".editor360 .controlContainer .maxScreenBtn"
  ),
  fullScreenBtn = document.querySelector(
    ".editor360 .controlContainer .fullScreenBtn"
  ),
  horizontalBtn = document.querySelector(
    ".editor360 .controlContainer .horizontalBtn"
  ),
  clearBtn = document.querySelector(".editor360 .controlContainer .clearBtn"),
  nonePreviewBtn = document.querySelector(
    ".editor360 .controlContainer .nonePreviewBtn"
  ),
  noneEditorBtn = document.querySelector(
    ".editor360 .controlContainer .noneEditorBtn"
  ),
  switchBtn = document.querySelector(".editor360 .controlContainer .switchBtn");

// element
let input = document.createElement("input");
input.type = "hidden";
editor360container.parentNode.append(input);

// control bar functions
let maxScreenStatus = false;
maxScreenBtn.addEventListener("click", () => {
  if (maxScreenStatus == true) {
    document.exitFullscreen();
    maxScreenStatus = false;
  } else {
    editor360container.requestFullscreen();
    maxScreenStatus = true;
  }
});

fullScreenBtn.addEventListener("click", () => {
  editor360container.classList.toggle("active");
});

horizontalBtn.addEventListener("click", () => {
  editor360container.classList.toggle("horizontal");
});

clearBtn.addEventListener("click", () => {
  editor360.value = "";
  previewMD(editor360.value);
});

nonePreviewBtn.addEventListener("click", () => {
  nonePreviewBtn.classList.toggle("active");
  editor360container.classList.toggle("nonePreview");
});
noneEditorBtn.addEventListener("click", () => {
  noneEditorBtn.classList.toggle("active");
  editor360container.classList.toggle("noneEditor");
});

switchBtn.addEventListener("click", () => {
  nonePreviewBtn.classList.toggle("active");
  noneEditorBtn.classList.toggle("active");
  editor360container.classList.toggle("noneEditor");
  editor360container.classList.toggle("nonePreview");
});

// shorcut
document.body.addEventListener("keydown", (event) => {
  let key = event.keyCode,
    alt = event.altKey;
  if (alt) {
    if (key == 49) maxScreenBtn.click();
    else if (key == 50) fullScreenBtn.click();
    else if (key == 51) horizontalBtn.click();
    else if (key == 52) clearBtn.click();
    else if (key == 53) noneEditorBtn.click();
    else if (key == 54) nonePreviewBtn.click();
    else if (key == 55) switchBtn.click();
  }
});

// windows resize
window.addEventListener("resize", (e) => {
  if (document.fullscreenElement != null) {
    editor360container.classList.add("active");
    fullScreenBtn.classList.add("none");
    maxScreenStatus = true;
  } else {
    fullScreenBtn.classList.remove("none");
    editor360container.classList.remove("active");
    maxScreenStatus = false;
  }
});
// editor event : input
editor360.addEventListener("input", (event) => previewMD(editor360.value));

// preview markdown update
function previewMD(parseData) {
  let data = marked.parse(parseData);
  if (parseData == "") {
    data = `HENÜZ YAZMADINIZ
    <style>
      .editor360 .preview{
        color:white;
        background:#ddd !important;
      }
    </style>
    `;
  }

  preview360.innerHTML = data;
  Prism.highlightAll();

  mdValue(parseData);
}

// markdown end data
function mdValue(data = "", name = "editor360") {
  let endData = data
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\n", "&#013;")
    .replaceAll(" ", "&nbsp;");
  input.name = name;
  input.value = endData;
}

// test content
editor360.value = `# Html Temel Yapısı
\`\`\`html
<html>
  <head>
    <title>Başlık</title>
  </head>
  <body>
    <b>Kalın Yazı</b>
    <h2>Merhaba</h2>
  </body>
</html>
\`\`\`
`;

preview360.innerHTML = marked.parse(editor360.value);

previewMD(editor360.value);

/*




























//// dağınık kod
var editor = document.querySelector(".editor"),
  preview = document.querySelector(".preview");
editor.addEventListener("input", (e) => {
  preview.innerHTML = marked.parse(editor.value);
  Prism.highlightAll();
});

editor.value = `
# Html Temel Yapısı
\`\`\`html
<html>
  <head>
    <title>Başlık</title>
  </head>
  <body>
    <b>Kalın Yazı</b>
  </body>
</html>
\`\`\`
`;
preview.innerHTML = marked.parse(editor.value);

// keyboard test
editor.onkeydown = (e) => {
  var keyc = e.keyCode;

  if (e.altKey == true && e.shiftKey == true && keyc == 38) {
    var allLines = editor.value.split("\n");
    const linesCount = getCursorLine(editor) - 1;
    console.log(allLines[linesCount + 1]);
    var editLines = [...allLines];
    editLines[linesCount] = allLines[linesCount + 1];
    editLines[linesCount + 1] = allLines[linesCount];
    console.log(editLines);
  }
};

*/

// editor event : keydown
/*
editor360.addEventListener("keydown", (e) => {
  let keyc = e.keyCode,
    boundary = e.altKey;

  if (boundary && keyc == 38) lineMove(editor360, true);
  else if (boundary && keyc == 40) lineMove(editor360);
});
*/

/*
// line move function
function lineMove(editor, type = false) {
  let allLines = editor.value.split("\n");

  let characterLines = [],
    characterCount = 0;

  let editLines = [...allLines];

  const linesCount = getCursorLine(editor) - 1;

  localStorage.lineCookie = [editor.selectionStart, editor.selectionEnd];

  let lineCookie = localStorage.getItem("lineCookie").split(",");

  //preview360.innerHTML = lineCookie.toString();

  if (linesCount > 0 && linesCount < allLines.length - 1) {
    if (type) {
      editLines[linesCount] = allLines[linesCount - 1];
      editLines[linesCount - 1] = allLines[linesCount];
    } else {
      editLines[linesCount] = allLines[linesCount + 1];
      editLines[linesCount + 1] = allLines[linesCount];
    }

    editLines.forEach((e, len) => {
      let text = e.replaceAll(" ", "-");
      characterCount += text.length;
      characterLines.push(characterCount);
    });

    let outLines = editLines.join("\n");

    editor.value = outLines;

    console.log(characterLines);

    previewMD();

    if (type) {
      editor360.selectionStart = characterLines[linesCount - 1];
      editor360.selectionEnd = characterLines[linesCount - 1];
    } else {
      editor360.selectionStart = characterLines[linesCount + 1];
      editor360.selectionEnd = characterLines[linesCount + 1];
    }
  }
}

*/
