"use server";

import { auth } from "@clerk/nextjs";

export const getAccessToken = async () => {
  const { getToken } = auth();
  const token = await getToken();

  return token;
};
