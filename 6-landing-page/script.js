// toggle nav
toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav')
})

// show modal
openModal.addEventListener('click', () => modal.classList.add('show-modal'))

// hide modal
closeModal.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', e =>
  e.target === modal ? modal.classList.remove('show-modal') : false
)
