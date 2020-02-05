const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
let ticketPrice = +movie.value

// save selected movie index & price
function setMovie(index, price) {
  localStorage.setItem('selectedMovieIndex', index)
  localStorage.setItem('selectedMoviePrice', price)
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  const selectedMovieIndex = JSON.parse(
    localStorage.getItem('selectedMovieIndex')
  )

  if (selectedSeats) {
    seats.forEach((item, index) => {
      if (selectedSeats.includes(index)) {
        item.classList.add('selected')
      }
    })

    updateSelectedCount()
  }

  if (selectedMovieIndex) {
    movie.selectedIndex = selectedMovieIndex
  }
}

// update total & count
function updateSelectedCount() {
  const selected = document.querySelectorAll('.row .seat.selected')
  const selectedIndex = [...selected].map(seat => [...seats].indexOf(seat))
  const selectedCount = selected.length

  localStorage.setItem('selectedSeats', JSON.stringify(selectedIndex))

  count.innerText = selectedCount
  total.innerText = selectedCount * ticketPrice
}

// movie select event
movie.addEventListener('change', ({ target }) => {
  ticketPrice = +target.value
  setMovie(target.selectedIndex, target.value)
  updateSelectedCount()
})

// get data from localStorage
populateUI()

// seat click event
container.addEventListener('click', ({ target }) => {
  if (
    target.classList.contains('seat') &&
    !target.classList.contains('occupied')
  ) {
    target.classList.toggle('selected')
    updateSelectedCount()
  }
})
