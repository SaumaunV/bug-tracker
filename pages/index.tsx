import { useUser } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useRouter } from "next/router";
import Dashboard from "../components/Dashboard/Dashboard";
import LoginForm from "../components/LoginForm";

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  if(user) router.push("/dashboard");
  else if(isLoading) {}
  else router.push("http://localhost:3000/api/auth/login");
  
  
  return (
    <div>
    </div>
  );
}
