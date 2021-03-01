const recipeRow = document.getElementById("recipes-row");

const display_recipe_cards = (recipesData) =>{
    recipesData.map((recipe, index)=>{
        const id = recipe.id;
        const food = recipe.food;
        const description = recipe.description;
        const image = recipe.image;

        const column = document.createElement("div");
        const card = document.createElement("div");
        const imageTag = document.createElement("img");
        const cardBody = document.createElement("div");
        const cardBodyTitle = document.createElement("h5");
        const cardBodyDescription = document.createElement("p");
        const cardBodyLink = document.createElement("a");
        const cardImageLink = document.createElement("a");


        const cardTitle = document.createTextNode(`${food}`)
        const cardDescription = document.createTextNode(`${description}`);
        const linkText = document.createTextNode("Read More");

        cardBodyTitle.append(cardTitle);
        cardBodyTitle.classList.add("card-title");
        cardBodyDescription.append(cardDescription);
        cardBodyDescription.classList.add("card-text")
        cardBodyLink.append(linkText);
        cardBodyLink.classList.add("btn", "btn-primary")
        cardBodyLink.href = `/view/${id}`
        cardBody.append(cardBodyTitle, cardBodyDescription, cardBodyLink);
        cardBody.classList.add("card-body");

        imageTag.src = `${image}`;
        imageTag.alt = `${food}`;
        cardImageLink.append(imageTag);
        cardImageLink.href = `/view/${id}`;

        imageTag.classList.add("card-img-top", "card-img-resize");

        card.append(cardImageLink, cardBody);
        card.classList.add("card")

        column.append(card);
        column.id = `${id}`;
        column.classList.add("col-3", "my-3")
        recipeRow.append(column);

    })
}
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("submit-btn");

const checkUserInput = () =>{
    const searchValue = searchInput.value.trim();
    if (searchValue.length == 0){
        searchInput.classList.add("is-invalid");
    }
    else{
        searchInput.classList.remove("is-invalid");
        search(searchValue);
        searchInput.value = "";
    }
}

const clearSearchResults = ()=>{
    recipeRow.innerHTML= ""
}
const display_search_recipe_cards = (recipesData, searchRecipe) =>{
    const div = document.createElement("div");
    const p = document.createElement("p");
    let emptyMessage;
    if (recipesData.length!=1){
        emptyMessage = document.createTextNode(`${recipesData.length} results for "${searchRecipe}"`)
    }
    else{
        emptyMessage = document.createTextNode(`${recipesData.length} result for "${searchRecipe}"`)
    }
    p.append(emptyMessage);
    p.classList.add("fs-6")
    div.append(p);
    div.classList.add("text-white", "py-2");
    recipeRow.append(div);
    recipesData.map((recipe, index)=>{
        const id = recipe.id;
        const food = recipe.food;
        const description = recipe.description;
        const image = recipe.image;

        const column = document.createElement("div");
        const card = document.createElement("div");
        const imageTag = document.createElement("img");
        const cardBody = document.createElement("div");
        const cardBodyTitle = document.createElement("h5");
        const cardBodyDescription = document.createElement("p");
        const cardBodyLink = document.createElement("a");
        const cardImageLink = document.createElement("a");


        const cardTitle = document.createTextNode(`${food}`)
        const cardDescription = document.createTextNode(`${description}`);
        const linkText = document.createTextNode("Read More");

        cardBodyTitle.append(cardTitle);
        cardBodyTitle.classList.add("card-title");
        cardBodyDescription.append(cardDescription);
        cardBodyDescription.classList.add("card-text")
        cardBodyLink.append(linkText);
        cardBodyLink.classList.add("btn", "btn-primary")
        cardBodyLink.href = `/view/${id}`
        cardBody.append(cardBodyTitle, cardBodyDescription, cardBodyLink);
        cardBody.classList.add("card-body");

        imageTag.src = `${image}`;
        imageTag.alt = `${food}`;
        cardImageLink.append(imageTag);
        cardImageLink.href = `/view/${id}`;

        imageTag.classList.add("card-img-top", "card-img-resize");

        card.append(cardImageLink, cardBody);
        card.classList.add("card")

        column.append(card);
        column.id = `${id}`;
        column.classList.add("col-3", "my-3")
        recipeRow.append(column);

    })
}
const search = (searchRecipe) =>{
    $.ajax({
        type: 'POST',
        url: `/get_search`,
        data: JSON.stringify(searchRecipe),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result){
            
            console.log(result)
            const recipesResult = result["recipes"]
            console.log(recipesResult)
            window.location.href = "/search";
            if (recipeRow){
                clearSearchResults();
                display_search_recipe_cards(recipesResult, searchRecipe);
            }
            else{
                console.log("no recipe row")
            }
            
        },
        error: function(request, status, error){
            // window.location.href = "/search"
            console.log('Error');
            console.log(request);
            console.log(status);
            console.log(error);
        }
    }) 
}
if (recipeRow){
    clearSearchResults();
    display_recipe_cards(recipesData);
}

searchButton.addEventListener("click", (e)=>{
    e.preventDefault();
    checkUserInput();
})
