"use strict";
const menu_icon = document.getElementById('menu_icon');
const menu = document.querySelector('.menu');
menu.style.display = 'none';

menu_icon.addEventListener('click',(e)=>{
    if(menu.style.display == 'none'){
        menu.style.display = 'flex';
    }else{
        menu.style.display = 'none';
    }
})