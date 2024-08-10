import axios from "axios";
import { apiUri, DefaultResponse, getErrorMsg } from "../config";
import { AuthFormIntserface } from "../utils/interfaces";

export const authService = async (req: AuthFormIntserface) => {
  try {
    var result: DefaultResponse = {
      data: null,
      message: "",
      status: "success",
    };
    const response = await axios.post(`${apiUri}auth/${req.mode}`, {
      username: req.username,
      password: req.password,
    });
    if (response.data && response.data.token) {
      result.data = response.data;
    } else {
      result.status = "error";
      result.message = "Inavlid credentials";
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
