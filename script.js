let recipes = document.querySelector(".recipes");
let filtered_box = document.querySelector(".filtered-box");
let animation_box = document.querySelector(".animation-box");
let animation_nav = document.querySelector(".animation-nav");
let arrow_back_icon = document.querySelector(".arrow-back-icon");
let arrow_next_icon = document.querySelector(".arrow-next-icon");
let filter = document.querySelector(".filter");
let filter_options = document.querySelector(".filter-options")
let nav_options = document.querySelector(".nav-options");
let search_icon = document.querySelector(".search-icon");
let search_box = document.querySelector(".search-box");
let search_btn = document.querySelector(".search-btn");
let back_icon = document.querySelector(".back-icon");
let heading = document.querySelector(".heading");
let back_category = document.querySelector(".back-category");
let recipe_page = document.querySelector(".recipe-page");
let back_recipe = document.querySelector(".back-recipe");
let search = document.querySelector(".search");
let back_search = document.querySelector(".back-search");
let filter_search = document.querySelector(".filter-search");
let filter_search_box = document.querySelector(".filter-search-box");
let back_filter_recipe = document.querySelector(".back-filter-recipe");
let filter_search_btn = document.querySelector(".filter-search-btn");
let animation_recipe_back = document.querySelector(".animation-recipe-back");


let random_meals = [];
let random_meal_index = 3;

function hidden (element) {
    element.classList.add("hidden");
}

function visible (element) {
    element.classList.remove("hidden");
}

