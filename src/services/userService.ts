import axios from "axios";
import { apiUri, DefaultResponse, getErrorMsg, token } from "../config";

export const fetchUsersService = async (q: string = "") => {
  try {
    var result: DefaultResponse = {
      data: null,
      message: "",
      status: "success",
    };
    const response = await axios.get(`${apiUri}users?username=${q}`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === 200) {
      result.data = response.data;
    } else {
      result.status = "error";
      result.message = "Something went wrong";
    }
    return result;
  } catch (error) {
    console.error("Error adding user:", error);
    const result: DefaultResponse = {
      data: null,
      message: getErrorMsg(error),
      status: "error",
    };
    return result;
  }
};
