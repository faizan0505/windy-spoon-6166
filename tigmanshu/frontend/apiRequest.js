// requestTabs onclick function

let noneBtn = document.querySelector("#noneBtn");
let jsonBtn = document.querySelector("#jsonBtn");
let headersBtn = document.querySelector("#headersBtn");

let reqDataDiv = document.querySelector("#reqData");

function noneBtnColor() {
  noneBtn.style.backgroundColor = "orange";
}

noneBtnColor();
noneBtn.addEventListener("click", () => {
  reqDataDiv.innerHTML = null;
  noneBtn.style.backgroundColor = "orange";
  noneBtn.style.color = "white";
  jsonBtn.style.backgroundColor = "white";
  
  headersBtn.style.backgroundColor = "white";

  jsonBtn.style.color = "black";

  headersBtn.style.color = "black";

  reqDataDiv.innerHTML = `<p style="text-align: center">This request doesn't have a body</p>`;
});

headersBtn.addEventListener("click", () => {
  headersBtn.style.backgroundColor = "orange";
  headersBtn.style.color = "white";

  jsonBtn.style.backgroundColor = "white";
  
  noneBtn.style.backgroundColor = "white";

  jsonBtn.style.color = "black";
  
  noneBtn.style.color = "black";

  reqDataDiv.innerHTML = null;
  reqDataDiv.innerHTML = `<input type="text" id="header"></input>`;
});

jsonBtn.addEventListener("click", () => {
  jsonBtn.style.backgroundColor = "orange";
  jsonBtn.style.color = "white";

  headersBtn.style.backgroundColor = "white";
  
  noneBtn.style.backgroundColor = "white";

  noneBtn.style.color = "black";
  
  headersBtn.style.color = "black";

  // e.preventDefault();
  reqDataDiv.innerHTML = null;
  reqDataDiv.innerHTML = `<div class="editor">
  <div class="line-numbers">
      <span></span>
  </div>
  <textarea id="requestBody"></textarea>
</div>`;
  const textarea = document.querySelector("textarea");
  const lineNumbers = document.querySelector(".line-numbers");

  textarea.addEventListener("keyup", (event) => {
    const numberOfLines = event.target.value.split("\n").length;

    lineNumbers.innerHTML = Array(numberOfLines).fill("<span></span>").join("");
  });

  textarea.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.value =
        textarea.value.substring(0, start) +
        "\t" +
        textarea.value.substring(end);

      event.preventDefault();
    }
  });
});

// on click event for send btn to get the data of headers,json,text, etc..

let sendBtn = document.querySelector("#sendBtn");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let data = document.getElementById("requestBody").value;
  
  function isJson(data) {
    try {
    JSON.parse(data);
      return true;
    } catch (e) {
      return false;
    }
  }

  if(isJson(data)===false) {
    alert("Invalid body type or Invalid JSON type ❌");
  }

  data = JSON.parse(document.getElementById("requestBody").value);

  if ( typeof data !== "object" || Array.isArray(data) ) {
   // Some Logic Here..
    alert("Invalid body type or Invalid JSON type ❌");
  } else {
    // Some Logic Here..
    alert("Got correct JSON data ✅");
  }
});

