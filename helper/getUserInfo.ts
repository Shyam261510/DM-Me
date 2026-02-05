import axios from "axios";

interface GetUserInfoTypes {
  email?: string;
  userId?: string;
  url?: string;
}
export const getUserInfo = async ({ email, userId, url }: GetUserInfoTypes) => {
  if (!email && !userId && !url) {
    return { success: false, message: "No email or userId or url provided" };
  }

  const customURL = userId
    ? `${process.env.BACKEND_ENDPOINT}/api/get_user_info?userId=${userId}`
    : `${process.env.BACKEND_ENDPOINT}/api/get_user_info?email=${email}`;

  // if cleint provide user id then use this endpoint to call api
  // `${process.env.BACKEND_ENDPOINT}/api/get_user_info?userId=${userId}`
  // If cleint provide email then user this endpoint to call api
  // `${process.env.BACKEND_ENDPOINT}/api/get_user_info?email=${email}`
  // If user does not provide the userId and email then user must provide their own custom url to make api call
  try {
    const res = await axios.get(
      email || userId ? (customURL as string) : (url as string),
    );
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
