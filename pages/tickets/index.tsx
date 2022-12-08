import { Flex } from '@chakra-ui/react';
import React from 'react'
import Header from '../../components/Header';
import NavMenu from '../../components/NavMenu';
import TicketList from '../../components/Tickets/TicketList';

function Tickets() {
  return (
    <Flex>
      <NavMenu />
      <Flex direction="column" flex={1}>
        <Header />
        <TicketList />
      </Flex>
    </Flex>
  );
}

export default Tickets