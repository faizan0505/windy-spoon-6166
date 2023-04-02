

const logout = async () => {

    await fetch("http://localhost:4500/logout").then(result => result.json())
        .then(data => {
            window.location.href = "index.html"
            // alert(data.message)
        })
        .catch(err => {
            console.log(err);
        })
}