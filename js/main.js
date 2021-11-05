
function animateLogo(){
    let tl = gsap.timeline();
    tl.from("#logo-banner", {scale: 0, rotation:360, ease:"back.out(1.3)",duration:1.1,delay: 1});
    tl.from("#teclado", {y:110, ease:"back.out(1.3)"});
    tl.from("#right-hand, #left-hand", {y:90, ease:"back.out",duration:0.5});
    tl.from("#item-1, #item-2",{opacity:0, scale:0, ease:"back.out(1.3)",duration:0.7});
    tl.from("#item-3",{  opacity:0,y:-60, duration: 1});
    tl.to("#item-1",{duration: 0.5, x: "-=100", scale: 1});
    tl.to("#item-2,#item-3",{duration: 0.5, x: "+=100", scale: 1});
    tl.from(".letter",{ scale:0, rotationX:180 , stagger: 0.03, transformOrigin:"0% 50% -50",y:80,ease:"back.out"});
    // tl.from(".fixed",{left:-100});

}
let anim_bloque = (element)=>{
    let tl = gsap.timeline();
    tl.to(element,{opacity:1,y:0,duration: 0.8,ease: Power1.easeOut});

}
let anim_card = ()=>{
    let cards = document.querySelectorAll(".card");
    gsap.set(".card__info", {yPercent: 100});

    cards.forEach(card => {
        let info = card.querySelector(".card__info");
        let tl = gsap.timeline({paused: true});
            tl.to(info,{yPercent:0, duration:0.8});
        card.addEventListener('mouseenter',function(){
            tl.play();
        });
        card.addEventListener("mouseleave",function(){
            tl.reverse();
        })
    });
}
let send =(name,email,text)=>{
   let status_message = document.getElementById("show-status");
   status_message.innerHTML=''; 
    let myString = "name="+name.value+"&email="+email.value+"&text="+text.value;
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
            status_message.innerHTML=xmlhttp.responseText;
            name.value='';
            email.value='';
            text.value='';
        }
    }
    xmlhttp.open("POST","php/send_email.php");
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(myString);
}

window.onload = function(){
    gsap.set(".anim-scroll",{opacity:0,y:220});
    animateLogo();
    anim_card();
    
    let form = document.getElementById("form");
    let name = document.getElementById("name");
    let email = document.getElementById("email");
    let text = document.getElementById("message");
    let box_anim = document.querySelectorAll(".anim-scroll");
    let position_bloque =[];
    let flang_1 = true;
    window.addEventListener('scroll',()=>{
        let scroll = document.documentElement.scrollTop;
        box_anim.forEach((bloque,i)=>{
            if( bloque.offsetTop - 320 < scroll){
                anim_bloque(bloque);
                if(i == 2 && flang_1){
                    gsap.from(".list-tec li",{scale:0,x:"random(-400,400,50)",duration:2});
                    flang_1 = false;
                }
            }
            // console.log(scroll);
            });
        });
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        send(name,email,text);
    });

    }




