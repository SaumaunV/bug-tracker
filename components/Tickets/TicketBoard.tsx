import { Flex } from '@chakra-ui/react'
import React from 'react'
import TicketBoardColumn from './TicketBoardColumn';
import { Ticket, User } from '../../src/__generated__/graphql';

interface Props {
    tickets: Ticket[] | null | undefined
    users: User[] | null | undefined
    projectId: string;
}

function TicketBoard({ tickets, users, projectId }: Props) {
  const newTickets = tickets?.filter(ticket => ticket.status === 'new');
  const developingTickets = tickets?.filter(ticket => ticket.status === 'development')
  const testingTickets = tickets?.filter(ticket => ticket.status === 'testing')
  const resolvedTickets = tickets?.filter(ticket => ticket.status === 'resolved')
  return (
    <Flex gap={16}>
      <TicketBoardColumn name="NEW" tickets={newTickets} users={users} projectId={projectId} />
      <TicketBoardColumn
        name="IN DEVELOPMENT"
        tickets={developingTickets}
        users={users}
      />
      <TicketBoardColumn
        name="TESTING"
        tickets={testingTickets}
        users={users}
      />
      <TicketBoardColumn
        name="RESOLVED"
        tickets={resolvedTickets}
        users={users}
      />
    </Flex>
  );
}

export default TicketBoard