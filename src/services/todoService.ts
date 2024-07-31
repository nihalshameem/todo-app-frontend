import axios from "axios";
import { apiUri, DefaultResponse, getErrorMsg, token } from "../config";

interface AddtodoInterface {
  text: string;
  user_id: string;
  task_date: string;
}

export const addTodoService = async (req: AddtodoInterface) => {
  try {
    const response = await axios.post(`${apiUri}todos/add`, req, {
      headers: {
        Authorization: token,
      },
    });
    var result: DefaultResponse = {
      data: response,
      message: "",
      status: "success",
    };
    return result;
  } catch (error) {
    console.error("Error adding todo:", error);
    const result: DefaultResponse = {
      data: null,
      message: getErrorMsg(error),
      status: "error",
    };
    return result;
  }
};
