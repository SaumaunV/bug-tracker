import { Dispatch, SetStateAction, FormEvent, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../UserProvider";

const link = "https://bugtracker-backend.onrender.com/register";
//http://localhost:4000/register

interface Props {
    setShowRegister: Dispatch<SetStateAction<boolean>>;
}

function RegisterForm({ setShowRegister }: Props) {
  const { user, loading: userLoading, setUser } = useUser();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidRegister, setInvalidRegister] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const resp = await fetch(link, {
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
  };

  if (userLoading)
    return (
      <Center height="100vh">
        <Spinner />
      </Center>
    );
  else if (user) router.push("/dashboard");
  else
    return (
        <Flex
          as="form"
          onSubmit={handleSubmit}
          bgColor="gray.700"
          direction="column"
          alignItems={"center"}
          p="10"
          color="white"
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
            bgColor="blue.400"
            _hover={{ bgColor: "blue.500" }}
          >
            Create Account
          </Button>
          <Text textDecoration='underline' color='royalblue' onClick={() => setShowRegister(false)}>
            Login
          </Text>
        </Flex>
      
    );
}

export default RegisterForm;
