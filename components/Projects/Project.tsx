import { useQuery } from "@apollo/client";
import {
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Icon,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { GET_PROJECT_TICKETS } from "../../graphql/queries";
import { TbNotes } from "react-icons/tb";
import {RiErrorWarningLine} from 'react-icons/ri'

interface Props {
  id: string;
  name: string;
  description: string | null | undefined;
}

function Project({ id, name }: Props) {
  const { colorMode } = useColorMode();
  const {data, loading, error} = useQuery(GET_PROJECT_TICKETS, {variables: { id }})
  const unresolvedTickets = data?.projectTickets?.filter(ticket => ticket.status != 'resolved');


  return (
    <Card
      data-testid="project-component"
      maxWidth="300px"
      w="300px"
      mr={10}
      mb={10}
      h="180px"
      bg={colorMode === "light" ? "white" : ""}
      _hover={{
        boxShadow: "0 0 2px 1px royalblue",
      }}
    >
      <Link href={"projects/[projectId]"} as={`projects/${id}`}>
        <Heading size="md" mt={3} ml={5}>
          {name}
        </Heading>
        <CardBody>
          <Flex
            as="span"
            fontSize="sm"
            textColor={colorMode === "light" ? "gray.700" : "gray.200"}
            alignItems="center"
            mt={3}
          >
            <Icon as={TbNotes} boxSize={6} mr={2}></Icon>
            <Text as="span" fontWeight="bold" fontSize="xl" mr={1}>
              {data?.projectTickets?.length}
            </Text>{" "}
            tickets
          </Flex>
          <Flex
            as="span"
            fontSize="sm"
            textColor={colorMode === "light" ? "gray.700" : "gray.200"}
            alignItems="center"
            mt={2}
          >
            <Icon as={RiErrorWarningLine} boxSize={6} mr={2}></Icon>
            <Text as="span" fontWeight="bold" fontSize="xl" mr={1}>
              {unresolvedTickets?.length}
            </Text>{" "}
            unresolved
          </Flex>
        </CardBody>
        <CardFooter></CardFooter>
      </Link>
    </Card>
  );
}

export default Project;
