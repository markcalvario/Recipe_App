import json, os
import urllib.parse
from flask import Flask, url_for, render_template, request, jsonify

cwd = os.getcwd()
filename = os.path.join(cwd, "./static/","data.json")

recipeId = 10
latest = 5
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

@app.route('/search')
# write a home method
def search():    
    return render_template("search.html", recipes = recipes)

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

    return jsonify(recipes = recipes)

@app.route('/view/<id>')
def view_recipe(id):
    return render_template("home.html", recipes = recipes)


if __name__=="__main__":
    app.run(debug=True)