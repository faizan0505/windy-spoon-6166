let form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let all_input = document.querySelectorAll("form input");
  let obj = {};
  for (let i = 0; i < all_input.length - 1; i++) {
    obj[all_input[i].id] = all_input[i].value;
  }
  SigninData(obj);
});

async function SigninData() {
  let data = await fetch("https://crazy-poncho-colt.cyclic.app/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  if (data.status == 200) {
    console.log(await data.json());

    window.location.href = "./signin.html";
  }
}
