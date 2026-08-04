# ==========================================================
# 🌾 AgriGenAI
# Email Service
# backend/utils/email_service.py
# ==========================================================

import os

from dotenv import load_dotenv

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import smtplib

# ==========================================================
# Load Environment Variables
# ==========================================================

load_dotenv()

EMAIL = os.getenv("MAIL_EMAIL")

PASSWORD = os.getenv("MAIL_PASSWORD")

# ==========================================================
# Send OTP Email
# ==========================================================

def send_otp_email(receiver_email, otp):

    try:

        subject = "🌾 AgriGenAI - Password Reset OTP"

        html = f"""
        <html>

        <body style="font-family:Arial;background:#f4f4f4;padding:40px;">

            <div style="max-width:600px;background:white;margin:auto;border-radius:12px;padding:30px;box-shadow:0px 0px 15px rgba(0,0,0,0.1);">

                <h1 style="color:#16a34a;text-align:center;">
                    🌾 AgriGenAI
                </h1>

                <hr>

                <h2>Password Reset Request</h2>

                <p>Hello Farmer,</p>

                <p>
                    We received a request to reset your password.
                </p>

                <p>Your OTP is:</p>

                <h1 style="
                    text-align:center;
                    letter-spacing:10px;
                    color:#16a34a;
                ">
                    {otp}
                </h1>

                <p>
                    This OTP is valid for
                    <b>5 minutes.</b>
                </p>

                <p>
                    If you didn't request this,
                    simply ignore this email.
                </p>

                <br>

                <hr>

                <p style="text-align:center;color:gray;">

                    🌾 Thank you for using AgriGenAI

                </p>

            </div>

        </body>

        </html>
        """

        message = MIMEMultipart()

        message["From"] = EMAIL

        message["To"] = receiver_email

        message["Subject"] = subject

        message.attach(

            MIMEText(

                html,

                "html"

            )

        )

        server = smtplib.SMTP(

            "smtp.gmail.com",

            587

        )

        server.starttls()

        server.login(

            EMAIL,

            PASSWORD

        )

        server.sendmail(

            EMAIL,

            receiver_email,

            message.as_string()

        )

        server.quit()

        print("✅ OTP Email Sent Successfully")

        return True

    except Exception as error:

        print(error)

        return False