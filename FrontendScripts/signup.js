document.querySelector(".gbtn").addEventListener("click", auth);
document.querySelector(".gitbtn").addEventListener("click", gitauth);

async function auth() {
  window.location = "https://api-ace.onrender.com/auth/google";
}

async function gitauth() {
  window.location = "https://github.com/login/oauth/authorize?client_id=c650422230378f44fe50&scope=user:email&scope=repo";
}


let register = async () => {
  try {
    let username = document.querySelector("#username").value;
    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    if (username == "" || email == "" || password == "") {
      alert("Fill the all details");
      return;
    }

    let regdata = {
      username,
      email,
      password,
    };

    await fetch("https://api-ace.onrender.com/signup", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(regdata)
    })
      .then(async(result) => {
        const data = await result.json();
        if (data.ok) {
          alert(data.message);
        } else {
          alert(data.message)
        }
        window.location.href = "./login.html"
      }).catch((err) => {
        console.log(err);
        alert(err)
      });

  }
  catch (err) {
    console.log(err);
  }

}


// ----------------------------------------------------------------------------
// log-in
let logindata = async () => {

  const email = document.querySelector("#logmail").value;
  const password = document.querySelector("#logpass").value;

  const payload = {
    email,
    password
  }

  const fetchedData = await fetch("https://api-ace.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const data = await fetchedData.json();
  if (data.ok) {
    alert("Log-In Sucessfully")
    console.log(data.username)
    localStorage.setItem("username", JSON.stringify(data.username));
    window.location.href = "index.html"
  } else {
    alert(data.message)
  }

}



// let user_name = JSON.parse(sessionStorage.getItem("username"))

// document.querySelector("#username").innerText = user_name || "Welcome";