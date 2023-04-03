let mail = ""
let password = ""
let otpval = 0

document.querySelector("#submit").addEventListener("click", () => {
    mail = document.querySelector("#otpemail").value
    password = document.querySelector("#pass").value
    if (mail == "" || password == "") {
        alert("Fill the all details")
    } else {
        let otp = async () => {
            try {
                let regdata = {
                    "email": mail,
                };

                await fetch("https://api-ace.onrender.com/otp", {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(regdata)
                })
                    .then(async (result) => {
                        const data = await result.json();
                        if (data.ok) {
                            otpval = data.message
                            // alert(`OTP is - ${data.message}`);
                            document.querySelector("#otp").style.display = "block"
                        } else {
                            alert(data.message)
                        }
                    }).catch((err) => {
                        console.log(err);
                        alert(err)
                    });
            }
            catch (err) {
                console.log(err);
            }
        }

        otp()
    }
})


document.querySelector("#ok").addEventListener("click", () => {
    const paaskey = document.querySelector("#val").value
    if (paaskey == "") {
        alert("Enter Correct OTP")
    } else if (otpval == paaskey) {
        alert("OTP Verified")
        window.location.href = "setPassword.html"
    } else {
        alert("Wrong OTP")
    }
})

// -----------------------------------otp part done----------------------------------