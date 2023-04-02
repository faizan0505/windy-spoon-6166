document.querySelector("#sendBtn").addEventListener("click", async () => {
    try {
        let urlAndMethodForm = document.querySelector("#urlAndMethodForm");
        let method = urlAndMethodForm.methods.value;
        let url = urlAndMethodForm.apiSearch.value;

        if (url == "") {
            return
        } else {
            let apiData = {
                method,
                url
            };

            await fetch("http://localhost:4500/addapi", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(apiData)
            })
                .then(async (result) => {
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
    }
    catch (err) {
        console.log(err);
    }


})


const displaydata = async () => {

    await fetch("http://localhost:4500/api").then(result => result.json())
        .then(data => {
            bag = data
            show(data);
        })
        .catch(err => {
            console.log(err);
        })
}



function show(data) {
    document.querySelector("#sidebar").innerHTML = "";

    data.forEach(element => {

        let div = document.createElement("div");
        div.setAttribute("class","apipara")

        let h4 = document.createElement("h4")
        h4.innerText = element.method

        let p = document.createElement("p")
        p.innerText = element.url

        let dele = document.createElement("button")
        dele.innerText = "DELETE"
        dele.addEventListener("click", () => {
            apiDel(element)
        })

        div.append(h4, p, dele);

        document.querySelector("#sidebar").append(div);

    });
}


displaydata()




async function apiDel(element) {

    let id = element._id;

    await fetch(`http://localhost:4500/delete/${id}`, {
        method: "DELETE",
    }).then(result => {
        result.json();
        if (result.ok) {
            displaydata()
        }
    }).catch(err => {
        console.log(err);
    })

}