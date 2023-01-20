import { Badge, Box, Button, Center, Flex, Heading, useColorMode, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import TicketList from '../../components/Tickets/TicketList';
import { useQuery } from '@apollo/client';
import { GET_PROJECT, GET_USERS } from '../../graphql/queries';
import { useRouter } from 'next/router';
import TicketModal from '../../components/Tickets/TicketModal';
import AddUserModal from '../../components/Projects/AddUserModal';

function ProjectDetail() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenUser, onOpen: onOpenUser, onClose: onCloseUser } = useDisclosure();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const light = colorMode === "light";
  const {data, loading, error} = useQuery(GET_PROJECT, {variables: {id: router.query.projectId as string}});
  const users = useQuery(GET_USERS)
  const userList = users.data?.users;
  const memberUsernames = data?.project.users?.map(user => user.username);
  const addUserList = userList?.filter(user => !memberUsernames?.includes(user.username));

  return (
    <>
      <Box p={10}>
        <Flex
          justifyContent="space-between"
          shadow={"base"}
          p={5}
          bgColor={light ? "white" : "gray.700"}
        >
          <Heading>{data?.project.name}</Heading>
          <Flex>
            <Button colorScheme="orange" mr={5} onClick={onOpen}>
              Add Ticket
            </Button>
            <Button colorScheme="green" onClick={onOpenUser}>Add User</Button>
          </Flex>
        </Flex>
        <Flex mt={10} alignItems="stretch">
          <Box
            bg={light ? "white" : "gray.700"}
            p={10}
            mr={10}
            shadow="base"
            maxWidth="400px"
          >
            {data?.project.description}
            <Flex justifyContent="space-between" alignItems={"center"} mt={10}>
              <Box>Total Tickets: </Box>
              <Badge fontSize={"16px"} variant="outline" p={2} colorScheme='blue'>
                {data?.project.tickets?.length}
              </Badge>
            </Flex>
            <Flex justifyContent="space-between" mt={5}>
              <Box>Unresolved Tickets: </Box>
              <Badge fontSize={"16px"} variant="outline" p={2} colorScheme='orange'>
                {data?.project.tickets?.reduce(
                  (acc, ticket) =>
                    ticket.status !== "resolved" ? acc + 1 : acc,
                  0
                )}
              </Badge>
            </Flex>
            <Flex justifyContent="space-between" mt={5}>
              <Box>Unassigned Tickets: </Box>
              <Badge fontSize={"16px"} variant="outline" p={2} colorScheme='red'>
                {data?.project.tickets?.reduce(
                  (acc, ticket) =>
                    ticket.user_id ? acc : acc + 1,
                  0
                )}
              </Badge>
            </Flex>
            <Flex justifyContent="space-between" mt={5}>
              <Box>Total Members: </Box>
              <Badge fontSize={"16px"} variant="outline" p={2} colorScheme='green'>
                {data?.project.users?.length}
              </Badge>
            </Flex>
          </Box>
          {data?.project.tickets?.length === 0 ? (
            <Center
              flexDirection="column"
              flex={1}
              bgColor={light ? "white" : "gray.700"}
              shadow="base"
            >
              <Flex>No tickets available</Flex>
            </Center>
          ) : (
            <TicketList padding={0} tickets={data?.project.tickets} />
          )}
        </Flex>
        <Box
          mt={10}
          p={10}
          bgColor={light ? "white" : "gray.700"}
          maxWidth="400"
          shadow="base"
        >
          <Heading size="lg" mb={10}>
            Members
          </Heading>
          {data?.project.users?.map((user) => (
            <Flex key={user.id} justifyContent="space-between" mb={5}>
              <Box fontSize={"lg"} fontWeight="semibold">
                {user.username}
              </Box>
              <Badge
                ml={5}
                p={1}
                colorScheme={user.role === "admin" ? "orange" : "green"}
              >
                {user.role}
              </Badge>
            </Flex>
          ))}
        </Box>
      </Box>
      <TicketModal
        title="Create Ticket"
        buttonText="Create Ticket"
        isOpen={isOpen}
        onClose={onClose}
        project={{
          id: router.query.projectId as string,
          name: data?.project.name!,
        }}
      />
      <AddUserModal project_id={data?.project.id!} userList={addUserList} isOpen={isOpenUser} onClose={onCloseUser} />
    </>
  );
}

export default ProjectDetail