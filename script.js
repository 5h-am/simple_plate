let recipes = document.querySelector(".recipes");
let filtered_box = document.querySelector(".filtered-box");
let animation_box = document.querySelector(".animation-box");
let animation_nav = document.querySelector(".animation-nav");
let filter = document.querySelector(".filter");
let filter_options = document.querySelector(".filter-options")
let nav_options = document.querySelector(".nav-options");
let search_icon = document.querySelector(".search-icon");
let search_box = document.querySelector(".search-box");
let search_btn = document.querySelector(".search-btn");
let back_icon = document.querySelector(".back-icon");

function hidden (element) {
    element.classList.add("hidden");
}

function visible (element) {
    element.classList.remove("hidden");
}

function animation_box_img (img) {
    animation_box.style.background = `url(${img})`
}

function animation_box_text (desc,cat) {
    animation_box.innerHTML =`<p class="category-card-text">${cat}</p>
                              <p class="recipe-card-text">${desc}</p>`
}

function category_card_creation (img,desc,filter) {
            filtered_box.innerHTML += `<div class="category-card card">
                                            <div class="category-card-content card-content">
                                                <img src="${img}" alt="${desc}"class="card-img">
                                                <p class="category-card-text">${filter}</p>
                                                <button class="see-recipes-btn" data-cat="${filter}">See Recipes</button>
                                            </div>
                                        </div>`
}

function recipe_card_creation (img,desc) {
    recipes.innerHTML += `<div class="recipe-card card">
                            <div class="recipe-card-content card-content">
                                <img src="${img}" alt="${desc}" class="card-img">
                                <p class="recipe-card-text">${desc}</p>
                            </div>
                        </div>`
}

async function random_recipes() {
    try {
        const response =  await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await response.json();
        return data
    } catch (err) {
        console.log("An Error has occured: ",err)
        return null
    } 
}

let promise = fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
promise
.then((response)=> {
    return response.json();
}).then((data) => {
    let categories = data['categories'];
    for (let i = 0; i<categories.length; i++) {
        let category = categories[i]['strCategory'];
        let img = categories[i]["strCategoryThumb"];
        category_card_creation(img,category,category)
    }
}).catch (err => {
    console.log("Error Occured: ", err);
}) 


filter.onclick = function() {
    visible(filter_options);
    setTimeout(hidden, 5000,filter_options);
}

filtered_box.addEventListener("click", (e)=> {
    if (e.target.tagName = "BUTTON") {
        setTimeout(hidden,200,nav_options)
        setTimeout(hidden,200,animation_box)
        setTimeout(hidden,200,animation_nav)
        setTimeout(hidden,200,filtered_box) 
        let promise = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.dataset.cat}`);
        promise
        .then((response) => {
            return response.json()
        }).then((data) => {
            let span = document.createElement("span");
            span.classList.add("material-symbols-outlined","back-icon");
            span.textContent = "arrow_back";
            let h2 = document.createElement("h2");
            h2.classList.add("recipes-category");
            h2.textContent = e.target.dataset.cat;
            recipes.appendChild(span);
            recipes.appendChild(h2);
            let meals = data["meals"];
            for (let i = 0; i<meals.length;i++) {
                img = meals[i]["strMealThumb"];
                desc = meals[i]["strMeal"];
                recipe_card_creation(img,desc);
            }
        }).catch(err=> {
            console.log("Error Occured: ",err);
        })
    }
})

search_icon.addEventListener("mouseover", ()=> {
    setTimeout(visible,500,search_box)
    setTimeout(visible,500,search_btn)
    search_icon.style.visibility = "hidden";  
})

search_box.addEventListener("mouseout", () => {
    setTimeout(hidden,500,search_box)
    setTimeout(hidden,500,search_btn)
    setTimeout(()=>{search_icon.style.visibility = "visible";},700)
      
})

recipes.addEventListener("click", (e) => {
    if(e.target.tagName = "SPAN") {
        recipes.innerHTML = "";
        setTimeout(visible,200,nav_options)
        setTimeout(visible,200,animation_box)
        setTimeout(visible,200,animation_nav)
        setTimeout(visible,200,filtered_box) 
    }
})

