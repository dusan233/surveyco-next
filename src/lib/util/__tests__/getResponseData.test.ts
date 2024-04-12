import { describe, it, expect } from "@jest/globals";
import { getResponseData } from "../getResponseData";

describe("getResponseData", () => {
  it("should return response data", async () => {
    const responseData = { name: "Mike", lastName: "Mikaelson", age: 24 };
    const responseObject = {
      json: async () => {
        return new Promise((resolve) => {
          return resolve(responseData);
        });
      },
    };

    const resData = await getResponseData(responseObject as Response);

    expect(resData).toEqual(responseData);
  });

  it("should throw error if something goes wrong during data parsing", async () => {
    const responseObject = {
      json: async () => {
        return new Promise((resolve, reject) => {
          return reject({ message: "Error!" });
        });
      },
    };

    try {
      await getResponseData(responseObject as Response);
    } catch (err: any) {
      expect(err.message).toBe("Something went wrong!");
    }
  });
});
