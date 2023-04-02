

const logout = async () => {

    await fetch("https://api-ace.onrender.com/logout").then(result => result.json())
        .then(data => {
            window.location.href = "index.html"
            // alert(data.message)
        })
        .catch(err => {
            console.log(err);
        })
}