import axios from "axios";

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
}/image/upload`;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImageToCloudinary(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    console.log("FormData yang dikirim:", formData);

    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 100000,
    });

    console.log("Response dari Cloudinary:", response.data);
    return response.data.secure_url;
  } catch (error) {
    console.error("Error saat upload gambar ke Cloudinary:", error);
    throw error;
  }
}
