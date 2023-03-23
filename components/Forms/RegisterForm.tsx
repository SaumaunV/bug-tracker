import { Dispatch, SetStateAction, FormEvent, useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { User } from "../../UserProvider";

const link = "https://bugtracker-backend.onrender.com/register";
//http://localhost:4000/register

interface Props {
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

function RegisterForm({ setShowRegister, setUser, setLoading }: Props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      bgColor="white"
      direction="column"
      alignItems={"center"}
      p="10"
      maxWidth="500px"
      color='black'
    >
      <Heading mb={10} fontFamily="inherit">
        Create Account
      </Heading>
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
        w={"100%"}
        my={7}
        type="submit"
        bgColor="blue.400"
        color="white"
        _hover={{ bgColor: "blue.500" }}
      >
        Create Account
      </Button>
      <Text
        textDecoration="underline"
        color="royalblue"
        cursor="pointer"
        onClick={() => setShowRegister(false)}
      >
        Login
      </Text>
    </Flex>
  );
}

export default RegisterForm;
