export const getResponseData = async <T>(res: Response): Promise<T> => {
  try {
    return await res.json();
  } catch (err) {
    throw new Error("Something went wrong!");
  }
};
