import { expect } from "@jest/globals";
import { cn } from "../cn";

describe("cn function", () => {
  it("should return an empty string for no arguments", () => {
    const classes = cn();
    expect(classes).toBe("");
  });

  it("should combine strings using clsx", () => {
    const classes = cn("class1", "class2");
    expect(classes).toBe("class1 class2");
  });

  it("should handle numbers as classNames", () => {
    const classes = cn(1, 2);
    expect(classes).toBe("1 2");
  });

  it("should handle booleans as classNames (truthy values only)", () => {
    const classes = cn(true, false);
    expect(classes).toBe("");
  });

  it("should handle null and undefined values", () => {
    const classes = cn("class1", null, undefined);
    expect(classes).toBe("class1");
  });

  it("should return correct value", () => {
    const classes = cn("class1", "class2", "class2", ["class4", "class5"]);
    expect(classes).toBe("class1 class2 class2 class4 class5");
  });
});
