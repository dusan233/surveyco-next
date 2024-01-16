import { getUserSurveys } from "@/app/actions";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";
import MyLibraryView from "./components/my-library-view";

const MyLibraryPage = async () => {
  const queryClient = new QueryClient();

  const initialSort: { column: string; type: "asc" | "desc" } = {
    column: "updated_at",
    type: "desc",
  };

  await queryClient.prefetchQuery({
    queryKey: ["user", "surveys", 1, initialSort],
    queryFn: () => getUserSurveys(1, initialSort),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-10 bg-slate-100">
        <MyLibraryView />
      </div>
    </HydrationBoundary>
  );
};

export default MyLibraryPage;
