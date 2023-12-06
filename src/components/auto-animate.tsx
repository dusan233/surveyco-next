import React, { ReactNode } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AutoAnimateOptions } from "@formkit/auto-animate";

type AutoAnimateProps = {
  children: ReactNode;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out" | ({} & string);
  disrespectUserMotionPreference?: boolean;
};

const AutoAnimate = ({
  children,
  duration = 100,
  ...props
}: AutoAnimateProps) => {
  const [parent] = useAutoAnimate({ duration, ...props });
  return <div ref={parent}>{children}</div>;
};

export default AutoAnimate;
