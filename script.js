// #FFC107

let random_meal = fetch('https://www.themealdb.com/api/json/v1/1/random.php');
random_meal
    .then((response)=> {
        return response.json()
    })
    .then((data)=> {
        console.log(data);
    })
    .catch(function(error) {
        console.log("Error occured, ",error)
    })