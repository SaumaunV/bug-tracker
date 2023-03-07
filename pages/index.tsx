import { useUser } from "../UserProvider";
import {
  Flex,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { NextPage } from "next";
import RegisterForm from "../components/Forms/RegisterForm";
import LoginForm from "../components/Forms/LoginForm";

const link = "https://bugtracker-backend.onrender.com/login";
//const link = 'http://localhost:4000/login'

export default function Home() {
  const { user, loading: userLoading, setUser, setIsDemo } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  if (user) router.push("/dashboard");
  else if (userLoading || loading) return (
    <Center height='100vh'>
      <Spinner />
    </Center>
  ); 
  else return (
    <Flex
      h="100vh"
      bgColor="lightgray"
      alignItems="center"
      justify="center"
      direction={"column"}
    >
      {showRegister ? (
        <RegisterForm
          setShowRegister={setShowRegister}
          setUser={setUser}
          setLoading={setLoading}
        />
      ) : (
        <LoginForm
          setShowRegister={setShowRegister}
          setUser={setUser}
          setLoading={setLoading}
          setIsDemo={setIsDemo}
        />
      )}
    </Flex>
  );
}

Home.getLayout = function PageLayout(page: NextPage) {
  return <>{page}</>
}

