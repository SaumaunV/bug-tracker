import { FormEvent, useState } from 'react';
import { Button, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

function LoginForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      credentials: 'include'
    });
    const respData = await resp.json();
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
        <Heading mb={10}>Sign up</Heading>
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
          mt={7}
          type="submit"
          bgColor="teal"
          _hover={{ bgColor: "teal.500" }}
        >
          Sign In
        </Button>
      </Flex>
    </Flex>
  );
}

export default LoginForm