function _createModalFooter(buttons = []) {
  if (!buttons.length) return document.createTextNode('')

  const wrapper = document.createElement('div')
  wrapper.classList.add('modal-footer')

  buttons.forEach(button => {
    const $btn = document.createElement('button')
    $btn.classList.add('btn', `btn-${button.type || 'secondary'}`)
    $btn.textContent = button.text
    $btn.onclick = button.handler || function() {}
    wrapper.appendChild($btn)
  })

  return wrapper
}

function _createModal({
  title = 'modal title',
  content = '',
  width = '500px',
  closable = false,
  buttons = [
    {
      type: 'primary'
    }
  ]
}) {
  const modal = document.createElement('div')
  modal.classList.add('modal-container')
  modal.insertAdjacentHTML(
    'afterBegin',
    `
      <div class="modal-overlay" data-close="${closable}">
          <div class="modal-content" style="${width}">
              <div class="modal-header">
                  <h5 class="modal-title">${title}</h5>
                  ${
                    closable
                      ? `<span class="modal-close" data-close="${closable}">&times;</span>`
                      : ''
                  }
              </div>
              <div class="modal-body" data-content>${content}</div>
          </div>
      </div>
  `
  )
  const $footer = _createModalFooter(buttons)
  const $content = modal.querySelector('[data-content]')
  $content.parentNode.insertBefore($footer, $content.nextSibling)
  document.body.appendChild(modal)

  return modal
}

$.modal = function(options = {}) {
  const { onOpen, onClose } = options
  const ANIMATION_SPEED = 500
  const $modal = _createModal(options)
  let closing, destroyed

  const modal = {
    open() {
      if (destroyed) return
      if (typeof onOpen === 'function') onOpen()

      !closing && $modal.classList.add('open')
    },
    close() {
      if (typeof onClose === 'function') onClose()

      closing = true
      $modal.classList.remove('open')
      $modal.classList.add('closing')

      setTimeout(() => {
        $modal.classList.remove('closing')
        closing = false
      }, ANIMATION_SPEED)
    }
  }

  const listener = ({ target }) => {
    if (target.dataset.close !== 'true') return

    modal.close()
  }

  $modal.addEventListener('click', listener)

  return {
    ...modal,
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      destroyed = true
    },
    setContent(content) {
      $modal.querySelector('[data-content]').innerHTML = content
    }
  }
}
