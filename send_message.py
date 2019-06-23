import requests
from dotenv import load_dotenv
import os
load_dotenv() # This will load .env file as enviroment variables allowing you to continue developing locally as before

def send_message(email, message):
  mail_api_key= os.getenv("MAILGUN_API") # This will read necessary variables from enviroment variables
  mail_domain = os.getenv("MAILGUN_DOMAIN")

  return requests.post(
    "https://api.mailgun.net/v3/{}/messages".format(mail_domain),
      auth=("api", mail_api_key),
      data={"from": "Excited User <mailgun@{}>".format(mail_domain),
        "to": [email],
        "subject": "Greetings!",
        "text": "message"})
