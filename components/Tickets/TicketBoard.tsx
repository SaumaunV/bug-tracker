import { Flex, useColorMode } from '@chakra-ui/react'
import React from 'react'
import TicketBoardColumn from './TicketBoardColumn';

function TicketBoard() {
  return (
    <Flex gap={16}>
      <TicketBoardColumn name="NEW" />
      <TicketBoardColumn name="IN DEVELOPMENT" />
      <TicketBoardColumn name="TESTING" />
      <TicketBoardColumn name="RESOLVED" />
    </Flex>
  );
}

export default TicketBoard