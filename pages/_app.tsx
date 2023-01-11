import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import UserProvider from '../UserProvider'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import { ReactNode } from 'react';
import Layout from "../components/Layout";

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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
