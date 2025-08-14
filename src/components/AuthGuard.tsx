import { useRouter } from "next/router";
import { useEffect } from "react";

// Replace with your actual auth logic
function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token");
}

const PUBLIC_PATHS = ["/login", "/register"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

useEffect(() => {
    const loggedIn = isLoggedIn();
    const isPublic = PUBLIC_PATHS.includes(router.pathname);

    if (!loggedIn && !isPublic) {
        router.replace("/register");
    } else if (loggedIn && isPublic) {
        router.replace("/tasks");
    }
}, [router]);

  return <>{children}</>;
}