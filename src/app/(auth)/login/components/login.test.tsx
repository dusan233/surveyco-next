import { describe, it, expect, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("@clerk/nextjs");

jest.mock("../../../../components/auto-animate", () => {
  const AutoAnimate = ({ children, duration = 100, ...props }: any) => {
    return <>{children}</>;
  };

  return AutoAnimate;
});

describe("Log in component", () => {
  it("should render loading spinner before clerk useLogin hook is ready", async () => {
    const cs = await import("@clerk/nextjs");
    //@ts-ignore
    cs.useSignIn.mockImplementation(() => {
      return {
        isLoaded: false,
      };
    });
    const Login = (await import("./login")).default;

    render(<Login />);

    const spinnerEl = screen.getByTitle("Spinner");

    //@ts-ignore
    expect(spinnerEl).toBeInTheDocument();
  });

  it("should render login form and oauth providers after clerk useLogin hook is ready", async () => {
    const cs = await import("@clerk/nextjs");
    //@ts-ignore
    cs.useSignIn.mockImplementation(() => {
      return {
        isLoaded: true,
      };
    });
    const Login = (await import("./login")).default;

    render(<Login />);

    const heading = screen.getByRole("heading", { name: "Log in" });
    const signInBtn = screen.getByRole("button", { name: "Log in" });
    const oAuthBtns = screen.getAllByRole("button", { name: /Log in with/i });

    //@ts-ignore
    expect(heading).toBeInTheDocument();
    //@ts-ignore
    expect(signInBtn).toBeInTheDocument();
    //@ts-ignore
    expect(oAuthBtns).toHaveLength(3);
  });
});
