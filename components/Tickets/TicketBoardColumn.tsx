import { Box, Button, Flex, Heading, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react'
import TicketCard from './TicketCard';
import { AddIcon } from '@chakra-ui/icons';

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
  const [newTicket, setNewTicket] = useState(false);
  const [newTicketName, setNewTicketName ] = useState("");

  return (
    <Flex w="300px" direction="column" bg="gray.700" borderRadius="md" p={2}>
      <Heading fontSize="sm" m={3} textColor="gray.400">
        {name}
      </Heading>
      {tickets?.map((ticket) => (
        <TicketCard ticket={ticket} />
      ))}
      {name === "NEW" && !newTicket ? (
        <Button
          mt={2}
          rounded="sm"
          justifyContent="flex-start"
          alignItems="center"
          bg={"inherit"}
          leftIcon={<AddIcon />}
          onClick={() => setNewTicket(true)}
        >
          Create ticket
        </Button>
      ) : name === "NEW" && newTicket ? (
        <Box>
          <Textarea
            bg="gray.800"
            mt={2}
            value={newTicketName}
            onChange={(e) => setNewTicketName(e.target.value)}
            onSubmit={(e) => {
              e.preventDefault();
              setNewTicket(false);
            }}
            onKeyDown={(e) => {
              if(e.key === 'Enter'){
                setNewTicket(false);
              }
            }}
          />
        </Box>
      ) : null}
    </Flex>
  );
}

export default TicketBoardColumn