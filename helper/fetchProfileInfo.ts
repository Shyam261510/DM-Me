import UserAgents from "user-agents";
import axios from "axios";

export const fetchProfileInfo = async (username: string) => {
  try {
    if (!username) {
      return {
        success: false,
        message: "Username is required",
      };
    }

    const userAgent = new UserAgents();

    const headers = {
      authority: "www.instagram.com",
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.6",
      priority: "u=1, i",
      referer: `https://www.instagram.com/${username}/`,
      "user-agent": userAgent.toString(),
      "x-ig-app-id": "936619743392459",
      "x-ig-www-claim": "0",
      "x-requested-with": "XMLHttpRequest",
    };

    const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`;

    const res = await axios.get(url, {
      headers,
      timeout: 10_000,
      validateStatus: () => true, // prevent axios throw
    });

    if (res.status !== 200) {
      return {
        success: false,
        message: "Failed to fetch Instagram profile",
      };
    }

    const { data } = res.data;
    const { user } = data || {};

    if (!user) {
      return {
        success: false,
        message: "Instagram user not found",
      };
    }

    const { id, biography, full_name, profile_pic_url_hd: profilePic } = user;

    return {
      success: true,
      user: {
        id,
        biography,
        full_name,
        profilePic,
        username,
      },
    };
  } catch (error: any) {
    console.error("fetchProfileInfo error:", error);

    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Instagram request failed",
      };
    }

    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
};
