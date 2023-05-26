import { useUser } from "../UserProvider";
import {
  Flex,
  Spinner,
  Center,
  LightMode,
  Icon,
  Box,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { NextPage } from "next";
import RegisterForm from "../components/Forms/RegisterForm";
import LoginForm from "../components/Forms/LoginForm";
import { AiFillBug } from "react-icons/ai";

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
    <LightMode>
      <Flex
        position='relative'
        h="100vh"
        bgColor="lightgray"
        bgGradient="linear(to-br, blue.500, blue.700)"
        alignItems="center"
        justify="center"
        direction={"column"}
        overflow='hidden'
        _before={{
          content: '""',
          position: "absolute",
          bottom: 0,
          w: "100vw",
          h: "35vh",
          bgColor: "blue.50",
          borderTopRadius: "50%",
          transform: "scale(1.1)",
        }}
      >
        <Flex position='absolute' top={0} left={0} m={5} alignItems='center'>
          <Icon as={AiFillBug} boxSize={10} color="white" />
            <Box ml={3} fontWeight="bold" textColor="white" fontSize='2xl'>
              Bug Tracker
            </Box>
        </Flex>
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
    </LightMode>
  );
}

Home.getLayout = function PageLayout(page: NextPage) {
  return <>{page}</>
}

