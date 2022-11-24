import { useUser } from '@auth0/nextjs-auth0';
import { Flex } from '@chakra-ui/react';
import React from 'react';
import DashboardInfo from '../components/Dashboard/DashboardInfo';
import Header from '../components/Header';
import NavMenu from '../components/NavMenu';

function Dashboard() {
  return (
    <Flex>
      <NavMenu />
      <Flex direction="column" flex={1}>
        <Header />
        <DashboardInfo />
      </Flex>
    </Flex>
  );
}

export default Dashboard