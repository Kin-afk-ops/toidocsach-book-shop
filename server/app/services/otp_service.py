import random
from app.extensions import redis_client
from app.utils.send_email import send_email

def generate_otp_service(email):
    otp = str(random.randint(100000, 999999))
    redis_client.setex(f"otp:{email}", 300, otp)  # TTL 300s = 5 phút

    subject = "Mã OTP đăng ký Book Shop / OTP Code for Book Shop"

    body_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2c3e50;">Chào mừng bạn đến với Book Shop!</h2>
        <p>Xin chào <strong>{email}</strong>,</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>Book Shop</strong>. 
        Chúng tôi rất vui mừng khi bạn tham gia cộng đồng của chúng tôi.</p>
        <p>Đây là mã OTP một lần của bạn để xác minh:</p>
        <p style="font-size: 22px; font-weight: bold; color: #0ea5e9;">{otp}</p>
        <p>Mã có hiệu lực trong <strong>5 phút</strong>. Vui lòng sử dụng để hoàn tất đăng ký/đăng nhập.</p>
        <hr style="margin:20px 0;">
        
        <h2 style="color: #2c3e50;">Welcome to Book Shop!</h2>
        <p>Hello <strong>{email}</strong>,</p>
        <p>Thank you for registering at <strong>Book Shop</strong>. 
        We’re excited to have you join our community.</p>
        <p>This is your one-time OTP code for verification:</p>
        <p style="font-size: 22px; font-weight: bold; color: #0ea5e9;">{otp}</p>
        <p>This code is valid for <strong>5 minutes</strong>. Please use it to complete your registration/login.</p>

        <br>
        <p>Trân trọng / Best regards,<br><strong>Book Shop Team</strong></p>
      </body>
    </html>
    """

    send_email(email, subject, body_html)
    return {"message": "OTP đã được gửi đến email"}, 200
