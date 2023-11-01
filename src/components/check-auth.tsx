"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import Spinner from "./ui/spinner";

const CheckAuth = () => {
  const auth = useAuth();
  const user = useUser();

  useEffect(() => {
    const du = async () => {
      const token = await auth.getToken();
      console.error(token, "eve ga tokenero");
    };

    du();
  }, [auth]);

  console.log(auth, user);

  return (
    <div>
      CheckAuth
      <Spinner size="sm" />
    </div>
  );
};

export default CheckAuth;
