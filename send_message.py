import requests
from dotenv import load_dotenv
import os
load_dotenv() # This will load .env file as enviroment variables allowing you to continue developing locally as before

def send_message(email,name,option1,option2,option3,option4):
  mail_api_key= os.getenv("MAILGUN_API") # This will read necessary variables from enviroment variables
  mail_domain = os.getenv("MAILGUN_DOMAIN")
  if option1 == None:
      option1 = ""
  else: option1 = "Refill Shops,"
  if option2 == None:
      option2 = ""
  else: option2 = "Reuseable Products,"
  if option3 == None:
      option3 = ""
  else: option3 = "Sustainable Brands,"
  if option4 == None:
        option4 = ""
  else: option4 = "Zero Waste News"
  print option1
  return requests.post(
    "https://api.mailgun.net/v3/{}/messages".format(mail_domain),
      auth=("api", mail_api_key),
      data={"from": "EvergreenEarth <mailgun@{}>".format(mail_domain),
        "to": [email],
        "subject": "Welcome to Evergreen Earth!",
        "text": "Hi {}, Thanks for signing up to the Evergreen Earth newsletter! You have chosen to hear about {} {} {} {}!".format(name, option1,option2,option3,option4)})
