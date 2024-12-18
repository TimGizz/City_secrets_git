let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
const itemsPerPage = 10;
let filteredItems = [];
const btn = document.querySelector(".filter_search__filter__btn");
const win = document.querySelector(".all__btn");
const strel = document.querySelector(".filter_search__filter__img") ;
const buttons = Array.from(document.querySelectorAll('.all__btn__btns'));
const text = document.querySelector('.filter_search__filter__text')



const savedSearchInput = localStorage.getItem('searchInput') || '';
const savedCategory = localStorage.getItem('category') || 'all';
document.getElementById('searchInput').value = savedSearchInput;
const textbtn = localStorage.getItem('text')||"Без фильтра";
text.textContent = textbtn;


let img = document.getElementById('img')
let title = document.getElementById('title')
let tex = document.getElementById('text')
let address = document.getElementById('address')
const itemContainer = document.getElementById('itemContainer');
let dict
let list_dict = []
let counts = 0
const loader = document.getElementById('loader2')
loader.style.display = 'flex'
win.style.display = 'none';
const pug = document.getElementById('number_pagination')
const category = localStorage.getItem('category')||' ';
let number_of_pages = 'h';
let c = 0
let p = 1
let url = `https://672b1e6c976a834dd025b2ee.mockapi.io/attractions?page=${p}&limit=${itemsPerPage}`
function sorting(){
    if(c == 0){
        r = url
        c = 1
        url = url + '&sortBy=title&order=asc'
        
    }
    else{
        c = 0
        url = r
    }
    applyFilters()
}

async function applyFilters() {
    await axios.get('https://672b1e6c976a834dd025b2ee.mockapi.io/attractions')
    .then((response) =>{
        number_of_pages = response.data.length
        
    })
    const category = localStorage.getItem('category')||'';
    const search = localStorage.getItem('searchInput') || '';
    axios({
        method: 'get',
        url: url,
        params:{
            category: localStorage.getItem('category'),
            title: search,
        }
    })
    .then(function (response) {
        number_of_pages = response.data
        console.log(response.data);
        
        list_dict = []
        dict = response.data
        render()
        
    })
    .catch(error => {
        itemContainer.innerHTML = '';
        console.log('пусто');
        loader.style.display = 'none'
    });
    renderPagination();
    pug.innerHTML = currentPage
    localStorage.setItem('currentPage', currentPage);
}
currentPage = 1;
function render() {
    itemContainer.innerHTML = '';
    for(i=0;i<dict.length;i++){
        const div = document.createElement('div')
        const text_block = document.createElement('div')
        const img = document.createElement('img')
        const title = document.createElement('div')
        const address = document.createElement('a')

        text_block.textContent = dict[i]['text']
        img.src = dict[i]['img']
        title.textContent = dict[i]['title']
        address.textContent = dict[i]['address']

        div.classList = 'content__block'
        div.id = +dict[i]['id']
        div.onclick = function(id){
            console.log(this.id)
            localStorage.setItem('id',this.id)
            const url = `https://timgizz.github.io/City-secrets/attraction_dicription.html`;
            window.location.href = url
        }
        text_block.classList = 'content__text'
        img.classList = 'content__img'
        title.classList = 'content__title'
        address.classList = 'content__address'

        itemContainer.appendChild(div)
        div.appendChild(img)
        div.appendChild(title)
        div.appendChild(text_block)
        div.appendChild(address)
    }
    let list_div = Array.from(document.querySelectorAll('.content__block'))
    filteredItems = [...list_div];
    
    loader.style.display = 'none'
}

function renderItems() {
    const itemContainer = document.getElementById('itemContainer');
    itemContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    paginatedItems.forEach(item => {
        itemContainer.appendChild(item);
        
    });
    console.log(paginatedItems);
    
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(number_of_pages / itemsPerPage);
    console.log(number_of_pages);
    
    let counter = 0
    for (i = 1; i <= totalPages; i++) {
        counter+=1
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = button.textContent;
            url = `https://672b1e6c976a834dd025b2ee.mockapi.io/attractions?page=${button.textContent}&limit=${itemsPerPage}`
            localStorage.setItem('currentPage', currentPage);
            applyFilters();
            pug.innerHTML = button.textContent
            p = +currentPage 
        };
        pagination.appendChild(button);
    }
    
}

function filterItems() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    localStorage.setItem('searchInput', searchInput);
    applyFilters();
}

function filterByCategory(category) {
    localStorage.setItem('category', category);
    applyFilters();
}


applyFilters();

btn.addEventListener("click", (e) =>{
    console.log('нажал')
    if(win.style.display == 'none'){
        win.style.display = 'flex';
    }else{
        win.style.display = 'none';
    }
})
window.addEventListener('click', function (event) {
    if (win.style.display == 'flex'){
        if (!event.target.matches('#btn')) {
            if(win.style.display != 'none'){
                win.style.display = 'none';
                strel.classList.toggle('rotate');
            }
        }
    }
});

buttons.forEach(buttons => {
    buttons.addEventListener('click', function () {
        text.textContent = this.textContent;
        strel.classList.toggle('rotate');
        const textbtn = text.textContent
        win.style.display = 'none';
        localStorage.setItem('text', textbtn);
    });
});

btn.addEventListener('click', ()=>{
    strel.classList.toggle('rotate');
})

function get_more(){
    console.log(p);
    
    p += 1
    axios.get(`https://672b1e6c976a834dd025b2ee.mockapi.io/attractions?page=${p}&limit=${itemsPerPage}&category=${localStorage.getItem('category')}&title=${localStorage.getItem('searchInput')}`)
    .then(function (response){
        if(response.data.length != 0){
            pug.innerHTML = p
        }
        response.data.forEach(element => {
            dict.push(element)
        });
        render()
    })
}