function default_page_hidden () {
    setTimeout(hidden,200,nav_options)
    setTimeout(hidden,200,animation_box)
    setTimeout(hidden,200,animation_nav)
    setTimeout(hidden,200,filtered_box)    
}
function default_page_visible () {
    setTimeout(visible,200,nav_options)
    setTimeout(visible,200,animation_box)
    setTimeout(visible,200,animation_nav)
    setTimeout(visible,200,filtered_box)
    
}
function animation_box_img (img) {
    animation_box.style.background = `url(${img})`
    animation_box.style.backgroundRepeat = `no-repeat`
    animation_box.style.backgroundPosition = `center`
    animation_box.style.backgroundSize = `cover`
    animation_box.style.padding = `4em 6em`
   
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

function recipe_card_creation (img,desc,id) {
    recipes.innerHTML += `<div class="recipe-card card">
                            <div class="recipe-card-content card-content">
                                <img src="${img}" alt="${desc}" class="card-img">
                                <p class="recipe-card-text">${desc}</p>
                            </div>
                            <button class="see-recipes-btn see-recipe-btn" data-mealid="${id}">See Recipe</button>
                        </div>`
}

function recipe_page_creation(img,dish_name,category,area,youtube_link,ingredients_list,steps_list) {
    recipe_page.innerHTML =`<div class="recipe-content">
                                <img src=${img} alt=${dish_name} class="card-img">
                                <div class="btn-category-flex">
                                    <p class="recipe-content-tags">${category}, ${area}</p>
                                    <a href="${youtube_link}">Watch a video of the recipe</a>       
                                </div>
                                <p class="ingredients-head">Ingredients List with Quantity</p>
                                <ul class="ingredients">
                                </ul>
                                <div class="recipe-steps">
                                </div>
                            </div>`
    let ingredients = document.querySelector(".ingredients");
    let recipe_steps = document.querySelector(".recipe-steps");
    for(let i = 0; i<ingredients_list.length;i++) {
        let li = document.createElement("li");
        li.innerHTML = `<span class="ingredient">${ingredients_list[i]["ingredient"]} : </span>${ingredients_list[i]["quantity"]}`
        ingredients.appendChild(li);
    }

    for (let i = 0; i<steps_list.length;i++) {
        let p = document.createElement("p");
        p.classList.add("recipe-content-text")
        p.innerHTML = `<span>Step ${i+1} : </span>${steps_list[i]}`;
        recipe_steps.appendChild(p);
    }
}

function warning_message (element) {
    element.innerHTML = `<h2 class="warning">Sorry, We don't have any recipes for your search</h2>`
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

for (let i = 0;i < 7; i++ ) {
    let promise = fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then ((response) => {
        return response.json()
    }).then ((data) => {
        random_meals.push(data["meals"])
        if (random_meals.length === 4) {
            let meal =  data["meals"];
            let img = meal[0]["strMealThumb"];
            let meal_name = meal[0]["strMeal"];
            let meal_category = meal[0]["strCategory"];
            animation_box_img(img)
            animation_box_text(meal_name, meal_category);
        }
    }).catch(err => console.log("Error Occured", err));
}


arrow_next_icon.addEventListener("click", () => {
    if (random_meal_index === 8) {
        random_meal_index = 0;
    } else {
        random_meal_index += 1;
    }
    let meal = random_meals[random_meal_index][0];
    let img = meal["strMealThumb"];
    let meal_name = meal["strMeal"];
    let meal_category = meal["strCategory"];

    animation_box_img(img)
    animation_box_text(meal_name, meal_category);
})

arrow_back_icon.addEventListener("click", () => {
    if (random_meal_index === 0) {
        random_meal_index = 8;
    } else {
        random_meal_index -= 1;
    }
    let meal = random_meals[random_meal_index][0];
    let img = meal["strMealThumb"];
    let meal_name = meal["strMeal"];
    let meal_category = meal["strCategory"];

    animation_box_img(img)
    animation_box_text(meal_name, meal_category);
})

animation_box.addEventListener("click", ()=> {
    default_page_hidden();
    setTimeout(visible,400,animation_recipe_back);
    let meal_info = random_meals[random_meal_index][0];
    let meal_name = meal_info["strMeal"];
    let img = meal_info["strMealThumb"];
    let category = meal_info["strCategory"];
    let area = meal_info["strArea"];
    let youtube_link = meal_info["strYoutube"];
    let instructions = meal_info["strInstructions"];
    let instructions_list = instructions.split("\r\n");
    let correct_instructions_string = instructions_list.join("");
    let correct_instructions_list = correct_instructions_string.split(".")
    correct_instructions_list.pop();
    let ingredients_list = [];
    for (let i = 1; i < 100; i++) {
        let item = meal_info[`strIngredient${i}`]
        let measure = meal_info[`strMeasure${i}`]
        if (item === "" || item === null) {
            break;
        }
        heading.textContent = `${meal_name}`
        recipe_page.classList.add("recipe-page-design")
        ingredients_list.push({ingredient:item,quantity:measure})           
    }
    recipe_page_creation(img,meal_name,category,area,youtube_link,ingredients_list,correct_instructions_list)
})

animation_recipe_back.addEventListener("click", () => {
    hidden(animation_recipe_back);  
    recipe_page.classList.remove("recipe-page-design")
    heading.textContent  = "";
    recipe_page.innerHTML = "";
    default_page_visible();
})

filter.onclick = function() {
    visible(filter_options);
    setTimeout(hidden, 10000,filter_options);
}

filtered_box.addEventListener("click", (e)=> {
    if (e.target.tagName === "BUTTON") {
        default_page_hidden()
        let promise = fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.dataset.cat}`);
        promise
        .then((response) => {
            return response.json()
        }).then((data) => {
            heading.textContent = e.target.dataset.cat;
            sessionStorage.setItem("category_title",heading.textContent);
            visible(back_category)
            let meals = data["meals"];
            for (let i = 0; i<meals.length;i++) {
                let img = meals[i]["strMealThumb"];
                let desc = meals[i]["strMeal"];
                let id = meals[i]["idMeal"]
                recipe_card_creation(img,desc,id);
            }
        }).catch(err=> {
            console.log("Error Occured: ",err);
        })
    }
})

search_icon.addEventListener("click", ()=> {
    setTimeout(visible,500,search_box)
    setTimeout(visible,500,search_btn)
    search_icon.style.visibility = "hidden";
    setTimeout (hidden,20000,search_box) 
    setTimeout (hidden,20000,search_btn)
    setTimeout(()=> { search_icon.style.visibility = "visible"},20000) 
})


back_category.addEventListener("click", (e) => {
    let category_title = sessionStorage.getItem("category_title");
    if (document.querySelector(".recipe-content") === null) {
        hidden(back_category);
        heading.innerHTML = "";
        recipes.innerHTML = "";
        default_page_visible()
    } else {
        recipe_page.innerHTML = "";
        recipe_page.classList.remove("recipe-page-design")
        heading.textContent = `${category_title}`;
        setTimeout(visible,200,recipes);
    }    
})

recipes.addEventListener("click", (e) => {
    if(e.target.tagName === "BUTTON") {
        if (!(filter_search_box.value === "")) {
            setTimeout(hidden,200,back_search)
            setTimeout(visible,200,back_filter_recipe)
        }     
        setTimeout(hidden,200,recipes);
        let mealid = e.target.dataset.mealid;
        let promise = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
        promise
        .then((response) => {
            return response.json();
        }).then((data) => {
            let meal_info = data["meals"][0];
            let meal_name = meal_info["strMeal"];
            let img = meal_info["strMealThumb"];
            let category = meal_info["strCategory"];
            let area = meal_info["strArea"];
            let youtube_link = meal_info["strYoutube"];
            let instructions = meal_info["strInstructions"];
            let instructions_list = instructions.split("\r\n");
            let correct_instructions_string = instructions_list.join("");
            let correct_instructions_list = correct_instructions_string.split(".")
            correct_instructions_list.pop();
            let ingredients_list = [];
            for (let i = 1; i < 100; i++) {
                let item = meal_info[`strIngredient${i}`]
                let measure = meal_info[`strMeasure${i}`]
                if (item === "" || item === null) {
                    break;
                }
                heading.textContent = `${meal_name}`
                recipe_page.classList.add("recipe-page-design")
                ingredients_list.push({ingredient:item,quantity:measure})           
            }
            recipe_page_creation(img,meal_name,category,area,youtube_link,ingredients_list,correct_instructions_list)
        }).catch (err => {
            console.log("Error occured ", err);
        })
    }
})

search.addEventListener("click", (e) =>{
    if (e.target.tagName === "BUTTON") {
        default_page_hidden()
        setTimeout(hidden,200,recipes)
        setTimeout(visible,200,back_search)
        let search_meal = search_box.value;
        search_box.value = "";
        let promise = fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search_meal}`)
        promise
         .then((response) => {
            return response.json()
         }).then((data) => {
            if (!(data["meals"]===null)) {
                let meal_info = data["meals"][0];
                let meal_name = meal_info["strMeal"];
                let img = meal_info["strMealThumb"];
                let category = meal_info["strCategory"];
                let area = meal_info["strArea"];
                let youtube_link = meal_info["strYoutube"];
                let instructions = meal_info["strInstructions"];
                let instructions_list = instructions.split("\r\n");
                let correct_instructions_string = instructions_list.join("");
                let correct_instructions_list = correct_instructions_string.split(".")
                correct_instructions_list.pop();
                let ingredients_list = [];
                for (let i = 1; i < 100; i++) {
                    let item = meal_info[`strIngredient${i}`]
                    let measure = meal_info[`strMeasure${i}`]
                    if (item === "" || item === null) {
                        break;
                    }
                    heading.textContent = `${meal_name}`
                    recipe_page.classList.add("recipe-page-design")
                    ingredients_list.push({ingredient:item,quantity:measure})           
                }
                recipe_page_creation(img,meal_name,category,area,youtube_link,ingredients_list,correct_instructions_list)
            }else {
                warning_message(recipe_page);
            }
         }).catch (err => {
            console.log("Error occured : ", err)
         })
    }
})

