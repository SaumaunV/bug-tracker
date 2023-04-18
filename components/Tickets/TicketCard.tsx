import { useQuery } from '@apollo/client';
import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { GET_USER_NAME } from '../../graphql/queries';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';

interface Props {
  ticket: {
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
  };
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

function TicketCard({ ticket }: Props) {
  const user = useQuery(GET_USER_NAME, { variables: { id: ticket.user_id! } });
  return (
    <Flex
      bgGradient={`linear(to-b, ${colors[ticket.priority]}.300, ${
        colors[ticket.priority]
      }.400)`}
      textColor="black"
      rounded="sm"
      my={2}
      py={2}
      px={3}
      fontWeight={"semibold"}
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
    </Flex>
  );
}

export default TicketCard