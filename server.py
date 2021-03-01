import json, os
import urllib.parse
from flask import Flask, url_for, render_template, request, jsonify,redirect

cwd = os.getcwd()
filename = os.path.join(cwd, "./static/","data.json")

recipeId = 10
latest = 5
results = []
with open(filename) as f:
    data = json.load(f)
    recipes = data["recipes"]
    recent_recipes = recipes[latest:]
# create an app instance
app = Flask(__name__)



# create a base route
@app.route('/')
# write a home method
def home():    
    return render_template("home.html", recipes = recent_recipes)
 
# ----------- SEARCHING A RECIPE ----------
@app.route('/search', methods=['GET', 'POST'])
# write a home method
def search():
    global results
    return render_template('search.html', recipes = results)

@app.route('/get_search', methods=['GET', 'POST'])
def get_search():
    global recipes
    global results
    search_results = []
    substring = request.get_json()
    substring = substring.lower()

    for recipe in recipes:
        food = recipe["food"].lower()
        description = recipe["description"].lower()
       
        if ( (substring in food) or (substring in description) ):
            search_results.append(recipe)
    
    results = search_results
    search_results = jsonify(recipes = search_results)
    print("data sent")
    
    return search_results

# ----------- CREATING A RECIPE ---------- #
@app.route('/create')
def create():
    return render_template("create.html", recipes = recipes)

@app.route('/create_recipe', methods=['GET', 'POST'])
def create_recipe():
    global recipes
    global recipeId
    global recent_recipes
    global latest

    new_recipe = request.get_json()
    encoded_image = new_recipe["image"]
    image = urllib.parse.unquote(encoded_image)
    new_recipe["image"] = image
    new_recipe['id'] = recipeId
    recipeId+=1

    latest+=1

    recipes.append(new_recipe)
    recent_recipes = recipes[latest:]
    print(new_recipe)
    return jsonify(recipes = recipes)


# ----------- VIEWING A RECIPE ---------- #
@app.route('/view/<id>')
def view_recipe(id):
    current_recipe = recipes[int(id)]
    # print(current_recipe)
    return render_template("view.html", recipes = current_recipe)

@app.route('/update_recipe', methods=['GET', 'POST'])
def update_recipe():
    global recipes
    recipe = request.get_json()
    recipe_id = recipe["id"]
    new_recipe_name = recipe["new_value"]
    for r in recipes:
        if r["id"]== recipe_id:
            r["food"] = new_recipe_name
    return jsonify(recipe)

@app.route('/delete_ingredient', methods=['GET', 'POST'])
def delete_ingredient():
    global recipes
    recipe = request.get_json()
    recipe_id = recipe["id"]
    ingredient = recipe["ingredient"]

    current_recipe = None
    for r in recipes:
        if (r["id"]== recipe_id):
            current_recipe = r
    
    all_ingredients = current_recipe["ingredients"]
    for i in all_ingredients:
        if (i["ingredient"]==ingredient):
            i["mark_as_deleted"] = True
    print(recipe)
    
    return jsonify(recipe)

@app.route('/undo_delete_ingredient', methods=['GET', 'POST'])
def undo_delete_ingredient():
    global recipes
    recipe = request.get_json()
    recipe_id = recipe["id"]
    ingredient = recipe["ingredient"]

    current_recipe = None
    for r in recipes:
        if (r["id"]== recipe_id):
            current_recipe = r
    
    all_ingredients = current_recipe["ingredients"]
    for i in all_ingredients:
        if (i["ingredient"]==ingredient):
            i["mark_as_deleted"] = False
    
    return jsonify(recipe)

if __name__=="__main__":
    app.run(debug=True)