function calculate() {
  const apiUrl = 'https://api.exchangerate-api.com/v4/latest/'
  const currency1value = currency1.value
  const currency2value = currency2.value

  fetch(apiUrl + currency1value)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[currency2value]
      amount2.value = (amount1.value * rate).toFixed(2)
    })
}

calculate()

currency1.addEventListener('change', calculate)
currency2.addEventListener('change', calculate)
amount1.addEventListener('change', calculate)
amount2.addEventListener('change', calculate)

swap.addEventListener('click', () => {
  const temp = currency1.value
  currency1.value = currency2.value
  currency2.value = temp

  calculate()
})
