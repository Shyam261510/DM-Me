import axios from "axios";

export const loginHandler = async (email: string, username: string) => {
  try {
    const res = await axios.post(`${process.env.BACKEND_ENDPOINT}/api/signin`, {
      email,
      username,
    });

    const { success, message, user } = res.data;

    if (!success) {
      return { success: false, message };
    }

    return { success: true, user };
  } catch (error: any) {
    // Axios-specific error handling
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "Request failed",
      };
    }

    // Unknown / non-Axios error
    console.error("Login Handler error:", error);
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
};
