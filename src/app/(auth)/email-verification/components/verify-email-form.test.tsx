import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("@clerk/nextjs");

jest.mock("../../../../components/auto-animate", () => {
  const AutoAnimate = ({ children, duration = 100, ...props }: any) => {
    return <>{children}</>;
  };

  return AutoAnimate;
});

const renderVerifyEmailForm = async () => {
  const VerifyEmailForm = (await import("./verify-email-form")).default;

  return render(<VerifyEmailForm />);
};

describe("VerifyEmailForm component", () => {
  it("should render loading spinner before clerk useLogin hook is ready", async () => {
    const clerk = await import("@clerk/nextjs");
    //@ts-ignore
    clerk.useUser.mockImplementation(() => {
      return {
        isLoaded: false,
      };
    });
    await renderVerifyEmailForm();

    const spinnerEl = screen.getByTitle("Spinner");

    //@ts-ignore
    expect(spinnerEl).toBeInTheDocument();
  });

  it("should render login form and oauth providers after clerk useLogin hook is ready", async () => {
    const clerk = await import("@clerk/nextjs");

    //@ts-ignore
    clerk.useUser.mockImplementation(() => {
      return {
        isLoaded: true,
      };
    });
    await renderVerifyEmailForm();

    const heading = screen.getByRole("heading", {
      name: "Enter confirmation code",
    });
    const verifyBtn = screen.getByRole("button", { name: "Verify" });
    const resendCodeBtn = screen.getAllByRole("button", {
      name: "Resend verification code",
    });

    //@ts-ignore
    expect(heading).toBeInTheDocument();
    //@ts-ignore
    expect(verifyBtn).toBeInTheDocument();
    //@ts-ignore
    expect(resendCodeBtn).toBeInTheDocument();
  });
});
