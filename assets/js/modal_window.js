const open = document.getElementById("contacts__button");
const win = document.getElementById("window");
const close = document.getElementById("close");
open.addEventListener("click",(e)=>{
    win.style.display = 'flex';
    body.style.overflowY = 'hidden';
})
close.addEventListener("click",(e)=>{
    win.style.display = 'none';
    body.style.overflowY = 'scroll';
})