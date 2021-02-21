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

display_recipe_cards(recipesData);