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

edit.addEventListener("click", display_edit_form)