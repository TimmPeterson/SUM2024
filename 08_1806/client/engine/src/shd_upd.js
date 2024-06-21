let textArea;
let buttonApply;
let shader;
let codeArea;

export function shaderUpdateInit(_shader) {
  codeArea = document.getElementById("codeArea");
  textArea = document.getElementById("textArea");
  textArea.addEventListener("input", () => {
    codeArea.innerHTML = "";
    codeArea.innerHTML = textArea.value;
    let highlightedCodes = [...document.getElementsByClassName("hljs")];
    highlightedCodes.forEach((block) => hljs.highlightBlock(block));

    // codeArea.dataset.highlighted = "false";
    // hljs.highlightAll();
  });
  buttonApply = document.getElementById("apply");
  buttonApply.onclick = onApply;
  shader = _shader;
}

function onApply() {
  const source = textArea.value;
  shader.update(source, "frag");
}
