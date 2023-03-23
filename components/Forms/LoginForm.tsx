import { User } from "../../UserProvider";
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
  Text,
  Box,
  Icon,
  AlertDescription,
  LightMode,
} from "@chakra-ui/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

const link = "https://bugtracker-backend.onrender.com/login";
//const link = 'http://localhost:4000/login'

interface Props {
  setShowRegister: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<User>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setIsDemo: Dispatch<SetStateAction<boolean>>;
}

export default function LoginForm({
  setShowRegister,
  setUser,
  setLoading,
  setIsDemo,
}: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidLogin, setInvalidLogin] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const resp = await fetch(link, {
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
    if (respData) {
      setLoading(true);
      setUser(respData);
    } else setInvalidLogin(true);
  };

  const handleLoginDemo = async (username: string, password: string) => {
    const resp = await fetch(link, {
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
    if (respData) {
      setLoading(true);
      setUser(respData);
      setIsDemo(true);
    }
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
      color="black"
    >
      <Heading as="h1" mb={10} fontFamily="inherit">
        Sign In
      </Heading>
      <Heading as="h2" size="lg" fontFamily="inherit">
        Demo Accounts
      </Heading>
      <Flex gap="12" mt={5}>
        <Button
          p={10}
          backgroundColor="white"
          border="1px"
          borderColor="gray.100"
          shadow={"base"}
          _hover={{
            backgroundColor: "white",
            boxShadow: "0 0 5px 3px darkorange",
          }}
          onClick={() => handleLoginDemo("DemoAdmin", "demoadmin!")}
        >
          <Flex direction="column" alignItems="center" justify={"center"}>
            <Icon as={AiOutlineUser} boxSize={8} color="orange.500" />
            <Text mt={1}>Admin</Text>
          </Flex>
        </Button>
        <Button
          p={10}
          backgroundColor="white"
          border="1px"
          borderColor="gray.100"
          shadow={"base"}
          _hover={{
            backgroundColor: "white",
            boxShadow: "0 0 5px 3px green",
          }}
          onClick={() => handleLoginDemo("DemoDeveloper", "demodeveloper!")}
        >
          <Flex
            direction="column"
            alignItems="center"
            justify={"center"}
            w="50px"
          >
            <Icon as={AiOutlineUser} boxSize={8} color="green.500" />
            <Text mt={1}>Developer</Text>
          </Flex>
        </Button>
      </Flex>

      <Flex width="100%" flex={1} my={10} alignItems="center">
        <Box height="1px" backgroundColor={"lightgray"} flex="1"></Box>
        <Text mx={5} color="gray">
          OR
        </Text>
        <Box height="1px" backgroundColor={"lightgray"} flex="1"></Box>
      </Flex>

      {invalidLogin && (
        <Alert status="error" variant="subtle" mb={5} borderRadius="md">
          <AlertIcon />
          <AlertTitle>Invalid user info</AlertTitle>
        </Alert>
      )}
      <FormControl>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          sx={{
            "&:-webkit-autofill, &:-webkit-autofill:focus": {
              transition: "background-color 600000s 0s, color 600000s 0s",
            },
          }}
          type="text"
          textColor="black"
          id="username"
          colorScheme="blue"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </FormControl>
      <FormControl mt={4}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <LightMode>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </LightMode>
      </FormControl>
      <Button
        w={"100%"}
        my={7}
        type="submit"
        color="white"
        bgColor={"blue.400"}
        _hover={{ bgColor: "blue.500" }}
      >
        Sign In
      </Button>
      <Flex>
        <Text mr={3}>Don't have an account?</Text>
        <Text
          textDecoration="underline"
          color="royalblue"
          cursor="pointer"
          onClick={() => setShowRegister(true)}
        >
          Register
        </Text>
      </Flex>
      <Alert status="info" mt={10} borderRadius="base">
        <AlertIcon />
        <AlertDescription maxWidth="300px" fontSize={"smaller"}>
          Demo accounts cannot make changes to data
        </AlertDescription>
      </Alert>
    </Flex>
  );
}
