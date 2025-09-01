import os
from app import create_app
from dotenv import load_dotenv

load_dotenv()  #



app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 9999))  # Render sẽ tự set biến PORT
    app.run(host="0.0.0.0", port=port)
