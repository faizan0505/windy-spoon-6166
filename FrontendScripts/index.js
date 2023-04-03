

function explore(){
    window.location.href="explore.html" 
}
function myTheme(){
    const toggle= document.getElementById("darkmode-Toggle")
    const body= document.getElementById("main")
    const h= document.getElementsByTagName("h5")
    const h1= document.getElementsByTagName("h1");
    const navbar= document.getElementById("Navbar")
    const h5= document.getElementsByTagName("h4");
    const p= document.getElementsByTagName("p")
    const l= document.getElementsByTagName("li")
    const u= document.getElementsByTagName("ul")
    const second_row= document.getElementById("second_row")
    const sixth_row= document.getElementById("sixth_row");
    const f_row= document.getElementById("Fourth_row")
    if (toggle.checked == true){
        body.style.background = "#4D4D4D";
        second_row.style.background = "#4D4D4D";
        sixth_row.style.background = "#4D4D4D";
        f_row.style.background = "#4D4D4D";
        // navbar.classList.add("bg-dark");
        // navbar.classList.add("navbar-dark");
        for(let i=0;i<h.length;i++){
            h[i].style.color="#FFFFFF";
        }
        for(let i=0;i<h1.length;i++){
            h1[i].style.color="#FFFFFF";
        }
        for(let i=0;i<h5.length;i++){
            h5[i].style.color="#FFFFFF";
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
        sixth_row.style.background = "#F9F9F9";
        navbar[0].style.background = "#F9F9F9";
        f_row.style.background = "#F9F9F9";
        for(let i=0;i<h.length;i++){
            h[i].style.color="#4D4D4D";
        }
        for(let i=0;i<h1.length;i++){
            h1[i].style.color="#4D4D4D";
        }
        for(let i=0;i<h5.length;i++){
            h5[i].style.color="#4D4D4D";
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


const hamburger= document.querySelector(".hamburger");
const navmenu= document.querySelector(".container-fluid")

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    navmenu.classList.toggle("active");
})




function typingEffect() {
    const contactTexts = shuffleArray(['Build', 'Debug', 'Monitor','Publish']);
    const typedtext = document.getElementsByClassName("typedtext")[0];
    let removing = false;
    let idx = char = 0;

    setInterval(() => { // We define the interval of the typing speed

        // If we do not reach the limit, we insert characters in the html
        if (char < contactTexts[idx].length) typedtext.innerHTML += contactTexts[idx][char];

        // 15*150ms = time before starting to remove characters
        if (char == contactTexts[idx].length + 15) removing = true;

        // Removing characters, the last one always
        if (removing) typedtext.innerHTML = typedtext.innerHTML.substring(0, typedtext.innerHTML.length - 1);

        char++; // Next character

        // When there is nothing else to remove
        if (typedtext.innerHTML.length === 0) {

            // If we get to the end of the texts we start over
            if (idx === contactTexts.length - 1) idx = 0
            else idx++;

            char = 0; // Start the next text by the first character
            removing = false; // No more removing characters
        }

    }, 150); // Typing speed, 150 ms

}
typingEffect();
function shuffleArray(array) {
    let currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let navbar= document.getElementById("Navbar");
let menu= document.getElementById("menu");
window.onscroll= function(){
    if(window.pageYOffset>= menu.offsetTop){
        navbar.classList.add("sticky");
    }else{
        navbar.classList.remove("sticky");
    }
}

function border_none(){
    let button=document.getElementById("b")
    console.log("hi")
    button.style.borderColor='color | transparent | inherit | initial'
}