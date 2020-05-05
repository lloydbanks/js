const products = [
  {
    id: 1,
    title: 'sunt aut facere repellat',
    text:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
    img: 'https://via.placeholder.com/400x200?text=product-1',
    price: '10$'
  },
  {
    id: 2,
    title: 'consectetur adipisicing elit',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta et itaque iusto, quam quasi',
    img: 'https://via.placeholder.com/400x200?text=product-2',
    price: '20$'
  },
  {
    id: 3,
    title: 'dolor sit amet ipsum',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda aut consectetur',
    img: 'https://via.placeholder.com/400x200?text=product-3',
    price: '30$'
  }
]

const toHTML = ({ title, text, img, id }) => {
  const template = `
    <div class="col-4">
        <div class="card">
            <img src="${img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${text}</p>
                <a href="javascript:;" class="btn btn-primary" data-modal="showMore" data-id="${id}">Show more</a>
                <a href="javascript:;" class="btn btn-danger">Delete</a>
            </div>
        </div>
    </div>`

  return template.trim()
}

const render = () => {
  const $content = document.querySelector('#content')
  $content.innerHTML = products.map(toHTML).join('')
}

render()

const detailModal = $.modal({
  closable: true,
  width: '400px',
  buttons: [
    {
      text: 'Close',
      type: 'primary',
      handler() {
        detailModal.close()
      }
    }
  ]
})

const openModal = ({ target }) => {
  if (!target.dataset.modal) return

  const { id } = target.dataset
  const { title, price } = products.find(p => p.id === +id)

  detailModal.setTitle(title)
  detailModal.setContent(`<p>Price: ${price}</p>`)

  detailModal.open()
}

const $content = document.querySelector('#content')
$content.addEventListener('click', openModal)
