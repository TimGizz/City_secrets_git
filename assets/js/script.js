let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
const itemsPerPage = 9;
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

function applyFilters() {
    axios({
        method: 'get',
        url: 'https://672b1e6c976a834dd025b2ee.mockapi.io/attractions',
    })
    .then(function (response) {
        list_dict = []
        dict = response.data
        filter()
        function filter(){
            counts = 0
            const category = localStorage.getItem('category')||' ';
            for(i=0;i<12;i++){
                const searchInput = localStorage.getItem('searchInput')||'';
                if ((category === 'all' || dict[i]['category'] === category) && 
                (dict[i]['title'].toLowerCase().includes(searchInput) || 
                dict[i]['text'].toLowerCase().includes(searchInput) || 
                dict[i]['address'].toLowerCase().includes(searchInput))){
                    counts = counts + 1
                    list_dict.push(dict[i])
                }
            }
            render()
        }
        
        function render() {
            setTimeout(()=>{
                
            },1000)
            itemContainer.innerHTML = '';
            for(i=0;i<counts;i++){
                console.log('загружено')
                const div = document.createElement('div')
                const text_block = document.createElement('div')
                const img = document.createElement('img')
                const title = document.createElement('div')
                const address = document.createElement('a')

                text_block.textContent = list_dict[i]['text']
                img.src = list_dict[i]['img']
                title.textContent = list_dict[i]['title']
                address.textContent = list_dict[i]['address']

                div.classList = 'content__block'
                div.id = +list_dict[i]['id']
                div.onclick = function(id){
                    console.log(id)
                    const url = `https://timgizz.github.io/City-secrets/attraction_dicription.html?id=${encodeURIComponent(this.id)}`;
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
            renderItems()
        }
    });
    currentPage = 1;
    pug.innerHTML = currentPage
    localStorage.setItem('currentPage', currentPage);
    renderItems();
}
console.log(filteredItems)

function renderItems() {
    const itemContainer = document.getElementById('itemContainer');
    itemContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    paginatedItems.forEach(item => {
        itemContainer.appendChild(item);
        
    });
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.onclick = () => {
            currentPage = i;
            localStorage.setItem('currentPage', currentPage);
            renderItems();
            pug.innerHTML = currentPage
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


