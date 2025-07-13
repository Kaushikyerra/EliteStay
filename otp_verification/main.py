from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import time

from models import SendOTPRequest, VerifyOTPRequest
from otp_manager import generate_otp, store_otp, get_otp, delete_otp
from sms_service import send_sms

load_dotenv()

OTP_EXPIRY_SECONDS = int(os.getenv("OTP_EXPIRY_SECONDS", 300))

app = FastAPI()

# CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to specific domains in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/send-otp")
def send_otp(request: SendOTPRequest):
    otp = generate_otp()
    expiry = OTP_EXPIRY_SECONDS

    # Cooldown logic
    existing = get_otp(request.phone_number)
    if existing and time.time() < existing[1] - expiry + 30:
        raise HTTPException(status_code=429, detail="Please wait before requesting new OTP.")

    store_otp(request.phone_number, otp, expiry)
    sent = send_sms(request.phone_number, otp)
    if not sent:
        delete_otp(request.phone_number)
        raise HTTPException(status_code=500, detail="Failed to send OTP.")
    return {"success": True, "message": "OTP sent successfully."}

@app.post("/verify-otp")
def verify_otp(request: VerifyOTPRequest):
    record = get_otp(request.phone_number)
    if not record:
        raise HTTPException(status_code=400, detail="No OTP found for this number.")
    
    otp, expiry = record
    if time.time() > expiry:
        delete_otp(request.phone_number)
        raise HTTPException(status_code=400, detail="OTP expired.")
    if request.otp != otp:
        raise HTTPException(status_code=400, detail="Invalid OTP.")
    
    delete_otp(request.phone_number)
    return {"success": True, "message": "OTP verified successfully."}
