import { useQuery } from '@apollo/client';
import { useUser } from '../../UserProvider';
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { AiFillFolder } from "react-icons/ai";
import { HiUserGroup } from 'react-icons/hi';
import { TbNotes } from "react-icons/tb";
import {BsFillCheckCircleFill} from 'react-icons/bs'
import { GET_PROJECTS, GET_USERS, GET_USER_ALL_TICKETS, GET_USER_TICKETS } from '../../graphql/queries';
import DashboardInfoCard from './DashboardInfoCard';

function DashboardInfo() {
  const { user } = useUser();
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
    <Flex justifyContent="space-between" flexWrap="wrap" mx={10}>
      <DashboardInfoCard
        data={totalProjects!}
        dataType="Project"
        icon={AiFillFolder}
        colorLight="blue.500"
        colorDark="blue.400"
      />
      <DashboardInfoCard
        data={totalTickets!}
        dataType="Ticket"
        icon={TbNotes}
        colorLight="orange.500"
        colorDark="orange.400"
      />
      <DashboardInfoCard
        data={completedTickets!}
        dataType="Resolved Ticket"
        icon={BsFillCheckCircleFill}
        colorLight="green.500"
        colorDark="green.400"
      />
      <DashboardInfoCard
        data={totalUsers!}
        dataType="User"
        icon={HiUserGroup}
        colorLight="purple.500"
        colorDark="purple.400"
      />
    </Flex>
  );
}

export default DashboardInfo