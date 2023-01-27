import { Center, Flex, Spinner, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react'
import { useUser } from '../UserProvider';
import Header from './Header';
import NavMenu from './NavMenu';

interface Props {
    children: React.ReactNode
}

function Layout({children}: Props) {
  const { user, loading, setUser } = useUser();
  const { colorMode } = useColorMode();
  const router = useRouter();

  if (loading) return (
    <Center height='100vh'>
      <Spinner />
    </Center>
  );
  else if (!user) {
    router.push("/");
    return null;
  }
  else return (
    <Flex h="100vh">
      <NavMenu />
      <Flex direction="column" flex={1} overflow="hidden">
        <Header />
        <Flex
          direction="column"
          overflow="auto"
          overflowX="hidden"
          flex={1}
          bg={colorMode === "light" ? "gray.50" : ""}
          sx={{
            "&::-webkit-scrollbar": {
              width: "12px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0, 0, 0, 0.4)",
              borderRadius: "8px",
            },
          }}
        >
            {children}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Layout