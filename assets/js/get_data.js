const params = new URLSearchParams(window.location.search);
const id = params.get('i');
const title = document.getElementById('title')
const loader = document.getElementById('loader')
loader.style.display = 'flex'
axios({
    method: 'get',
    url: 'https://672b1e6c976a834dd025b2ee.mockapi.io/attractions',
    params:{
      id: id,
    }
  })
    .then(function (response) {
      loader.style.display = 'none'
      let dct = response.data
      gt = dct[0]['img']
      img.src = gt
      title.textContent = dct[0]['text']
    });