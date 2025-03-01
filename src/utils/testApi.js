import apiClient from "../services/axiosInstance";

async function testApi() {
  try {
    const response = await apiClient.get("/content/all");
    console.log("Data from API:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

testApi();