back_search.addEventListener("click", (e) => {
    window.location.reload();
})

filter_options.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        hidden(filter_options);
        sessionStorage.setItem("filter_search",e.target.textContent);
        default_page_hidden();
        setTimeout(visible,200,back_search)
        setTimeout(visible,200,filter_search)
           
    }
})

filter_search.addEventListener("click", (e)=> {
    if (e.target.tagName === "BUTTON") {
        setTimeout(hidden,200,filter_search)
        let search_value = filter_search_box.value;
        let filter = sessionStorage.getItem("filter_search");
        switch (filter) {
            case "Category" :
                search_filtering(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${search_value}`,search_value);
                break;
            case "Main Ingredient" :
                search_filtering(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search_value}`,search_value);
                break;
            case "Area" :
                search_filtering(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${search_value}`,search_value)
                break;  
        }
    }
})


function search_filtering (url,filter_value) {
    let promise = fetch(url);
    promise
        .then((response)=> {
            return response.json()
        }).then ((data)=> {
            let meals = data["meals"];
            if (!(meals === null)) {
                heading.textContent = filter_value;
                sessionStorage.setItem("filter_value",filter_value)
                for (let i = 0; i<meals.length;i++) {
                    let img = meals[i]["strMealThumb"];
                    let desc = meals[i]["strMeal"];
                    let id = meals[i]["idMeal"]
                    recipe_card_creation(img,desc,id);
                }
            }else {
                warning_message(recipes);
            }
        }).catch(err => {
            console.log("Error Occured : ",err);
        })
}

back_filter_recipe.addEventListener("click", () => {
    let title = sessionStorage.getItem("filter_value")
    recipe_page.innerHTML = "";
    heading.innerHTML = "";
    heading.textContent = title;
    recipe_page.classList.remove("recipe-page-design")
    setTimeout(visible,200,recipes);
    setTimeout(hidden,200,back_filter_recipe);
    setTimeout(visible,200,back_search);
}) 