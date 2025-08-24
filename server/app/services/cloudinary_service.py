import cloudinary
import cloudinary.uploader
import os

def upload_images_to_cloudinary(files):
    """
    Upload nhiều ảnh lên Cloudinary
    files: list of file objects
    return: list of dict: [{"image_url":..., "image_public_id":...}, ...]
    """
    cloudinary.config(
        cloud_name=os.getenv("CLOUD_NAME"),
        api_key=os.getenv("CLOUD_API_KEY"),
        api_secret=os.getenv("CLOUD_API_SECRET")
    )

    images = []

    for file in files:
        result = cloudinary.uploader.upload(file)
        images.append({
            "image_url": result["secure_url"],
            "image_public_id": result["public_id"]
        })

    return images
