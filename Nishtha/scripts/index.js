
function myTheme(){
    const toggle= document.getElementById("darkmode-Toggle")
    const body= document.getElementById(main)
    if (toggle.checked == true){
        console.log("hi")
        main.style.background = "#4D4D4D";
      }else{
        main.style.background = "white";
      }
}