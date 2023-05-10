import { useQuery } from '@apollo/client';
import { Box, Flex, Text, useColorMode, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { GET_USER_NAME } from '../../graphql/queries';
import { Ticket, User } from '../../src/__generated__/graphql';
import TicketCardModal from './TicketCardModal';

interface Props {
  ticket: Ticket;
  users: User[] | null | undefined;
}

interface colorType {
  [key: string]: string;
}

const colors: colorType = {
  immediate: "blue",
  high: "red",
  medium: "orange",
  low: "green"
}

function TicketCard({ ticket, users }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const user = useQuery(GET_USER_NAME, { variables: { id: ticket.user_id! } });
  const light = colorMode === "light";
  
  return (
    <Flex
      bg={light ? `${colors[ticket.priority]}.100` : `${colors[ticket.priority]}.300`}
      textColor="black"
      rounded="sm"
      my={2}
      py={2}
      px={3}
      fontWeight={"semibold"}
      _hover={{
        bg: `${colors[ticket.priority]}.200`,
      }}
      cursor="pointer"
      onClick={onOpen}
    >
      <Flex direction="column" w="200px" justifyContent="space-between">
        <Text mb={8}>{ticket.name}</Text>
        <Text fontSize="sm" textColor={`${colors[ticket.priority]}.900`}>
          {user.data?.user?.username}
        </Text>
      </Flex>

      <Flex
        flex={1}
        direction="column"
        fontSize="xs"
        textColor={`${colors[ticket.priority]}.900`}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Box></Box>
        {ticket.priority.toUpperCase()}
      </Flex>
      <TicketCardModal
        ticket={ticket}
        users={users}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Flex>
  );
}

export default TicketCard