import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`,{
      email,
      password
    })
    return response.data.data; // Assuming the API returns { success: true, data: [...] }
    } catch (error) {
        
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error to be handled by the caller
    }
};

