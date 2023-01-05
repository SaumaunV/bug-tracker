import { FormEvent, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import Link from "next/link";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useUser } from "../UserProvider";

function Register() {
  const { user, setUser } = useUser();
  const router = useRouter();  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidRegister, setInvalidRegister] = useState(false);

  if (user) router.push("/dashboard");

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      credentials: "include",
    });
    const respData = await resp.json();
    if (respData) {
      setLoading(true);
      setUser(respData);
    } else setInvalidRegister(true);
    console.log(respData);
  };

  return (
    <Flex h="100vh" bgColor="gray.800" alignItems="center" justify="center">
      <Flex
        as="form"
        onSubmit={handleSubmit}
        bgColor="gray.700"
        direction="column"
        alignItems={"center"}
        p="10"
      >
        <Heading mb={10}>Sign up</Heading>
        {invalidRegister && (
          <Alert status="error" variant="subtle" mb={5}>
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
          <FormLabel htmlFor="username">Email</FormLabel>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
          Create Account
        </Button>
        <Link href="/" style={{ textDecoration: "underline" }}>
          Login
        </Link>
      </Flex>
    </Flex>
  );
}

export default Register;

Register.getLayout = function PageLayout(page: NextPage) {
  return <>{page}</>;
};
