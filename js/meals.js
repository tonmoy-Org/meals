const loadMeal = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data.meals))
}
const displayMeal = meal => {
    // step1 container Element
    const mealsContainer = document.getElementById('meals-container');
    mealsContainer.innerHTML = '';
    meal.forEach(meals => {
        console.log(meals)
        // step2 create child for each Element
        const allDivChild = document.createElement('div');
        allDivChild.classList.add('col');

        // step3 set content for child
        allDivChild.innerHTML = `
        <div class="card">
        <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${meals.strMeal}</h5>
          <p class="card-text"></p>
          <!-- Button trigger modal -->
        <button onclick="loadMealDetails(${meals.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#meals-details">
            Details
        </button>
        </div>
        `
        // step4 appendchild
        mealsContainer.appendChild(allDivChild);
    })
}

const searchMeals = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadMeal(searchText)
    
}
const loadMealDetails = idMeal => {
   const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
   fetch(url)
   .then(res => res.json())
   .then(data => displayMealDetails(data.meals[0]))

}
const displayMealDetails = meal =>{
   const label = document.getElementById('meals-detailsLabel').innerText = meal.strMeal;
   const modalBody = document.getElementById('modal-body-detail');
   modalBody.innerHTML = `
    <img class="img-fluid" src="${meal.strMealThumb}">
   `
   const category = document.getElementById('category').innerText = meal.strTags;
}
loadMeal();