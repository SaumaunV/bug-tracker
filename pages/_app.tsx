import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import { UserProvider } from "@auth0/nextjs-auth0";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'http:localhost:4000/graphql',
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <ChakraProvider>
          <Head>
            <title>Bug Tracker</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
