import { useEffect, useRef } from "react";

export const useLastSuccessData = <TData>(data: TData) => {
  const lastSuccessData = useRef(data);

  useEffect(() => {
    if (data) lastSuccessData.current = data;
  }, [data]);

  return {
    lastSuccessData: lastSuccessData.current,
  };
};
