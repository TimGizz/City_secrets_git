let id = localStorage.getItem('id')
let url = `https://timgizz.github.io/City-secrets/attraction/${id}`

console.log(id);
const params = new URLSearchParams(window.location.search);
const title = document.getElementById('title')
const loader = document.getElementById('loader')
const map = document.getElementById('map')
const imgs = document.querySelector('.description__imgs')
const texts = document.querySelector('.description__texts')
const address = document.querySelector('.description__address')
const modal__content = document.querySelector('.modal__content')
loader.style.display = 'flex'

axios({
    method: 'get',
    url: 'https://672b1e6c976a834dd025b2ee.mockapi.io/attractions',
    params:{
        id: id,
    }
  })
  .then(function (response) {
    let dct = response.data
    gt = dct[0]['img']
    title.textContent = dct[0]['title']
    address.textContent = dct[0]['address']
    map.src = dct[0]['script']
    const script = document.createElement('script')
    
    script.src = dct[0]['script']

    for(i=0;i<dct[0]['imgs'].length;i++){
      const img = document.createElement('img')
      img.className = 'description__img'
      img.src = dct[0]['imgs'][i]
      img.id = 'open'
      imgs.appendChild(img)
    }
    for(i=0;i<dct[0]['imgs'].length;i++){
      const modal_img = document.createElement('img');
      modal_img.className = 'modal__img';
      modal_img.id='fhree__block';
      console.log(modal_img.id);
      
      modal_img.src = dct[0]['imgs'][i];
      modal__content.appendChild(modal_img);
    }
    for(i=0;i<dct[0]['description'].length;i++){
        const text = document.createElement('div')
        text.textContent = dct[0]['description'][i]
        text.className = 'description__text'
        texts.appendChild(text)
    }
    loader.style.display = 'none'
    history.pushState(null,'', url);
    
});