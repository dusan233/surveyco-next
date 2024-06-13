import { ApiError } from "@/types/common";

export function formatApiError(err: ApiError) {
  switch (err.error.code) {
    case "MAX_PAGES_EXCEEDED":
      return "Survey can have up to 20 pages.";
    case "MAX_QUESTIONS_EXCEEDED":
      return "Survey can have up to 50 questions";
    default:
      return "Something went wrong!";
  }
}

type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}

export function getUnknownErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}
