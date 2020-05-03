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
