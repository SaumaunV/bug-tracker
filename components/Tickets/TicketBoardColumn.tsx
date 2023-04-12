import { Flex, Heading } from '@chakra-ui/react';
import React from 'react'
import TicketCard from './TicketCard';

interface Props {
    name: string;
}

function TicketBoardColumn({ name }: Props) {
  return (
    <Flex
      w='300px'
      direction="column"
      bg="gray.700"
      borderRadius="md"
    >
      <Heading fontSize="sm" m={5} textColor="gray.400">
        {name}
      </Heading>
    </Flex>
  );
}

export default TicketBoardColumn