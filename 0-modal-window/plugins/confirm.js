$.confirm = function({ title, content }) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      title,
      content,
      width: '400px',
      onClose() {
        modal.destroy()
      },
      buttons: [
        {
          text: 'Cancel',
          type: 'primary',
          handler() {
            modal.close()
            reject()
          }
        },
        {
          text: 'Delete',
          type: 'danger',
          handler() {
            modal.close()
            resolve()
          }
        }
      ]
    })

    setTimeout(modal.open, 100)
  })
}
