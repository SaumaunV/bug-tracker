import {Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorMode } from '@chakra-ui/react';
import React from 'react'
import TicketItem from './Ticket';

interface Props {
  padding: number;
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

function TicketList({ padding, tickets} : Props) {
  const { colorMode } = useColorMode();
  const light = colorMode === "light";

  return (
    <Flex flex={1} p={padding} bg={light ? "gray.50" : ""} >
      <Flex
        p={10}
        border={light ? "1px solid lightgray" : ""}
        bg={light ? "white" : "gray.700"}
        shadow="sm"
        height="max-content"
      >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Project</Th>
                <Th>Developer</Th>
                <Th>Status</Th>
                <Th>Priority</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tickets?.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket}/>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
}

export default TicketList