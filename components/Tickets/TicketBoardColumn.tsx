import { Box, Button, Flex, Heading, Select, Textarea, Toast } from '@chakra-ui/react';
import React, { useState } from 'react'
import TicketCard from './TicketCard';
import { AddIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { CREATE_TICKET, GET_PROJECT } from '../../graphql/queries';
import { Ticket, User } from '../../src/__generated__/graphql';

interface Props {
  name: string;
  tickets: Ticket[] | null | undefined;
  users: User[] | null | undefined;
  projectId?: string;
}

function TicketBoardColumn({ name, tickets, users, projectId }: Props) {
  const [newTicket, setNewTicket] = useState(false);
  const [newTicketName, setNewTicketName ] = useState("");
  const [ticketType, setTicketType] = useState('bug');
  const [ticketPriority, setTicketPriority] = useState('low');
  const [createTicket, { error }] = useMutation(CREATE_TICKET, {
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: projectId } },
    ],
  });

  return (
    <Flex w="300px" direction="column" bg="gray.700" borderRadius="md" p={2}>
      <Heading fontSize="sm" m={3} textColor="gray.400">
        {name}
      </Heading>
      {tickets?.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} users={users} />
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
        <Box
          bg="gray.800"
          rounded="sm"
          _focusWithin={{ boxShadow: "0 0 5px 3px royalblue" }}
        >
          <Textarea
            mt={2}
            value={newTicketName}
            border="none"
            _focus={{ boxShadow: "none" }}
            onChange={(e) => setNewTicketName(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                await createTicket({
                  variables: {
                    input: {
                      name: newTicketName,
                      description: "",
                      type: ticketType,
                      status: "new",
                      priority: ticketPriority,
                      user_id: null,
                      project_id: projectId!,
                    },
                  },
                });
                if (error)
                  Toast({
                    title: "Error creating ticket",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                setNewTicket(false);
                setNewTicketName("");
              }
            }}
          />
          <Flex>
            <Select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              size="sm"
              maxWidth="max-content"
              border="none"
              _focus={{ boxShadow: "none" }}
            >
              <option value="bug">Bug</option>
              <option value="feature">Feature</option>
              <option value="ui">UI</option>
            </Select>
            <Select
              value={ticketPriority}
              onChange={(e) => setTicketPriority(e.target.value)}
              size="sm"
              maxWidth="max-content"
              border="none"
              _focus={{ boxShadow: "none" }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="immediate">Immediate</option>
            </Select>
          </Flex>
        </Box>
      ) : null}
    </Flex>
  );
}

export default TicketBoardColumn