import os
from app import create_app
from pyngrok import ngrok
from dotenv import load_dotenv

load_dotenv()  #
authtoken = os.getenv('NGROK_TOKEN')
ngrok_domain = os.getenv('NGROK_DOMAIN')


app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", 9999))  # Render sẽ tự set biến PORT
    app.run(host="0.0.0.0", port=port)
