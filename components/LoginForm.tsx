import { Box, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';

function LoginForm() {
  return (
    <Flex w="100%" h="100vh" alignItems="center" justify="center">
      <Box w="25%" minW={200} p={8} border="1px solid" borderRadius={4} borderColor='gray.300'>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormLabel mt={4}>Password</FormLabel>
          <Input type="password" />
        </FormControl>
      </Box>
    </Flex>
  );
}

export default LoginForm