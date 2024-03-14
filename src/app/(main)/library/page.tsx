import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import MyLibraryView from "./components/my-library-view";
import { SortObject } from "@/lib/types";
import { getUserSurveys } from "@/app/_actions/user-actions";

const MyLibraryPage = async () => {
  const queryClient = new QueryClient();

  const initialSort: SortObject = {
    column: "updated_at",
    type: "desc",
  };

  await queryClient.fetchQuery({
    queryKey: ["user", "surveys", 1, initialSort],
    queryFn: () => getUserSurveys(1, initialSort),
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
