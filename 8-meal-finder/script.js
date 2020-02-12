// search meal and fetch from api
function searchMeal(e) {
  e.preventDefault()

  // clear single meal
  singleMeal.innerHTML = ''

  // get search term
  const term = search.value

  // check for empty
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        result.innerHTML = `<h2>Search results for '${term}'</h2>`

        if (data.meals === null) {
          result.innerHTML = `<p>There are no search results. Try again</p>`
        } else {
          meals.innerHTML = data.meals
            .map(
              meal => `<div class="meal">
          		<img src="${meal.strMealThumb}" alt="">
          		<div class="meal-info" data-mealId="${meal.idMeal}">
          			<h3>${meal.strMeal}</h3>
							</div>
						</div>`
            )
            .join('')
        }
      })
  } else {
    alert('Please enter a search term')
  }
}

// fetch meal by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0]

      addMealToDOM(meal)
    })
}

// Add meal to DOM
function addMealToDOM(meal) {
  const ingredients = []

  ingredients.forEach((item, i) => {
    if (meal[`strIngredient${item}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      )
    }
  })

  singleMeal.innerHTML = `
		<div class="single-meal">
			<h1>${meal.strMeal}</h1>
			<img src="${meal.strMealThumb}" alt="">
			<div class="single-meal-info">
				${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
			</div>
			<div class="main">
				<p>${meal.strInstructions}</p>
				<h2>Ingredients</h2>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
		</div>
	`
}

// event listeners
submit.addEventListener('submit', searchMeal)

meals.addEventListener('click', e => {
  const mealInfo = e.path.find(item => {
    console.log(item)
    if (item.classList) {
      return item.classList.contains('meal-info')
    } else {
      return false
    }
  })

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealid')
    getMealById(mealID)
  }

  console.log('mealInfo')
})
