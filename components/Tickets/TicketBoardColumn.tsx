import { Flex, Heading } from '@chakra-ui/react';
import React from 'react'
import TicketCard from './TicketCard';

interface Props {
  name: string;
  tickets:
    | {
        __typename?: "Ticket" | undefined;
        id: string;
        name: string;
        description: string;
        type: string;
        status: string;
        priority: string;
        created_at: string;
        user_id?: string | null | undefined;
        project_id: string;
      }[]
    | null
    | undefined;
}

function TicketBoardColumn({ name, tickets }: Props) {
  return (
    <Flex w="300px" direction="column" bg="gray.700" borderRadius="md" h='max-content'>
      <Heading fontSize="sm" m={5} textColor="gray.400">
        {name}
      </Heading>
      {tickets?.map(ticket => <TicketCard ticket={ticket}/>)}
    </Flex>
  );
}

export default TicketBoardColumn