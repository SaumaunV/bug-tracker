import { useQuery } from '@apollo/client';
import { useUser } from '../../UserProvider';
import { Box, ChakraProps, Flex, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineFolder } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi';
import { TbNotes } from "react-icons/tb";
import {BsFillCheckCircleFill} from 'react-icons/bs'
import { GET_PROJECTS, GET_USERS, GET_USER_ALL_TICKETS, GET_USER_TICKETS } from '../../graphql/queries';



const boxStyle: ChakraProps =  {
  mt: '8',
  w: '20%',
  minWidth: '250px',
  h: "150px",
  alignItems: "center",
  justifyContent: "space-around",
  textColor: "blue.400",
  fontSize: "xl",
  borderRadius: "lg",
  shadow: "base",
  borderColor: 'gray.200'
}

function DashboardInfo() {
  const { user } = useUser();
  const { colorMode } = useColorMode();
  const { data, loading, error } = useQuery(GET_PROJECTS, {
    variables: { id: user ? user.id : "" },
  });
  const tickets = useQuery(GET_USER_TICKETS, {
    variables: { id: user ? user.id : "" },
  });
  const users = useQuery(GET_USERS);
  const userTickets = useQuery(GET_USER_ALL_TICKETS, {variables: {id: user ? user.id : ""}});
  const totalProjects = error ? 0 : data?.user?.projects?.length;
  const totalTickets = userTickets.data?.user?.allTickets?.length;
  const totalUsers = users.data?.users?.length;
  const completedTickets = tickets.data?.userTickets?.filter(ticket => ticket.status === 'resolved').length

  return (
    <Flex justifyContent="space-around" flexWrap="wrap">
      <Flex
        sx={boxStyle}
        bg={colorMode === "dark" ? "gray.700" : "white"}
        border={colorMode === "light" ? "1px solid" : ""}
      >
        <Flex direction="column">
          <Box fontWeight="bold" fontSize="5xl">
            {totalProjects}
          </Box>
          <Box textColor="gray.400">
            {totalProjects === 1 ? "Project" : "Projects"}
          </Box>
        </Flex>
        <AiOutlineFolder size={70} />
      </Flex>
      <Flex
        sx={{ ...boxStyle }}
        bg={colorMode === "dark" ? "gray.700" : "white"}
        border={colorMode === "light" ? "1px solid" : ""}
      >
        <Flex direction="column">
          <Box fontWeight="bold" fontSize="5xl">
            {totalTickets}
          </Box>
          <Box textColor="gray.400">
            {totalTickets === 1 ? "Ticket" : "Tickets"}
          </Box>
        </Flex>
        <TbNotes size={70} />
      </Flex>
      <Flex
        sx={boxStyle}
        bg={colorMode === "dark" ? "gray.700" : "white"}
        border={colorMode === "light" ? "2px solid" : ""}
      >
        <Flex direction="column">
          <Box fontWeight="bold" fontSize="5xl">
            {completedTickets}
          </Box>
          <Box textColor="gray.400">
            {completedTickets === 1 ? "Ticket Done" : "Tickets Done"}
          </Box>
        </Flex>
        <BsFillCheckCircleFill size={60} />
      </Flex>
      <Flex
        sx={boxStyle}
        bg={colorMode === "dark" ? "gray.700" : "white"}
        border={colorMode === "light" ? "1px solid" : ""}
      >
        <Flex direction="column">
          <Box fontWeight="bold" fontSize="5xl">
            {totalUsers}
          </Box>
          <Box textColor="gray.400">{totalUsers === 1 ? "User" : "Users"}</Box>
        </Flex>
        <HiUserGroup size={70} />
      </Flex>
    </Flex>
  );
}

export default DashboardInfo