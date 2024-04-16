import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("@clerk/nextjs");

jest.mock("next/navigation", () => {
  return {
    useRouter: () => {
      return {
        push: (path: string) => {},
      };
    },
  };
});

jest.mock("../../../../components/auto-animate", () => {
  const AutoAnimate = ({ children, ...props }: any) => {
    return <>{children}</>;
  };

  return AutoAnimate;
});

const renderSignUp = async () => {
  const SignUp = (await import("./sign-up")).default;

  return render(<SignUp />);
};

describe("Sign up component", () => {
  it("should render loading spinner before clerk useSignUp hook is ready", async () => {
    const clerk = await import("@clerk/nextjs");
    //@ts-ignore
    clerk.useSignUp.mockImplementation(() => {
      return {
        isLoaded: false,
      };
    });
    await renderSignUp();

    const spinnerEl = screen.getByTitle("Spinner");

    //@ts-ignore
    expect(spinnerEl).toBeInTheDocument();
  });

  it("should render sign up form and oauth providers after clerk useSignUp hook is ready", async () => {
    const clerk = await import("@clerk/nextjs");
    //@ts-ignore
    clerk.useSignUp.mockImplementation(() => {
      return {
        isLoaded: true,
      };
    });
    //@ts-ignore
    clerk.useSignIn.mockImplementation(() => {
      return {
        isLoaded: true,
      };
    });
    await renderSignUp();

    const heading = screen.getByRole("heading", { name: "Create an account" });
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const fullNameInput = screen.getByLabelText(/full name/i);

    //@ts-ignore
    expect(heading).toBeInTheDocument();
    //@ts-ignore
    expect(emailInput).toBeInTheDocument();
    //@ts-ignore
    expect(passwordInput).toBeInTheDocument();
    //@ts-ignore
    expect(fullNameInput).toBeInTheDocument();
  });
});
