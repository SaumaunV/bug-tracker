import { useQuery } from '@apollo/client';
import { Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { GET_PROJECT_NAME, GET_USER_NAME } from '../../graphql/queries';
import { Ticket } from '../../src/__generated__/graphql';

interface Props {
  ticket: Ticket;
  isOpen: boolean;
  onClose: () => void;
}

function TicketInfoModal({isOpen, onClose, ticket} : Props) {
  const { data: projectName } = useQuery(GET_PROJECT_NAME, {variables: {id: ticket.project_id}});
  const { data: userName } = useQuery(GET_USER_NAME, {variables: {id: ticket.user_id!}})

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={'2xl'}>Ticket info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={10} alignItems="flex-start">
            <Box>
              <Heading fontSize={"xl"} mb={3}>
                Project
              </Heading>
              <Text>{projectName?.project.name}</Text>
            </Box>
            <Box>
              <Heading fontSize={"xl"} mb={2}>Name</Heading>
              <Text>{ticket.name}</Text>
            </Box>
            <Box>
              <Heading fontSize={"xl"} mb={2}>Description</Heading>
              <Text>{ticket.description}</Text>
            </Box>
            <Box>
              <Heading fontSize={"xl"} mb={2}>Type</Heading>
              <Text>{ticket.type}</Text>
            </Box>
            <Box>
              <Heading fontSize={"xl"} mb={2}>Status</Heading>
              <Text>{ticket.status}</Text>
            </Box>
            <Box>
              <Heading fontSize={"xl"} mb={2}>Priority</Heading>
              <Text>{ticket.priority}</Text>
            </Box>
            <Box>
              <Heading fontSize={"xl"} mb={2}>Assigned User</Heading>
              <Text>
                {ticket.user_id ? userName?.user?.username : "Unassigned"}
              </Text>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TicketInfoModal