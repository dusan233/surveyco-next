import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useCallback, useRef } from "react";

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
}

export const useSmoothScrollToQuestion = (
  virtualizer: ReturnType<typeof useWindowVirtualizer>
) => {
  const scrollingRef = useRef(0);

  return useCallback(
    (
      index: number,
      {
        aling: initialAling,
        duration = 500,
      }: { aling?: "start" | "center" | "end" | "auto"; duration?: number } = {}
    ) => {
      const start = virtualizer.scrollOffset;
      const startTime = (scrollingRef.current = Date.now());
      const [, align] = virtualizer.getOffsetForIndex(index, initialAling);

      const run = () => {
        if (scrollingRef.current !== startTime) return;
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = easeInOutQuint(Math.min(elapsed / duration, 1));
        const [offset] = virtualizer.getOffsetForIndex(index, align);
        const interpolated = start + (offset - start - 100) * progress;

        if (elapsed < duration) {
          virtualizer.scrollToOffset(interpolated, { align: "start" });
          requestAnimationFrame(run);
        } else {
          virtualizer.scrollToOffset(interpolated, { align: "start" });
        }
      };

      requestAnimationFrame(run);
    },
    [virtualizer]
  );
};
