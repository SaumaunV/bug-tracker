import React, { useState } from 'react'
import { Ticket } from '../../src/__generated__/graphql'
import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Select, Text, Textarea } from '@chakra-ui/react';
import { useUser } from '../../UserProvider';
import { useMutation } from '@apollo/client';
import { GET_PROJECT, UPDATE_TICKET } from '../../graphql/queries';
import AlertDialogDelete from '../AlertDialogDelete';

interface Props {
  ticket: Ticket;
  users:
    | {
        __typename?: "User" | undefined;
        id: string;
        username: string;
        role: string;
      }[]
    | null
    | undefined
    | null
    | undefined;
  isOpen: boolean;
  onClose: () => void;
}

function TicketCardModal({ ticket, users, isOpen, onClose } : Props) {
    const { isDemo } = useUser();
    const [update, setUpdate] = useState(false);
    const [userID, setUserID] = useState(ticket.user_id as string);
    const [ticketName, setTicketName] = useState(ticket.name);
    const [ticketDescription, setTicketDescription] = useState(ticket.description);
    const [ticketType, setTicketType] = useState(ticket.type);
    const [ticketStatus, setTicketStatus] = useState(ticket.status);
    const [ticketPriority, setTicketPriority] = useState(ticket.priority);
    const [updateCount, setUpdateCount] = useState(0);

    const [updateTicket, { error }] = useMutation(
      UPDATE_TICKET,
      {
        refetchQueries: [
          { query: GET_PROJECT, variables: { id: ticket.project_id } },
        ],
      }
    );

    function checkUpdated(original: string, current: string) {
        if(original !== current){
            setUpdate(true);
            setUpdateCount(updateCount + 1);
        }
        else{
          setUpdate(false);
          setUpdateCount(updateCount - 1);
        }
    }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await updateTicket({
            variables: {
              input: {
                id: ticket?.id!,
                name: ticketName,
                description: ticketDescription,
                type: ticketType,
                status: ticketStatus,
                priority: ticketPriority,
                user_id: userID || null,
                project_id: ticket.project_id,
              },
            },
          });
          setTicketName("");
          setTicketDescription("");
          setTicketPriority("");
          setTicketType("");
          setTicketStatus("");
          onClose();
        }}
      >
        <ModalHeader>Ticket Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Ticket Summary</FormLabel>
            <Input
              type="text"
              mb={3}
              value={ticketName}
              onChange={(e) => {
                setTicketName(e.target.value);
                checkUpdated(ticket.name, e.target.value);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              mb={3}
              value={ticketDescription}
              onChange={(e) => {
                setTicketDescription(e.target.value);
                checkUpdated(ticket.description, e.target.value);
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Type</FormLabel>
            <RadioGroup
              value={ticketType}
              onChange={(value) => {
                setTicketType(value);
                checkUpdated(ticket.type, value);
              }}
              mb={5}
            >
              <Radio value="feature">Feature</Radio>
              <Radio value="bug" ml={3}>
                Bug
              </Radio>
              <Radio value="ui" ml={3}>
                UI
              </Radio>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Priority</FormLabel>
            <Select
              value={ticketPriority}
              onChange={(e) => {
                setTicketPriority(e.target.value);
                checkUpdated(ticket.priority, e.target.value);
              }}
              mb={3}
            >
              <option value="immediate">Immediate</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              value={ticketStatus}
              onChange={(e) => {
                setTicketStatus(e.target.value);
                checkUpdated(ticket.status, e.target.value);
              }}
              mb={3}
            >
              <option value="new">New</option>
              <option value="resolved">Resolved</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
              <option value="unassigned">Unassigned</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Assigned User</FormLabel>
            <Select
              value={userID}
              onChange={(e) => {
                setUserID(e.target.value);
                checkUpdated(ticket.user_id as string, e.target.value);
              }}
            >
              <option value="">Unassigned</option>
              {users?.map((user) => (
                <option key={user?.id} value={user?.id}>
                  {user?.username}
                </option>
              ))}
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justify="space-between">
            <AlertDialogDelete
              id={ticket.id}
              type="ticket"
              title="Delete Ticket"
              onCloseParent={onClose}
              projectId={ticket.project_id}
            />
            <Flex>
              <Button colorScheme={"gray"} mr={3} onClick={onClose}>
                Close
              </Button>
              {!isDemo && update && (
                <Button type="submit" colorScheme={"orange"}>
                  <Flex alignItems="flex-end">
                    <Text fontSize="md">Update</Text>
                    <Text fontSize="sm" ml={1} verticalAlign="sub">
                      ({updateCount} {updateCount === 1 ? "Change" : "Changes"})
                    </Text>
                  </Flex>
                </Button>
              )}
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TicketCardModal