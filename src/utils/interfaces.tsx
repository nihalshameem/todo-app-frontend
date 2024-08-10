export interface AuthFormIntserface {
  username: string;
  password: string;
  mode: "login" | "signup";
}

export interface OptionType {
  label: string;
  value: string;
}
