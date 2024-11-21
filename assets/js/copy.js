const copy_win = document.querySelector('.copy')
function copy(textContent){
    copy_win.classList.add('poav');
    navigator.clipboard.writeText(textContent)
    setTimeout(() => {
        copy_win.classList.add('ishes');
    },2000)
    console.log(123)
    copy_win.classList.remove('ishes');
}