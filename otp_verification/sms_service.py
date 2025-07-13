import requests
import os
from dotenv import load_dotenv

load_dotenv()

FAST2SMS_API_KEY = os.getenv("FAST2SMS_API_KEY")
FAST2SMS_URL = "https://www.fast2sms.com/dev/bulk"

def send_sms(phone_number: str, otp: str) -> bool:
    headers = {
        "authorization": FAST2SMS_API_KEY,
        "Content-Type": "application/json"
    }
    params = {
        "route": "otp",
        "variables_values": otp,
        "numbers": phone_number,
        "flash": "0"
    }
    response = requests.get(FAST2SMS_URL, headers=headers, params=params)
    if response.status_code == 200:
        data = response.json()
        return data.get("return", False)
    return False
