"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/voting");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}

export default HomePage;
