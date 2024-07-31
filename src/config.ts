export const apiUri: string = process.env.REACT_APP_API_URL || "";

export interface AuthFormIntserface {
  username: string;
  password: string;
  mode: "login" | "signup";
}

export const getErrorMsg = (e: any) => {
  if (e && e.message) {
    return e.message;
  }
  return "An error occurred while adding the todo.";
};

export interface DefaultResponse {
  status: "success" | "error";
  data: any;
  message: string;
}

export const token = localStorage.getItem("token");
