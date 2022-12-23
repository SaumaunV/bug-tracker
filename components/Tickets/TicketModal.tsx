import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from '@apollo/client';
import { CREATE_TICKET, GET_TICKETS } from '../../graphql/queries';
import { Ticket } from '../../src/__generated__/graphql';

interface Props {
  ticket?: Ticket;
  isOpen: boolean;
  onClose: () => void;
}

function TicketModal({ isOpen, onClose, ticket}: Props) {
  const toast = useToast();
  const [createTicket, {error}] = useMutation(CREATE_TICKET, {
    refetchQueries: [{ query: GET_TICKETS }, "GetAllTickets"],
  });
  const [ticketName, setTicketName] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await createTicket({
            variables: {
              input: {
                name: ticketName,
                description: ticketDescription,
                type: ticketType,
                status: ticketStatus,
                priority: ticketPriority,
                developer_id: "e449f94c-cd5e-4bc8-814a-dac5f8f8ca0f",
              },
            },
          });
          error
            ? toast({
                title: "Error creating ticket.",
                status: "error",
                duration: 5000,
                isClosable: true,
              })
            : toast({
                title: "Ticket created successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
          setTicketName("");
          setTicketDescription("");
          setTicketPriority("");
          setTicketType("");
          setTicketStatus("");
          onClose();
        }}
      >
        <ModalHeader>Create Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              mb={3}
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
            />
            <FormLabel>Description</FormLabel>
            <Textarea
              mb={3}
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
            />
            <FormLabel>Type</FormLabel>
            <RadioGroup
              value={ticketType}
              onChange={(value) => setTicketType(value)}
              mb={5}
            >
              <Radio value="feature">Feature</Radio>
              <Radio value="bug" ml={3}>
                Bug
              </Radio>
            </RadioGroup>
            <FormLabel>Priority</FormLabel>
            <Select
              placeholder="Select priority"
              value={ticketPriority}
              onChange={(e) => setTicketPriority(e.target.value)}
              mb={3}
            >
              <option value="immediate">Immediate</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
            <FormLabel>Status</FormLabel>
            <Select
              placeholder="Select status"
              value={ticketStatus}
              onChange={(e) => setTicketStatus(e.target.value)}
              mb={3}
            >
              <option value="new">New</option>
              <option value="resolved">Resolved</option>
              <option value="development">Development</option>
              <option value="testing">Testing</option>
              <option value="unassigned">Unassigned</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={"gray"} mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" colorScheme={"orange"}>
            Create Ticket
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TicketModal