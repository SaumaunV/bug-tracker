import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import UserProvider from "../UserProvider";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NextPage } from "next";
import { ReactNode } from "react";
import Layout from "../components/Layout/Layout";
import { Inter } from "@next/font/google";
import { link } from '../src/config.js'

const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql",
  uri: `${link}/graphql`,
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          project: {
            merge: true,
          },
          user: {
            merge: true
          }
        },
      },
    },
  }),
});

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
  Component: Page;
};

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: Props) {
  if (Component.getLayout) {
    return Component.getLayout(
      <ApolloProvider client={client}>
        <UserProvider>
          <ChakraProvider>
            <Head>
              <title>Bug Tracker</title>
            </Head>
            <main className={inter.className}>
              <Component {...pageProps} />
            </main>
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
          </Head>
          <main className={inter.className}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </main>
        </ChakraProvider>
      </UserProvider>
    </ApolloProvider>
  );
}
