import { useEffect, useLayoutEffect, useRef } from "react";

export function useClickAwayQuestionEdit<T extends Element>(
  cb: (e: MouseEvent | TouchEvent) => void
) {
  const ref = useRef<T>(null);
  const refCb = useRef(cb);

  useLayoutEffect(() => {
    refCb.current = cb;
  });

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const element = ref.current;
      const target = e.target as Element;

      let clickedOnQuestionEl = false;
      document.querySelectorAll("[data-question]").forEach((el) => {
        if (el.contains(target)) {
          clickedOnQuestionEl = true;
        }
      });

      if (element && !element.contains(target) && clickedOnQuestionEl) {
        refCb.current(e);
      } else {
        return false;
      }
    };

    document.addEventListener("click", handler, { capture: true });
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("click", handler, { capture: true });
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return ref;
}
