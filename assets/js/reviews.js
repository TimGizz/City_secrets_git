let reviews_id = localStorage.getItem('id')
const im = document.querySelector('.reviews__content')
const del = document.querySelector('.delete')

get();
function get() {
    axios({
    method: 'get',
    url: 'https://672b1e6c976a834dd025b2ee.mockapi.io/reviews',
    params:{
        reviews_id: reviews_id,
        category: 'reviews'
    }
    })
    .then(function (response) {
        let dct = response.data.reverse()
        im.innerHTML='';
        im.classList.remove('no_reviews')
        for(i=0; i<dct.length; i++ ){
            create(dct);   
        }
        if (im.textContent == '' || im.textContent == 'нет отзывов'){
            // im.innerHTML='нет отзывов';
            // im.classList.add('no_reviews')
        }
    })
    .catch(error => {
        console.error('Ошибка при отправке отзыва:', error);
        console.log('Произошла ошибка при отправке отзыва. Попробуйте снова.');
        im.innerHTML='нет отзывов';
        im.classList.add('no_reviews')
    });
    
}

function create(dct){

    const reviews = document.createElement('div')
    const name = document.createElement('div')
    const review = document.createElement('div')
    const rating = document.createElement('div')
    const btn = document.createElement('input')
    

    
    
    btn.type = 'submit'
    btn.value = 'удалить'
    btn.classList = 'delete'
    btn.id = dct[i]['id']
    let url = 'https://672b1e6c976a834dd025b2ee.mockapi.io/reviews/'
    btn.onclick = function(id){
        axios.delete(`${url}${this.id}`)
        .then((response) => {
            console.log('Успешно удалено:', response.data);
            console.log(this.id)
            get();
            })
            .catch((error) => {
            console.error('Ошибка при удалении:', error);
            });
    }
    const span = document.createElement('p')
    span.textContent = `${dct[i]['name']}`
    name.textContent = `Имя: `
    name.appendChild(span)

    const span1 = document.createElement('p')
    span1.textContent = `${dct[i]['review']}`
    review.textContent = `отзыв: `
    review.appendChild(span1)

    const span2 = document.createElement('p')
    span2.textContent = `${dct[i]['rating']}`
    rating.textContent = `рейтинг: `
    rating.appendChild(span2)



    
    name.classList = 'reviews__name';
    review.classList = 'reviews__message';
    rating.classList = 'reviews__rating';
    reviews.classList = 'reviews__main';
    btn.classList = 'reviews__del'

    
    
    
    reviews.appendChild(name)
    reviews.appendChild(review)
    reviews.appendChild(rating)
    reviews.appendChild(btn)
    im.appendChild(reviews)
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nam = document.getElementById('name').value;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    let url = 'https://672b1e6c976a834dd025b2ee.mockapi.io/reviews/'
    const reviewData = {
        name: nam,
        review: review,
        rating: Number(rating),
        reviews_id: reviews_id,
        category: 'reviews'
    };
    axios.post(url,reviewData)
    .then(response => {
        console.log(response.data)
        get();
    })
    .catch(error => {
        console.error('Ошибка при отправке отзыва:', error);
        console.log('Произошла ошибка при отправке отзыва. Попробуйте снова.');
        get();
    });
    document.getElementById('name').value = '';
    document.getElementById('review').value = '';
    document.getElementById('rating').value = '';
});
im.innerHTML='пусто';

