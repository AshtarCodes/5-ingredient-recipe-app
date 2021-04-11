let input = document.querySelector('#recipeName')

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.querySelector("button").click();
    }
});

document.querySelector('#submit').addEventListener('click', getRecipe)


async function getRecipe () {
    let recipeName = document.querySelector('#recipeName').value.toLowerCase()
    recipeName = recipeName.split(' ').join(' ');
    console.log(recipeName);
       
    try {
        const response = await fetch(`http://localhost:8000/api/recipes/${recipeName}`)
        // const response = await fetch(`https://ash-recipe-api.herokuapp.com/api/recipes/${recipeName}`)
        const data = await response.json()
        console.log(data);
        if (typeof data === "object"){
            document.querySelector('.recipe-name').innerText = data.name
            document.querySelector('.author').innerText = data.author
            document.querySelector('.description').innerText = data.description
            document.querySelector('.recipe-link').innerText = `Find the recipe here: ${data.link}`
            document.querySelector('#ingredient-1').innerText = data.ingredients[0].name
            document.querySelector('#amount-1').innerText = data.ingredients[0].amount
            document.querySelector('#ingredient-2').innerText = data.ingredients[1].name
            document.querySelector('#amount-2').innerText = data.ingredients[1].amount
            document.querySelector('#ingredient-3').innerText = data.ingredients[2].name
            document.querySelector('#amount-3').innerText = data.ingredients[2].amount;
            document.querySelector('#ingredient-4').innerText = data.ingredients[3].name
            document.querySelector('#amount-4').innerText = data.ingredients[3].amount
            document.querySelector('#ingredient-5').innerText = data.ingredients[4].name
            document.querySelector('#amount-5').innerText = data.ingredients[4].amount

            if (data.video !== null){
                document.querySelector('iframe').src = data.video;
                document.querySelector('iframe').classList.remove('display-none')
                document.querySelector('#videoContainer').classList.remove('display-none')
                document.querySelector('#videoContainer').classList.add('video-container')
            } else {
                document.querySelector('iframe').src = '';
                document.querySelector('iframe').classList.add('display-none')
                document.querySelector('#videoContainer').classList.add('display-none')
                document.querySelector('#videoContainer').classList.remove('video-container')
            }
        } 
    } catch (error) {
        console.log(error);
        document.querySelector('.recipe-name').innerText = `We don't have this recipe yet. Sorry!`
        document.querySelector('.author').innerText = null
        document.querySelector('.description').innerText = null
        document.querySelector('.recipe-link').innerText = null
        document.querySelector('#ingredient-1').innerText = null
        document.querySelector('#amount-1').innerText = null
        document.querySelector('#ingredient-2').innerText = null
        document.querySelector('#amount-2').innerText = null
        document.querySelector('#ingredient-3').innerText = null
        document.querySelector('#amount-3').innerText = null
        document.querySelector('#ingredient-4').innerText = null
        document.querySelector('#amount-4').innerText = null
        document.querySelector('#ingredient-5').innerText = null
        document.querySelector('#amount-5').innerText = null
    }
}