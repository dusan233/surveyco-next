import { jest } from "@jest/globals";

export const mockAutoAnimateComp = () => {
  jest.mock("../../components/auto-animate", () => {
    const AutoAnimate = ({ children }: any) => {
      return <>{children}</>;
    };

    return AutoAnimate;
  });
};

export const mockUseRouter = () => {
  jest.mock("next/navigation", () => {
    return {
      useRouter: () => {
        return {
          push: (path: string) => {},
        };
      },
    };
  });
};
