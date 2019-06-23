from flask import Flask, render_template, request

from send_message import send_message

app = Flask("MyApp")

# def send_confirmation_message(booking_email, booking_name, booking_date): #Irinas code for using the mailgun API send a confirmation email
# 	return requests.post(
# 		"https://api.mailgun.net/v3/sandbox987b713dd9344dc88c145724a2d28d92.mailgun.org/messages",
# 		auth=("api","4c7dc4bd1c814f264622f67b1eeb69ce-3b1f59cf-225d56b9"),
# 		data={"from": "The Scarlet Letter <mailgun@sandbox987b713dd9344dc88c145724a2d28d92.mailgun.org>",
# 			"to" :[booking_email],
# 			"subject": "Booking confirmation",
# 			"text": "Dear {}, this is to confirm your booking for {} at The Scarlet Letter Cocktail bar".format(booking_name, booking_date)})

@app.route("/") #app.route is specific to flask and forms the url paths for your web application
def index(): #personally called this method index to represent the fact it will return the index page
    return render_template('sustainable.html') #render_template is a flask specific method that returns the html page you want to display
                                         #render_template .html files are stored in the templates folder (required for flask to work correctly)

@app.route("/send", methods=["POST"])
def send():
  form_data = request.form
  send_message(form_data["address"])
  return "Thanks for Signing up! Please check your mailbox!"

@app.route("/map") #same functionality as above
def map():
    return render_template("map.html")

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

@app.route("/news")
def news():
    return render_template("legal_info.html")

@app.route("/about")
def about():
    return render_template("about_us.html")

@app.route("/answer", methods=["POST"])
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
    return render_template("answer.html", Q1=Q1, Q2=Q2, Q3=Q3, Q4=Q4, score=score)



app.run(debug=True)
