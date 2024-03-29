import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import MyLibraryView from "./components/my-library-view";
import { SortObject } from "@/lib/types";
import { Metadata } from "next";
import { getUserSurveys } from "@/app/_api/user";
import { auth } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Welcome to Surveyco!",
  description:
    "My survey page, where all currently logged user created surveys will be displayed.",
};

const MyLibraryPage = async () => {
  const { userId, getToken } = auth();
  const accessToken = await getToken();
  const queryClient = new QueryClient();

  const initialSort: SortObject = {
    column: "updated_at",
    type: "desc",
  };

  await queryClient.fetchQuery({
    queryKey: ["user", "surveys", 1, initialSort],
    queryFn: () =>
      getUserSurveys({
        page: 1,
        sort: initialSort,
        token: accessToken,
        userId,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-5 h-full sm:p-10 max-w-screen-lg mx-auto">
        <MyLibraryView />
      </div>
    </HydrationBoundary>
  );
};

export default MyLibraryPage;
