document.querySelector(".btn").addEventListener("click", register);
document.querySelector(".gbtn").addEventListener("click", auth);

// async function auth(event) {
//   event.preventDefault();

//   window.location = "url";

// }

async function register(event) {
  event.preventDefault();
  try {
    let email = document.querySelector("#email").value;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    if (email == "" || username == "" || password == "") {
      alert("Fill the details correctly");
      return;
    }

    let regdata = {
      username,
      email,
      password,
    };
    let registerURL = "url";

    let res = await fetch(registerURL, {
      method: "POST",
      body: JSON.stringify(regdata),
      headers: {
        "Content-type": "application/json",
      },
    });
    let data = await res.json();
    alert(data.msg);

    console.log(data);

    window.location = "/faizan/login.html";
  } catch (err) {
    console.log(err);
  }
}
