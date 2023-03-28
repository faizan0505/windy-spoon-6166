// requestTabs onclick function

let noneBtn = document.querySelector("#noneBtn");
let jsonBtn = document.querySelector("#jsonBtn");
let textBtn = document.querySelector("#textBtn");
let headersBtn = document.querySelector("#headersBtn");

let reqDataDiv = document.querySelector("#reqData");

noneBtn.addEventListener("click", () => {
  reqDataDiv.innerHTML = null;
  reqDataDiv.innerHTML = `<p style="text-align: center">This request doesn't have a body</p>`;
});

headersBtn.addEventListener("click", () => {
  reqDataDiv.innerHTML = null;
  reqDataDiv.innerHTML = `<input type="text" id="header"></input>`;
});

// on click event for send btn to get the data of headers,json,text, etc

let sendBtn = document.querySelector("#sendBtn");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // getting data from reqData section
});
