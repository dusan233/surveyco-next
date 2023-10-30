"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

const CheckAuth = () => {
  const auth = useAuth();
  const user = useUser();

  useEffect(() => {
    const du = async () => {
      const token = await auth.getToken();
      console.log(token, "eve ga tokenero");
    };

    du();
  }, [auth]);

  console.log(auth, user);

  return <div>CheckAuth</div>;
};

export default CheckAuth;
