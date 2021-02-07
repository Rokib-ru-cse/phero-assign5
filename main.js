let inputField = document.getElementById("inputField")
let searchBtn = document.getElementById("search-btn")
let mealBox = document.getElementById("meal-box")
let modalBody = document.getElementById("modal-body")
let searchValue = ""
let searchedData

attachOnClick = () => {
    let mealItem = document.querySelectorAll(".meal-item")
    mealItem.forEach(item => {
        item.addEventListener('click', (e) => {
            let clickedItem = e.target.title
            let clickedItemDetails = searchedData.meals.filter(meal => meal.strMeal == clickedItem)[0]
            modalBody.innerHTML = ''
            const img = clickedItemDetails.strMealThumb
            const name = clickedItemDetails.strMeal
            var image = document.createElement('img');
            image.src = img
            image.alt = name
            image.style.width = "200px"
            image.style.height = "200px"
            image.style.display = "block"
            image.setAttribute("class", "mx-auto my-3 shadow p-3 mb-5 bg-white rounded")
            var para = document.createElement("h3");
            var hr = document.createElement("hr");
            var node = document.createTextNode(`${name} - Ingredient`);
            para.setAttribute('class', 'text-center mt-2')
            para.appendChild(node);
            para.appendChild(hr)
            modalBody.appendChild(image)
            modalBody.appendChild(para)
            for (let i = 1; i <= 20; i++) {
                const ingredient = clickedItemDetails[`strIngredient${i}`]
                if (Boolean(ingredient)) {
                    var para = document.createElement("p");
                    var hr = document.createElement("hr");
                    var node = document.createTextNode(`${i} - ${ingredient}`);
                    para.appendChild(node);
                    if (i % 2 == 0) {
                        para.setAttribute('class', 'bg-secondary text-center m-0 py-3 text-white')
                    } else {
                        para.setAttribute('class', 'bg-primary text-center m-0 py-3 text-white')
                    }
                    modalBody.appendChild(para)
                }
            }
        })
    })
}

inputField.addEventListener('change', (e) => {
    searchValue = e.target.value
})
inputField.addEventListener('keypress', (e) => {
    searchedData = undefined
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
            div.setAttribute("title", name);
            div.style.width = "200px";
            div.style.cursor = "pointer";
            div.style.boxShadow = "0px 0px 10px 2px rgba(255,0,0,.7)";
            div.style.borderRadius = "15px"
            var image = document.createElement('img');
            image.src = img
            image.title = name
            image.alt = name
            image.setAttribute("class", "img-fluid shadow p-3 mb-5 bg-white rounded")
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
        var sipnner = document.createElement("i");
        sipnner.setAttribute('class', 'mt-5 text-success fa fa-spinner fa-5x fa-fw fa-pulse')
        mealBox.appendChild(sipnner)
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`)
        .then(response => response.json())
        .then(data => searchedData = data)
        .then(() => {
            returnMeal(searchedData)
        })
})

