import { describe, it, expect, jest } from "@jest/globals";
import { ClerkAPIResponseError } from "@clerk/shared/error";

jest.mock("@clerk/nextjs", () => ({
  isClerkAPIResponseError(error: any): error is ClerkAPIResponseError {
    if (error.isClerkError) return true;

    return false;
  },
}));

describe("getAuthErrorMessage", () => {
  it("should return correct error message", async () => {
    const { getAuthErrorMessage } = await import("../getAuthErrorMessage");

    const customError = { message: "Error!!" };
    const tooManyReqError = {
      isClerkError: true,
      status: 429,
      errors: [{ code: "too_many_requests" }],
    };
    const tooManyIncorrectReqError = {
      isClerkError: true,
      status: 403,
      errors: [{ code: "user_locked" }],
    };
    const invalidCredError = {
      isClerkError: true,
      status: 422,
      errors: [{ code: "invalid_credentials" }],
    };

    const customErrorMessage = getAuthErrorMessage(customError);
    const tooManyReqErrorMessage = getAuthErrorMessage(tooManyReqError);
    const tooManyIncorrectReqErrorMessage = getAuthErrorMessage(
      tooManyIncorrectReqError
    );
    const invalidCredentialsErrorMessage =
      getAuthErrorMessage(invalidCredError);

    expect(customErrorMessage).toBe("Something went wrong! Please try again.");
    expect(tooManyIncorrectReqErrorMessage).toBe(
      "Sorry, too many incorrect login attempts. For security reasons, please wait 59 minutes before trying again."
    );
    expect(tooManyReqErrorMessage).toBe(
      "Sorry, too many requests. For security reasons, please wait for a while before trying again."
    );
    expect(invalidCredentialsErrorMessage).toBe(
      "Your login info is invalid. Please try again with correct credentials."
    );
  });
});
