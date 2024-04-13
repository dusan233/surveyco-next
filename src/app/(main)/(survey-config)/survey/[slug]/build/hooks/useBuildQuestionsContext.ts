import {
  BuildQuestionsContext,
  BuildQuestionsStoreState,
} from "@/lib/providers/build-questions-provider";
import { useContext } from "react";
import { useStore } from "zustand";

function useBuildQuestionsContext<T>(
  selector: (state: BuildQuestionsStoreState) => T
): T {
  const store = useContext(BuildQuestionsContext);
  if (!store) throw new Error("Missing BearContext.Provider in the tree");
  return useStore(store, selector);
}

export default useBuildQuestionsContext;
