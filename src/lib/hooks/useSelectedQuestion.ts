import { useEffect, useState } from "react";

export function useSelectedQuestion() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [canSelectQuestion, setCanSelectQuestion] = useState(true);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  useEffect(() => {
    if (canSelectQuestion) {
      setSelectedQuestion(pendingQuestion);
    }
  }, [canSelectQuestion, pendingQuestion]);

  return { selectedQuestion, setCanSelectQuestion, setPendingQuestion };
}
