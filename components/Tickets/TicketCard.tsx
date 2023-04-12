import { Box } from '@chakra-ui/react'
import React from 'react'

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
  return (
    <Box
      bgGradient={`linear(to-b, ${colors[ticket.priority]}.300, ${colors[ticket.priority]}.400)`}
      textColor="black"
      borderRadius="sm"
      m={2}
      py={2}
      px={3}
      fontSize="sm"
      fontWeight={"semibold"}
    >
      {ticket.name}
    </Box>
  );
}

export default TicketCard