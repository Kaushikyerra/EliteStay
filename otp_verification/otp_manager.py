import random
import time
from typing import Tuple, Optional

otp_store = {}

def generate_otp(length: int = 6) -> str:
    return f"{random.randint(10**(length-1), 10**length - 1)}"

def store_otp(phone_number: str, otp: str, expiry_seconds: int):
    otp_store[phone_number] = (otp, time.time() + expiry_seconds)

def get_otp(phone_number: str) -> Optional[Tuple[str, float]]:
    return otp_store.get(phone_number)

def delete_otp(phone_number: str):
    otp_store.pop(phone_number, None)
