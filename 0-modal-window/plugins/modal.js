function _createModal(options) {
  const modal = document.createElement('div')
  modal.classList.add('modal-container')
  modal.insertAdjacentHTML(
    'afterBegin',
    `
      <div class="modal-overlay">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title">Modal title</h5>
                  <span class="modal-close">&times;</span>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
              </div>
          </div>
      </div>
  `
  )

  document.body.appendChild(modal)

  return modal
}

$.modal = function(options = {}) {
  const ANIMATION_SPEED = 500
  const $modal = _createModal(options)
  let closing

  return {
    open() {
      !closing && $modal.classList.add('open')
    },
    close() {
      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('closing')

      setTimeout(() => {
        $modal.classList.remove('closing')
        closing = false
      }, ANIMATION_SPEED)
    },
    destroy() {}
  }
}
