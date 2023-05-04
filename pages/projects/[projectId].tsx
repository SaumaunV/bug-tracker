import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT, GET_USERS } from "../../graphql/queries";
import { useRouter } from "next/router";
import TicketModal from "../../components/Tickets/TicketModal";
import AddUserModal from "../../components/Projects/AddUserModal";
import ProjectInfoModal from "../../components/Projects/ProjectInfoModal";
import TicketBoard from "../../components/Tickets/TicketBoard";

function ProjectDetail() {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: router.query.projectId as string },
  });
  const users = useQuery(GET_USERS);
  const userList = users.data?.users;
  const memberUsernames = data?.project.users?.map((user) => user.username);
  const addUserList = userList?.filter(
    (user) => !memberUsernames?.includes(user.username)
  );
  const projectUsers = userList?.filter((user) =>
    memberUsernames?.includes(user.username)
  );

  return (
    <Box p={10}>
      <Flex mb={16} gap={10} alignItems="center">
        <Heading>{data?.project.name}</Heading>
        <Flex gap={3}>
          <ProjectInfoModal
            users={data?.project?.users}
            projectDesc={data?.project.description}
          />
          <AddUserModal project_id={data?.project.id!} userList={addUserList} />
          <TicketModal
            title="Create Ticket"
            buttonText="Create Ticket"
            project={{
              id: router.query.projectId as string,
              name: data?.project.name!,
            }}
          />
        </Flex>
      </Flex>
      <TicketBoard
        tickets={data?.project.tickets}
        users={projectUsers}
        projectId={data?.project.id!}
      />
    </Box>
  );
}

export default ProjectDetail;
