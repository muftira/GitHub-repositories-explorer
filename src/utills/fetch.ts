import axios from "axios";

const baseUrl = "https://api.github.com";

export async function fetchData<T>(fetchType: string, constApiUrl: string) {
  try {
    const response = await axios({
      url: baseUrl + constApiUrl,
      method: fetchType.toUpperCase(),
    });

    return {
      success: true,
      message: "Success",
      data: response,
    };
  } catch (e) {
    return {
      success: false,
      message: e instanceof Error ? e.message : "An unknown error occurred",
    };
  }
}
