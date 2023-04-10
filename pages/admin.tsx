import { useQuery } from '@apollo/client';
import { Flex, Table, TableContainer, Tbody, Th, Thead, Tr, useColorMode } from '@chakra-ui/react';
import React from 'react'
import User from '../components/User';
import { GET_USERS } from '../graphql/queries';
import { useUser } from '../UserProvider';

function Admin() {
  const { user: currentUser } = useUser();
    const {data, loading, error} = useQuery(GET_USERS);
    const {colorMode} = useColorMode();
    const users = data?.users?.filter(user => user.id !== currentUser?.id);

  return (
    <Flex p={10}>
      <TableContainer
        p={5}
        bg={colorMode === "light" ? "white" : "gray.700"}
        borderRadius='md'
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users?.map((user) => (
              <User key={user.id} user={user} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default Admin