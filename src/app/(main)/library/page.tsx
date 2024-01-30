import { getUserSurveys } from "@/app/actions";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import MyLibraryView from "./components/my-library-view";
import { SortObject } from "@/lib/types";

const MyLibraryPage = async () => {
  const queryClient = new QueryClient();

  const initialSort: SortObject = {
    column: "updated_at",
    type: "desc",
  };

  await queryClient.prefetchQuery({
    queryKey: ["user", "surveys", 1, initialSort],
    queryFn: () => getUserSurveys(1, initialSort),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-5 h-full sm:p-10">
        <MyLibraryView />
      </div>
    </HydrationBoundary>
  );
};

export default MyLibraryPage;
