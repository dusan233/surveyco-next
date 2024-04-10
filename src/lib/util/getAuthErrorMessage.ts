import { isClerkAPIResponseError } from "@clerk/nextjs";

export const getAuthErrorMessage = (err: any) => {
  if (isClerkAPIResponseError(err)) {
    let errorMsg = "";
    if (err.status === 500) {
      errorMsg = "Something went wrong! Please try again.";
    } else if (err.status === 429) {
      errorMsg =
        "Sorry, too many requests. For security reasons, please wait for a while before trying again.";
    } else if (err.status === 422 || err.status === 400) {
      if (err.errors[0].code === "form_password_pwned") {
        errorMsg =
          "Password has been found in an online data breach.  For account safety, please use a different password.";
      } else if (err.errors[0].code === "form_identifier_exists") {
        errorMsg = "Account with that email address already exists.";
      } else {
        errorMsg =
          "Your login info is invalid. Please try again with correct credentials.";
      }
    } else if (err.status === 403 && err.errors[0].code === "user_locked") {
      errorMsg =
        "Sorry, too many incorrect login attempts. For security reasons, please wait 59 minutes before trying again.";
    }
    return errorMsg;
  } else {
    return "Something went wrong! Please try again.";
  }
};
