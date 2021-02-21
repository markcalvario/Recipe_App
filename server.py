import json
from flask import Flask, url_for, render_template, request, jsonify


# create an app instance
app = Flask(__name__)



# create a base route
@app.route('/')
# write a home method
def home():    
    return render_template("home.html")

@app.route('/search')
# write a home method
def search():    
    return render_template("search.html")

@app.route('/create')
def create_recipe():
    return render_template("create.html")

@app.route('/view/<id>')
def view_recipe(id):
    return render_template("home.html")


if __name__=="__main__":
    app.run(debug=True)