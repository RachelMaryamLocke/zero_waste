from flask import Flask, render_template, request

app = Flask("MyApp")
@app.route("/")
def hello():
    return "hello world"
@app.route("/quiz")
def quiz():
    return render_template("quiz.html")
@app.route("/answer1", methods=["POST"])
def answer1():
    Q1 = request.form['Q1']
    Q2 = request.form['Q2']
    Q3 = request.form['Q3']
    Q4 = request.form['Q4']
    if Q1 == "Q1A1":
         Q1 = 1
    elif Q1 == "Q1A2":
         Q1 = 2
    elif Q1 == "Q1A3":
         Q1 = 3
    else:
         Q1 = 4
    if Q2 == "Q2A1":
         Q2 = 1
    elif Q2 == "Q2A2":
         Q2 = 2
    elif Q2 == "Q2A3":
         Q2 = 3
    else:
         Q2 = 4
    if Q3 == "Q3A1":
         Q3 = 1
    elif Q3 == "Q3A2":
         Q3 = 2
    else:
         Q3 = 3
    if Q4 == "Q4A1":
         Q4 = 1
    elif Q4 == "Q4A2":
         Q4 = 2
    else:
         Q4 = 3

    score = Q1+Q2+Q3+Q4
    if score <=5:
        return "Wow - you are so zero waste!!!"
    elif score <= 11:
        return "Hmmm... you know a bit, much room for improvement!"
    else:
        return "You are TERRIBLE at zero waste!"


app.run(debug=True)
