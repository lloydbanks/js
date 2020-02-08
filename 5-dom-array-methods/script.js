let data = []

// fetch random user & add money
async function getRandomUser(count) {
  let apiUrl = 'https://randomuser.me/api/'
  if (count) apiUrl += '?results=' + count
  const response = await fetch(apiUrl)
  const data = await response.json()

  const users = data.results.map(user => ({
    ...user,
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 2000000)
  }))

  addData(users)
}

function addData(newData) {
  if (newData.length > 1) {
    data = newData
  } else {
    data.push(newData[0])
  }

  updateDOM()
}

function updateDOM(updatedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

  updatedData.forEach(item => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`
    main.appendChild(element)
  })
}

function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function doubleMoney() {
  data = data.map(user => ({
    ...user,
    money: user.money * 2
  }))

  updateDOM()
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money)

  updateDOM()
}

function showOnlyMillionaires() {
  data = data.filter(user => user.money > 1000000)

  updateDOM()
}

function calculateWealth() {
  const total = data.reduce((sum, user) => (sum += user.money), 0)
  const totalEl = document.createElement('div')
  totalEl.innerHTML = `<h3>Total: <strong>${formatMoney(total)}</strong></h3>`

  main.appendChild(totalEl)
}

// event listeners
addUser.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
sort.addEventListener('click', sortByRichest)
onlyMillionaires.addEventListener('click', showOnlyMillionaires)
calcWealth.addEventListener('click', calculateWealth)

getRandomUser(5)
