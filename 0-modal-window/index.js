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

const toHTML = ({ title, text, img }) => {
  const template = `
    <div class="col-4">
        <div class="card">
            <img src="${img}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${text}</p>
                <a href="#" class="btn btn-primary">Show more</a>
                <a href="#" class="btn btn-danger">Delete</a>
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

const modal = $.modal({
  title: 'first title',
  closable: true,
  content:
    '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa et eum in ipsam laboriosam, molestias nihil nisi porro quo sint!</p>',
  width: '400px',
  buttons: [
    {
      text: 'Ok',
      type: 'primary',
      handler() {
        modal.setContent('Ok clicked')
      }
    },
    {
      text: 'Cancel',
      type: 'danger',
      handler: function() {
        modal.close()
      }
    }
  ]
})

const openModal = document.querySelector('#openModal')
openModal.onclick = modal.open
