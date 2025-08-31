import random
from app.extensions import redis_client
from app.utils.send_email import send_email

def generate_otp_service(email):
    otp = str(random.randint(100000, 999999))
    redis_client.setex(f"otp:{email}", 300, otp)  # TTL 300s = 5 phút

    subject = "Mã OTP đăng ký Toi doc sach Shop / OTP Code for Toi doc sach Shop"

    body_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #2c3e50;">Chào mừng bạn đến với Toi doc sach Shop!</h2>
        <p>Xin chào <strong>{email}</strong>,</p>
        <p>Cảm ơn bạn đã đăng ký tài khoản tại <strong>Toi doc sach Shop</strong>. 
        Chúng tôi rất vui mừng khi bạn tham gia cộng đồng của chúng tôi.</p>
        <p>Đây là mã OTP một lần của bạn để xác minh:</p>
        <p style="font-size: 22px; font-weight: bold; color: #0ea5e9;">{otp}</p>
        <p>Mã có hiệu lực trong <strong>5 phút</strong>. Vui lòng sử dụng để hoàn tất đăng ký/đăng nhập.</p>
        <hr style="margin:20px 0;">
        
        <h2 style="color: #2c3e50;">Welcome to Toi doc sach Shop!</h2>
        <p>Hello <strong>{email}</strong>,</p>
        <p>Thank you for registering at <strong>Toi doc sach Shop</strong>. 
        We’re excited to have you join our community.</p>
        <p>This is your one-time OTP code for verification:</p>
        <p style="font-size: 22px; font-weight: bold; color: #0ea5e9;">{otp}</p>
        <p>This code is valid for <strong>5 minutes</strong>. Please use it to complete your registration/login.</p>

        <br>
        <p>Trân trọng / Best regards,<br><strong>Toi doc sach Shop Team</strong></p>
      </body>
    </html>
    """

    send_email(email, subject, body_html)
    return {"message": "OTP đã được gửi đến email"}, 200




def generate_otp_service_recovery_password(email):
    otp = str(random.randint(100000, 999999))
    redis_client.setex(f"otp:{email}", 300, otp)  # TTL 300s = 5 phút

    subject = "Mã OTP khôi phục mật khẩu / Password Recovery OTP - Toi doc sach Shop"

    body_html = f"""
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #e11d48;">Yêu cầu đặt lại mật khẩu</h2>
        <p>Xin chào <strong>{email}</strong>,</p>
        <p>Bạn hoặc ai đó đã yêu cầu đặt lại mật khẩu cho tài khoản tại <strong>Toi doc sach Shop</strong>.</p>
        <p>Đây là mã OTP để xác minh:</p>
        <p style="font-size: 22px; font-weight: bold; color: #0ea5e9;">{otp}</p>
        <p>Mã này có hiệu lực trong <strong>5 phút</strong>. 
        Nếu bạn không yêu cầu, vui lòng bỏ qua email này. Mật khẩu của bạn vẫn an toàn.</p>
        <hr style="margin:20px 0;">

        <h2 style="color: #2c3e50;">Password Reset Request</h2>
        <p>Hello <strong>{email}</strong>,</p>
        <p>You (or someone else) requested to reset the password for your <strong>Toi doc sach Shop</strong> account.</p>
        <p>This is your OTP code for verification:</p>
        <p style="font-size: 22px; font-weight: bold; color: #0ea5e9;">{otp}</p>
        <p>This code is valid for <strong>5 minutes</strong>. 
        If you didn’t request this, you can safely ignore this email. Your password will remain unchanged.</p>

        <br>
        <p>Trân trọng / Best regards,<br><strong>Toi doc sach Shop Team</strong></p>
      </body>
    </html>
    """

    send_email(email, subject, body_html)
    return {"message": "OTP khôi phục mật khẩu đã được gửi đến email"}, 200