"use client";

import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

type TypeEffectHeadingProps = {
  sentences: string[];
};

const TypeEffectHeading = ({ sentences }: TypeEffectHeadingProps) => {
  const elRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(elRef.current, {
      strings: sentences,
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 0,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, [sentences]);

  return (
    <h1>
      <span ref={elRef} className="text-5xl font-bold text-primary" />
    </h1>
  );
};

export default TypeEffectHeading;
