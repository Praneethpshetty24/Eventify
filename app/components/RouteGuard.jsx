"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        const isGuest = localStorage.getItem("isGuest") === "true";

        if (!user && !isGuest) {
          router.push("/signin");
        }
        setLoading(false);
      });

      // Check immediately for guest status
      const isGuest = localStorage.getItem("isGuest") === "true";
      if (isGuest) {
        setLoading(false);
      }

      return unsubscribe;
    };

    const unsubscribe = checkAuth();
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return children;
}