"use client";

import { useMeQuery } from "@/features/auth/api/authApi";
import { useEffect, useState } from "react";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";
import { redirect } from "next/navigation";

// TODO: при создании глобального стейта всего приложения сетать настройки для header
export default function Home() {
  const [isUserDetected, setIsUserDetected] = useState(false);
  const { data, isLoading, isError, isSuccess } = useMeQuery("");

  useEffect(() => {
    if (isLoading) return;
    setIsUserDetected(true);
    if (isSuccess) {
      redirect("/profile");
    }
  }, [data, isError]);

  if (!isUserDetected) {
    return <Ring size="40" stroke="5" bgOpacity="0" speed="2" color="white" />;
  }

  return <></>;
}
