export const checkEmail = (val: string) => /(.+)@(.+){2,}\.(.+){2,}/.test(val) || "Invalid email address";

export const checkRequiredString = (val: string | null) => (val && val.length > 0) || "Cannot be empty";
