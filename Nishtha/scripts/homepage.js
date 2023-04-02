
function redirect(){
    console.log("hi")
    window.location.href="apiRequest.html"   /// file name to be redirected
}
function logout(){
    console.log("hi")
    window.location.href="index.html"   /// file name to be redirected
}

function myTheme(){
    const toggle= document.getElementById("darkmode-Toggle")
    const body= document.getElementById("main")
    const h= document.getElementsByTagName("h5")
    const p= document.getElementsByTagName("p")
    const l= document.getElementsByTagName("li")
    const u= document.getElementsByTagName("ul")
    const second_row= document.getElementById("second_row")
    if (toggle.checked == true){
        body.style.background = "#4D4D4D";
        // second_row.style.background = "#4D4D4D";
        for(let i=0;i<h.length;i++){
            h[i].style.color="#FFFFFF";
        }
        for(let i=0;i<p.length;i++){
            p[i].style.color="#FFFFFF";
        }
        for(let i=0;i<l.length;i++){
            l[i].style.color="#FFFFFF";
        }
        for(let i=0;i<u.length;i++){
            u[i].style.color="#FFFFFF";
        }
      }else{
        body.style.background = "#FFFFFF";
        second_row.style.background = "#F9F9F9";
        for(let i=0;i<h.length;i++){
            h[i].style.color="#4D4D4D";
        }
        for(let i=0;i<p.length;i++){
            p[i].style.color="#4D4D4D";
        }
        for(let i=0;i<l.length;i++){
            l[i].style.color="#4D4D4D";
        }
        for(let i=0;i<u.length;i++){
            u[i].style.color="#4D4D4D";
        }

      }
}
