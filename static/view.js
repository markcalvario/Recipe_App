const recipeTitle = document.getElementById("recipe-title");
const bannerTitle = document.getElementById("title");
const recipeDescription = document.getElementById("recipe-description");
const recipeBanner = document.getElementById("title-section");
const edit = document.getElementById("edit");

const recipe = current_recipe;
recipeTitle.innerHTML = `${recipe.food}`
recipeDescription.innerHTML = `${recipe.description}`

const display_edit_form = () =>{
    const form = document.createElement("form");
    const inputSection = document.createElement("div");
    const input = document.createElement("input");
    const span = document.createElement("span");

    const buttonSection = document.createElement("div");
    const button1 = document.createElement("button");
    const button2 = document.createElement("button");

    // Section 1 
    span.innerHTML = "You entered an empty recipe name!";
    span.classList.add("invalid-feedback");
    input.type = "search";
    input.value = `${recipe.food}`;
    input.classList.add("form-control", "me-2");

    inputSection.classList.add("w-100", "mx-2", "py-2")
    inputSection.append(input, span);

    // Section 2
    button2.type = "submit";
    button2.classList.add("btn", "rounded-3", "btn-outline-light", "btn-dark", "mx-1");
    button2.innerHTML = "Submit";
    button2.addEventListener("click", (e)=>{
        e.preventDefault();
        const value = input.value.trim();
        if (value.length==0){
            input.classList.add("is-invalid");
            input.focus();
        }
        else{
            console.log("submit");
            submit_edit(value);
        }
    })
    
    button1.type = "submit";
    button1.classList.add("btn", "rounded-3", "btn-outline-light", "btn-dark", "mx-1");
    button1.innerHTML = "Discard Changes";
    button1.addEventListener("click", (e)=>{
        e.preventDefault();
        window.location.href = `/view/${recipe.id}`
    })

    buttonSection.append(button1, button2);
    buttonSection.classList.add("d-flex", "justify-content-center", "w-100");

    // Adding both sections together
    form.append(inputSection, buttonSection);
    form.classList.add("w-50");
    form.id = "edit-form";

    recipeBanner.append(form);
    bannerTitle.classList.add("d-none")
    input.focus();
}
const submit_edit = (new_value)=>{
    const data = {
        "id": recipe.id,
        "new_value": new_value
    }
    $.ajax({
        type: 'POST',
        url: `/update_recipe`,
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function(result){
            window.location.href = `/view/${recipe.id}`;
        },
        error: function(request, status, error){
            console.log('Error');
            console.log(request);
            console.log(status);
            console.log(error);
        }
    }) 
}

const display_ingredients = (ingredients) =>{
    const ingredientsCol = document.createElement("div");
    ingredientsCol.classList.add("col-4", "text-white");

    //Section 1
    const ingredientsTitleSection = document.createElement("div");
    const ingredientsTitle = document.createElement("h2");
    ingredientsTitle.innerHTML = "Ingredients";
    ingredientsTitle.classList.add("text-center","border-bottom", "pb-2", "text-uppercase");
    ingredientsTitleSection.classList.add("d-flex");

    ingredientsTitleSection.append(ingredientsTitle);

    //Section 2
    const ingredientsContainer = document.createElement("div");
    ingredientsContainer.classList.add("container-fluid","px-0")
    const unorderedList = document.createElement("ul");
    unorderedList.classList.add("list-group", "text-dark", "container-fluid","justify-content-between")

    for (let i in ingredients){
        let ingredient = ingredients[i];
        if (!(ingredient.mark_as_deleted)){
            //INGREDIENT SECTION
            const listItem = document.createElement("li");
            const textSectionCol = document.createElement("div");
            const textSectionRow = document.createElement("div");
            const inputSection = document.createElement("div");
            const input = document.createElement("input");
            const ingredietSection = document.createElement("div");
            //DELETE SECTION 
            const deleteCol = document.createElement("div");
            const deleteRow = document.createElement("div");
            const deleteSection = document.createElement("div");
            const deleteButton = document.createElement("span");


            deleteButton.innerHTML = "X";
            deleteButton.classList.add("cursor-pointer");
            // deleteButton.classList.add("btn", "rounded-3", "btn-outline-light","px-2", "py-0","btn-dark")
            deleteSection.append(deleteButton);
            deleteSection.classList.add("col-10", "mx-auto");
            deleteRow.append(deleteSection);
            deleteRow.classList.add("row");
            deleteCol.append(deleteRow);
            deleteCol.classList.add("col-2");

            ingredietSection.innerHTML = ingredient.ingredient;
            ingredietSection.classList.add("col-11");
            input.type = "checkbox";
            input.value = "";
            input.classList.add("form-check-input", "me-1");
            inputSection.append(input);
            inputSection.classList.add("col-1");
            textSectionRow.append(inputSection, ingredietSection);
            textSectionRow.classList.add("row");

            textSectionCol.append(textSectionRow);
            textSectionCol.classList.add("col-10");

            listItem.append(textSectionCol, deleteCol);
            listItem.classList.add("row", "text-white","py-1")

            unorderedList.append(listItem);

        }
    }
    ingredientsContainer.append(unorderedList);

    ingredientsCol.append(ingredientsTitleSection, ingredientsContainer);
    return ingredientsCol;
}
const display_directions = (directions) =>{
    const directionsCol = document.createElement("div");
    directionsCol.classList.add("col-8", "text-white");

    //Section 1
    const directionsTitleSection = document.createElement("div");
    directionsTitleSection.classList.add("d-flex");
    const directionsTitle = document.createElement("h2");
    directionsTitle.innerHTML = "directions";
    directionsTitle.classList.add("text-center","border-bottom", "pb-2", "text-uppercase");
    directionsTitleSection.append(directionsTitle);

    //Section 2
    const directionsContainer = document.createElement("div");
    directionsContainer.classList.add("container-fluid");
    const orderedList = document.createElement("ol");
    orderedList.classList.add("list-group", "text-dark", "container-fluid","justify-content-between", "ps-1")
    
    for (let direction in directions){
        //Direction SECTION
        const listItem = document.createElement("li");
        listItem.innerHTML = directions[direction];
        listItem.classList.add("text-white", "py-1");
        orderedList.append(listItem);
    }
    directionsContainer.append(orderedList);

    directionsCol.append(directionsTitleSection, directionsContainer);

    return directionsCol;

}
const display_ingredients_and_directions = ()=>{
    let ingredients = recipe.ingredients;
    let directions = recipe.directions;
    const container = document.getElementById("ingredients-and-directions");
    container.append(display_ingredients(ingredients), display_directions(directions));
    
    
}

display_ingredients_and_directions();

edit.addEventListener("click", display_edit_form)