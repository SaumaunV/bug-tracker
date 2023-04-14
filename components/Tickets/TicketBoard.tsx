import { Flex } from '@chakra-ui/react'
import React from 'react'
import TicketBoardColumn from './TicketBoardColumn';

interface Props {
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

function TicketBoard({ tickets }: Props) {
  const newTickets = tickets?.filter(ticket => ticket.status === 'new');
  const developingTickets = tickets?.filter(ticket => ticket.status === 'development')
  const testingTickets = tickets?.filter(ticket => ticket.status === 'testing')
  const resolvedTickets = tickets?.filter(ticket => ticket.status === 'resolved')
  return (
    <Flex gap={16}>
      <TicketBoardColumn name="NEW" tickets={newTickets}/>
      <TicketBoardColumn name="IN DEVELOPMENT" tickets={developingTickets} />
      <TicketBoardColumn name="TESTING" tickets={testingTickets} />
      <TicketBoardColumn name="RESOLVED" tickets={resolvedTickets}/>
    </Flex>
  );
}

export default TicketBoard