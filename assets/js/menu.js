const menu_icon = document.getElementById('menu_icon');
const menu = document.querySelector('.menu');
let count=0;

menu_icon.addEventListener('click',(e)=>{
    
    if(count == 0){
        menu.style.display = 'flex';
        count = count+1;
    }else{
        menu.style.display = 'none';
        count = count-1;
    }
})