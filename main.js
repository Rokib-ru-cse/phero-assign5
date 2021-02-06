let inputField = document.getElementById("inputField")
let searchBtn = document.getElementById("search-btn")
let mealBox = document.getElementById("meal-box")
let mealDetails = document.getElementById("meal-details")
let modalBody = document.getElementById("modal-body")
let searchValue = ""
let searchedData

attachOnClick = () => {
    let mealItem = document.querySelectorAll(".meal-item")
    mealItem.forEach(item => {
        item.addEventListener('click', (e) => {
            let clickedItem = e.target.title
            let clickedItemDetails = searchedData.meals.filter(meal => meal.strMeal == clickedItem)[0]
            mealDetails.innerHTML = ''
            modalBody.innerHTML = ''
            const img = clickedItemDetails.strMealThumb
            const name = clickedItemDetails.strMeal
            var image = document.createElement('img');
            image.src = img
            image.alt = name
            image.style.width = "200px"
            image.style.height = "200px"
            image.style.display = "block"
            image.setAttribute("class", "mx-auto my-3")
            var para = document.createElement("h3");
            var node = document.createTextNode(`${name} - Ingredient`);
            para.setAttribute('class', 'text-center mt-2')
            para.appendChild(node);
            modalBody.appendChild(image)
            modalBody.appendChild(para)
            for (let i = 1; i <= 20; i++) {
                const ingredient = clickedItemDetails[`strIngredient${i}`]
                if (Boolean(ingredient)) {
                    var para = document.createElement("p");
                    var node = document.createTextNode(`${i} - ${ingredient}`);
                    para.setAttribute('class', 'mt-1 text-center')
                    para.appendChild(node);
                    // modalBody.appendChild(para)
                    modalBody.appendChild(para)
                }
            }
        })
    })
}

inputField.addEventListener('change', (e) => {
    searchValue = e.target.value
})


returnMeal = (mealsObj) => {
    if (mealsObj.meals != null) {
        mealBox.innerHTML = ''
        mealsObj.meals.map((meal, index) => {
            const img = meal.strMealThumb
            const name = meal.strMeal
            var div = document.createElement("div");
            div.setAttribute("class", 'meal-item m-4');
            div.setAttribute("data-toggle", 'modal');
            div.setAttribute("data-target", '#exampleModal');
            div.style.width = "200px";
            div.style.cursor = "pointer";
            var image = document.createElement('img');
            image.src = img
            image.title = name
            image.alt = name
            image.setAttribute("class", "img-fluid")
            var para = document.createElement("p");
            var node = document.createTextNode(name);
            para.setAttribute('class', 'text-center mt-2')
            para.setAttribute('title', name)
            para.appendChild(node);
            div.appendChild(image)
            div.appendChild(para)
            mealBox.appendChild(div)

        })
    } else {
        mealBox.innerHTML = ''
        var para = document.createElement("p");
        var node = document.createTextNode('Sorry! No item found. Try again with another name...');
        para.setAttribute('class', 'mt-5 text-danger')
        para.appendChild(node);
        mealBox.appendChild(para)
    }
    attachOnClick()
}

searchBtn.addEventListener("click", () => {
    if (searchValue == '') {
        alert("Meal name can not be empty")
        return
    }
    if (searchedData == undefined) {
        mealBox.innerHTML = ''
        var para = document.createElement("p");
        var node = document.createTextNode('please wait...');
        para.setAttribute('class', 'mt-5 text-success')
        para.appendChild(node);
        mealBox.appendChild(para)
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(response => response.json())
        .then(data => searchedData = data)
        .then(() => {
            returnMeal(searchedData)
        })
})

