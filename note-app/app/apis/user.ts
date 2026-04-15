import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/user';

export const userLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    })
    console.log("Login response:", response.data);
    return {
      success: true,
      user: response.data.user,
      message: ""
    };
  } catch (error) {

    console.error("Error fetching users:", error);
    return {
      success: false,
      message: "An error occurred while logging in."
    };
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}`)
    console.log("Login response:", response.data);
    return {
      success: true,
      user: response.data.user,
      message: ""
    };
  } catch (error) {

    console.error("Error fetching users:", error);
    return {
      success: false,
      message: "An error occurred while logging in."
    };
    throw error; // Re-throw the error to be handled by the caller
  }
};

