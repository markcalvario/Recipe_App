const addIngredientButton = document.getElementById("add-another-ingredient");
const listOfIngredients = document.getElementById("user-ingredients");
const addDirectionButton = document.getElementById("add-another-direction");
const listOfDirections = document.getElementById("user-directions");
const createRecipeForm = document.getElementById("create-recipe-form");

const shareButton = document.getElementById("share-button");


let ingredientId = 2;
let directionId = 2;

const addIngredientInput = ()=>{
  const li = document.createElement("li");
  const row = document.createElement("div");
  const inputCol = document.createElement("div");
  const newInput = document.createElement("input");
  const invalidDiv = document.createElement("div");
  const deleteCol = document.createElement("div");
  const deleteBtn = document.createElement("span");

  const currentId = ingredientId;
  const x = document.createTextNode("X");
  deleteBtn.append(x);
  deleteBtn.classList.add("btn", "btn-light");
  deleteBtn.addEventListener("click", ()=>{
    document.getElementById(`user-ingredients-${currentId}`).remove();
  });

  deleteCol.append(deleteBtn);
  deleteCol.classList.add("col-1");

  const invalidDescription = document.createTextNode("You entered an empty ingredient!");
  invalidDiv.append(invalidDescription);
  invalidDiv.classList.add("invalid-feedback");

  newInput.classList.add("form-control");
  newInput.type = "text";
  newInput.required = true;

  inputCol.append(newInput, invalidDiv);
  inputCol.classList.add("col-11");

  row.append(inputCol, deleteCol);
  row.classList.add("row");

  li.append(row);
  li.classList.add("py-2");
  li.id = `user-ingredients-${ingredientId++}`;
  listOfIngredients.append(li);

}
const addDirectionInput = ()=>{
  const li = document.createElement("li");
  const row = document.createElement("div");
  const inputCol = document.createElement("div");
  const newInput = document.createElement("input");
  const invalidDiv = document.createElement("div");
  const deleteCol = document.createElement("div");
  const deleteBtn = document.createElement("span");

  const currentId = ingredientId;
  const x = document.createTextNode("X");
  deleteBtn.append(x);
  deleteBtn.classList.add("btn", "btn-light");
  deleteBtn.addEventListener("click", ()=>{
    document.getElementById(`user-directions-${currentId}`).remove();
  });

  deleteCol.append(deleteBtn);
  deleteCol.classList.add("col-1");

  const invalidDescription = document.createTextNode("You entered an empty direction!");
  invalidDiv.append(invalidDescription);
  invalidDiv.classList.add("invalid-feedback");

  newInput.classList.add("form-control");
  newInput.type = "text";
  newInput.required = true;

  inputCol.append(newInput,invalidDiv);
  inputCol.classList.add("col-11");

  row.append(inputCol, deleteCol);
  row.classList.add("row");

  li.append(row);
  li.classList.add("py-2");
  li.id = `user-directions-${ingredientId++}`;
  listOfDirections.append(li);

}
const checkUserInputs = () =>{
  const fullNameInput = document.getElementById("full-name");
  const foodTitleInput = document.getElementById("food-title");
  const servingSizeInput = document.getElementById("serving-size");
  const imgUrlInput = document.getElementById("img-url");
  const foodDescriptionInput = document.getElementById("food-description");

  const fullName = document.getElementById("full-name").value;
  const foodTitle = document.getElementById("food-title").value;
  const servingSize = document.getElementById("serving-size").value;
  const imgUrl = document.getElementById("img-url").value;
  const foodDescription = document.getElementById("food-description").value;
  const ingredientsList = listOfIngredients.querySelectorAll(".form-control")
  const directionsList = listOfDirections.querySelectorAll(".form-control");

  const ingredients = []
  for (let i = 0; i< ingredientsList.length; i++) {
    let ingredientInput = ingredientsList[i];
    let ingredient = ingredientInput.value;
    console.log(ingredientInput)
    if (ingredient.length==0){
      ingredientInput.classList.add("is-invalid");
    }
    else{
      ingredientInput.classList.remove("is-invalid");
      ingredients.push(ingredient);
    }
    
  }
  const directions = []
  for (let i = 0; i< directionsList.length; i++) {
    let directionInput = directionsList[i];
    let direction = directionInput.value;
    if (direction.length==0){
      directionInput.classList.add("is-invalid");
    }
    else{
      directionInput.classList.remove("is-invalid");
      directions.push(direction);
    }
  }

  if (fullName.length==0){
    fullNameInput.classList.add("is-invalid");
  }else{
    fullNameInput.classList.remove("is-invalid");
  }
  if (foodTitle.length==0){
    foodTitleInput.classList.add("is-invalid");
  }else{
    foodTitleInput.classList.remove("is-invalid");
  }
  if (servingSize.length==0){
    servingSizeInput.classList.add("is-invalid");
  }else{
    servingSizeInput.classList.remove("is-invalid");
  }
  if (imgUrl.length==0){
    imgUrlInput.classList.add("is-invalid");
  }else{
    imgUrlInput.classList.remove("is-invalid");
  }
  if (foodDescription.length==0){
    foodDescriptionInput.classList.add("is-invalid");
  }else{
    foodDescriptionInput.classList.remove("is-invalid");
  }



  createRecipeForm.reset();
}

addIngredientButton.addEventListener("click", (event)=>{
  event.preventDefault();
  addIngredientInput();
});
addDirectionButton.addEventListener("click", (event)=>{
  event.preventDefault();
  addDirectionInput();
})
shareButton.addEventListener("click", (event)=>{
  event.preventDefault();
  checkUserInputs();
})


$( document ).ready(function() {
  // General Information
  $("#general-information-arrow").click(()=>{
    if ($("#general-information-arrow").is(".fa-angle-down")){
      $( "#general-information-arrow" ).removeClass( "fa-angle-down");
      $( "#general-information-arrow" ).addClass( "fa-angle-right");
      $( "#general-information-form").addClass("d-none");
    }
    else{
      $( "#general-information-arrow" ).addClass( "fa-angle-down");
      $( "#general-information-arrow" ).removeClass( "fa-angle-right");
      $( "#general-information-form").removeClass("d-none");

    }
  })
  // Ingredients 
  $("#ingredients-arrow").click(()=>{
    if ($("#ingredients-arrow").is(".fa-angle-down")){
      $( "#ingredients-arrow" ).removeClass( "fa-angle-down");
      $( "#ingredients-arrow" ).addClass( "fa-angle-right");
      $( "#ingredients-form").addClass("d-none");
    }
    else{
      $( "#ingredients-arrow" ).addClass( "fa-angle-down");
      $( "#ingredients-arrow" ).removeClass( "fa-angle-right");
      $( "#ingredients-form").removeClass("d-none");

    }
  })
  // Directions
  $("#directions-arrow").click(()=>{
    if ($("#directions-arrow").is(".fa-angle-down")){
      $( "#directions-arrow" ).removeClass( "fa-angle-down");
      $( "#directions-arrow" ).addClass( "fa-angle-right");
      $( "#directions-form").addClass("d-none");
    }
    else{
      $( "#directions-arrow" ).addClass( "fa-angle-down");
      $( "#directions-arrow" ).removeClass( "fa-angle-right");
      $( "#directions-form").removeClass("d-none");

    }
  })
});