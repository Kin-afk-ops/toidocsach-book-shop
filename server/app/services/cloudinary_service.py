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
    images.reverse()

    return images



def upload_one_image_to_cloudinary(file):
    """
    Upload 1 ảnh lên Cloudinary
    file: file object (bytes hoặc file path)
    return: dict {"image_url":..., "image_public_id":...}
    """
    cloudinary.config(
        cloud_name=os.getenv("CLOUD_NAME"),
        api_key=os.getenv("CLOUD_API_KEY"),
        api_secret=os.getenv("CLOUD_API_SECRET")
    )

    result = cloudinary.uploader.upload(file)
    return {
        "image_url": result["secure_url"],
        "image_public_id": result["public_id"]
    }