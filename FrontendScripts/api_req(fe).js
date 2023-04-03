let bag 
function show(data) {
    document.querySelector("#sidebar").innerHTML = "";

    data.forEach(element => {

        let div = document.createElement("div");
        div.setAttribute("class", "apipara")

        let h6 = document.createElement("h6")
        h6.innerText = element.method

        let p = document.createElement("p")
        p.innerText = element.url

        let dele = document.createElement("button")
        dele.innerText = "DELETE"
        dele.addEventListener("click", () => {
            apiDel(element)
        })

        div.append(h6, p, dele);

        document.querySelector("#sidebar").append(div);

    });
}

const getApi = async () => {

    await fetch("https://api-ace.onrender.com/api").then(result => result.json())
        .then(data => {
            // alert(data.message)
            if(data.ok){
                show(data.apis);
             bag = data.apis
            }
            else{
                alert("Please Log-in First")
                window.location.href="index.html"
            }
        })
        .catch(err => {
            console.log(err);
        })
}



// document.querySelector("#sendBtn").addEventListener("click", async () => {
//     try {
//         let urlAndMethodForm = document.querySelector("#urlAndMethodForm");
//         let method = urlAndMethodForm.methods.value;
//         let url = urlAndMethodForm.apiSearch.value;

//         if (url == "") {
//             return
//         } else {
//             let apiData = {
//                 method,
//                 url
//             };

//             await fetch("https://api-ace.onrender.com/addapi", {
//                 method: 'POST',
//                 headers: {
//                     "Content-type": "application/json"
//                 },
//                 body: JSON.stringify(apiData)
//             })
//                 .then(async (result) => {
//                     const data = await result.json();
//                     if (data.ok) {
//                         alert(data.message);
//                     } else {
//                         alert(data.message)
//                     }
//                     window.location.href = "./login.html"
//                 }).catch((err) => {
//                     console.log(err);
//                     alert(err)
//                 });
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// })




async function apiDel(element) {

    let id = element._id;

    await fetch(`https://api-ace.onrender.com/delete/${id}`, {
        method: "DELETE",
    }).then(result => {
        result.json()
        
         console.log(result)
        if (result.ok) {
            // alert("done")
            show(bag)
            window.location.href="api_network.html"
        }
        // else{
        //     alert("Please login-First")
        //     window.location.href="login.html"
        // }
    }).catch(err => {
        console.log(err);
    })

}



getApi()