$(document).ready(function(){
  $('.slider').slider();
  $('.carousel').carousel();
  $('.collapsible').collapsible();
  $('.scrollspy').scrollSpy();
  $('.sidenav').sidenav();
 });

 window.addEventListener("scroll", function(){
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0 )
})

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () =>{
    if(window.pageYOffset > 500){
        toTop.classList.add("active");
    }else{
        toTop.classList.remove("active");
    }
})