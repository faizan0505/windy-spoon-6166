// requestTabs onclick function

let noneBtn = document.querySelector("#noneBtn");
let jsonBtn = document.querySelector("#jsonBtn");
let headersBtn = document.querySelector("#headersBtn");

let reqDataDiv = document.querySelector("#reqData");

// value of JSON and headers to show and store data.
let keyValueObj = {};
let jsonData = [];

// ****************************************************None section****************************************************************
function initialNoneBtnColor() {
  noneBtn.style.backgroundColor = "orange";
}

initialNoneBtnColor();
noneBtn.addEventListener("click", () => {
  // style
  reqDataDiv.innerHTML = null;
  noneBtn.style.backgroundColor = "orange";
  noneBtn.style.color = "white";
  jsonBtn.style.backgroundColor = "white";
  headersBtn.style.backgroundColor = "white";

  jsonBtn.style.color = "black";
  headersBtn.style.color = "black";

  // adding content
  reqDataDiv.innerHTML = `<p style="text-align: center">This request doesn't have a body</p>`;
});

// ****************************************************Headers section****************************************************************
headersBtn.addEventListener("click", () => {
  // style
  reqDataDiv.innerHTML = null;
  headersBtn.style.backgroundColor = "orange";
  headersBtn.style.color = "white";

  jsonBtn.style.backgroundColor = "white";
  noneBtn.style.backgroundColor = "white";

  jsonBtn.style.color = "black";
  noneBtn.style.color = "black";

  // content
  let HeadersTR = null;
  if (Object.keys(keyValueObj).length === 0) {
    HeadersTR = `<tr>
                <td contenteditable="true" data-text="Key"></td>
                <td contenteditable="true" data-text="Value"></td>
                <td contenteditable="true" data-text="Discription"></td>
                <td>
                  <i class="fa fa-trash-o rowDelete" aria-hidden="true"></i>
                </td>
              </tr>`;
  } else {
    for (key in keyValueObj) {
      HeadersTR += `<tr>
                <td contenteditable="true" data-text=${key}></td>
                <td contenteditable="true" data-text=${keyValueObj[key]}></td>
                <td contenteditable="true" data-text="Discription"></td>
                <td>
                  <i class="fa fa-trash-o rowDelete" aria-hidden="true"></i>
                </td>
              </tr>`;
    }
  }
  reqDataDiv.innerHTML = `<table id="headersTable">
              <tr>
                <th>Key</th>
                <th>Value</th>
                <th>Discription</th>
                <th data-attr-ignore></th>
              </tr>
              ${HeadersTR}
              <!-- hide -->
              <tr class="hide">
                <td contenteditable="true" data-text="Key"></td>
                <td contenteditable="true" data-text="Value"></td>
                <td contenteditable="true" data-text="Discription"></td>
                <td>
                  <i class="fa fa-trash-o rowDelete" aria-hidden="true"></i>
                </td>
              </tr>
            </table>
            <div id="insertRowDiv">
              <i id="insertRowBtn" class="fa fa-plus"></i>
            </div>`;
  headersTableFunc();
});

// headers click function, insertRow on click and deleting row
function headersTableFunc() {
  var $reqData = $("#reqData");
  $("#insertRowBtn").click(function () {
    var $clone = $reqData.find("tr.hide").clone(true).removeClass("hide");
    $reqData.find("table").append($clone);
  });

  $(".rowDelete").click(function () {
    $(this).parents("tr").detach();
  });
}

// ****************************************************Json section****************************************************************
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

// ***************************on click event for send btn to get the data of headers,json,text, etc******************************************
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;
let sendBtn = document.querySelector("#sendBtn");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // ********************** Data from url And Method Form **********************************
  let urlAndMethodForm = document.querySelector("#urlAndMethodForm");
  let method = urlAndMethodForm.methods.value;
  let url = urlAndMethodForm.apiSearch.value;

  // *********************getting data from reqData section**********************************

  // **************************getting data from headers*************************************
  var $reqData = $("#reqData");
  var $rows = $reqData.find("tr:not(:hidden)");
  var keys = [];
  var headersData = [];
  $($rows.shift())
    .find("th:not(:empty):not([data-attr-ignore])")
    .each(function () {
      keys.push($(this).text().toLowerCase());
    });
  $rows.each(function () {
    var $td = $(this).find("td");
    var h = {};
    console.log($td);
    keys.forEach(function (header, i) {
      h[header] = $td.eq(i).text();
    });

    headersData.push(h);
  });
  if (headersData.length > 0) {
    headersData.forEach((elem) => {
      if (elem["key"] != "") {
        keyValueObj[elem["key"]] = elem["value"];
      }
    });
    console.log(keyValueObj);
  }

  // ******************************getting data from JSON********************************
  if (document.getElementById("requestBody") != null) {
    jsonData = document.getElementById("requestBody").value;

    function isJson(jsonData) {
      try {
        JSON.parse(jsonData);
        return true;
      } catch (e) {
        return false;
      }
    }

    if (isJson(jsonData) === false) {
      alert("Invalid body type or Invalid JSON type ❌");
    }

    jsonData = JSON.parse(document.getElementById("requestBody").value);

    if (typeof jsonData !== "object" || Array.isArray(jsonData)) {
      jsonData = [];
      alert("Invalid body type or Invalid JSON type ❌");
    }
  }

  // sending data to curd function
  if (url == "") {
    alert("please provide URL");
  } else {
    curdFunction(method, url, jsonData, keyValueObj);
  }
});

// crud operations
function curdFunction(method, url, jsonData, keyValueObj) {
  console.log(method, url, jsonData, keyValueObj);
}
