import { useUser } from "../UserProvider";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { NextPage } from "next";
import Link from "next/link";

export default function Home() {
  const { user, loading: userLoading, setUser } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);

  if (user) router.push("/dashboard");
  if (userLoading) return <Spinner />;

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });
    const respData = await resp.json();
    if(respData) {
      setLoading(true);
      setUser(respData);
    }
    else setInvalidLogin(true);
    console.log(respData);
  };

  return (
    <Flex
      h="100vh"
      bgColor="gray.800"
      alignItems="center"
      justify="center"
    >
      <Flex
        as="form"
        onSubmit={handleSubmit}
        bgColor="gray.700"
        direction="column"
        alignItems={"center"}
        p="10"
      >
        <Heading mb={10}>Login</Heading>
        {invalidLogin && (
          <Alert status="error" variant='subtle' mb={5}>
            <AlertIcon />
            <AlertTitle>Invalid user info</AlertTitle>
          </Alert>
        )}
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button
          isLoading={loading}
          w={"100%"}
          my={7}
          type="submit"
          bgColor="teal"
          _hover={{ bgColor: "teal.500" }}
        >
          Sign In
        </Button>
        <Link href='/register' style={{textDecoration: 'underline'}}>Register</Link>
      </Flex>
    </Flex>
  );
}

Home.getLayout = function PageLayout(page: NextPage) {
  return <>{page}</>
}

