import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import Head from "next/head";
import UserProvider from '../UserProvider'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import NavMenu from "../components/NavMenu";
import Header from "../components/Header";
import { NextPage } from "next";
import { ReactNode } from 'react';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),  
});

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {

  if(Component.getLayout) {
    return Component.getLayout(
      <ApolloProvider client={client}>
        <UserProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </UserProvider>
      </ApolloProvider>
    );
  }

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ChakraProvider>
          <Head>
            <title>Bug Tracker</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Flex h="100vh">
            <NavMenu />
            <Flex direction="column" flex={1} overflow="hidden">
              <Header />
              <Flex
                direction="column"
                overflow="auto"
                overflowX="hidden"
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
                <Component {...pageProps} />
              </Flex>
            </Flex>
          </Flex>
        </ChakraProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
