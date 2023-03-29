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

// heaters click function, insertRow on click and deleting row

var $reqData = $("#reqData");
$("#insertRowBtn").click(function () {
  console.log("clicked");
  var $clone = $reqData.find("tr.hide").clone(true).removeClass("hide");
  $reqData.find("table").append($clone);
});

$(".rowDelete").click(function () {
  $(this).parents("tr").detach();
});

// on click event for send btn to get the data of headers,json,text, etc
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;
let sendBtn = document.querySelector("#sendBtn");

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // *********************getting data from reqData section**********************************

  // getting data from headers
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

    keys.forEach(function (header, i) {
      h[header] = $td.eq(i).text();
    });

    headersData.push(h);
  });
  console.log(headersData);
});
