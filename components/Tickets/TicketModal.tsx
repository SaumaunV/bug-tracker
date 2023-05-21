import React, { useEffect, useState } from 'react';
import {
  Badge,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { CREATE_TICKET, GET_PROJECT, GET_PROJECTS, GET_PROJECT_USERS, GET_USER_TICKETS } from '../../graphql/queries';
import { Ticket, User } from '../../src/__generated__/graphql';
import { useUser } from '../../UserProvider';
import { AddIcon } from '@chakra-ui/icons';

interface Props {
  ticket?: Ticket;
  userId?: string;
  project?: {id: string; name: string}; 
  users?: User[] | null | undefined
}

function TicketModal({ ticket, userId, project, users}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isDemo } = useUser();
  const toast = useToast();
  const [createTicket, { error }] = useMutation(CREATE_TICKET, {
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: project?.id } },
      { query: GET_USER_TICKETS, variables: { id: user?.id } },
    ],
  });
  const projects = useQuery(GET_PROJECTS, {variables: {id: user?.id!}});

  const [getProjectUsers, {data, loading }] = useLazyQuery(GET_PROJECT_USERS);
  
  const [projectID, setProjectID] = useState(ticket ? ticket.project_id : projects.data?.user?.projects?.length !== 0 ? projects?.data?.user?.projects![0].id! : "");
  const [userID, setUserID] = useState(userId || "");
  const [ticketName, setTicketName] = useState(ticket ? ticket.name : "");
  const [ticketDescription, setTicketDescription] = useState(ticket ? ticket.description : "");
  const [ticketType, setTicketType] = useState(ticket ? ticket.type : "");
  const [ticketStatus, setTicketStatus] = useState(ticket ? ticket.status : "");
  const [ticketPriority, setTicketPriority] = useState(ticket ? ticket.priority : "");

  useEffect(() => {
    if(!projects.loading && !projects.error) {
      setProjectID(projects?.data?.user?.projects![0].id!);
    }
  }, [projects.loading])

  useEffect(() => {
    getProjectUsers({ variables: { id: projectID } });
  }, [projectID]);

  return (
    <>
      <Button
        mr={5}
        rightIcon={<AddIcon />}
        colorScheme="orange"
        onClick={onOpen}
      >
        New Ticket
      </Button>
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
                  user_id: userID || null,
                  project_id: project ? project.id : projectID,
                },
              },
            });
            error
              ? toast({
                  title: "Error creating ticket",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              : toast({
                  title: "Ticket created successfully",
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
            <FormControl isRequired={project ? false : true}>
              <FormLabel>Project Name</FormLabel>
              {project ? (
                <Badge p={1} mb={3} fontWeight="semibold">
                  {project.name}
                </Badge>
              ) : (
                <Select
                  value={projectID}
                  onChange={(e) => setProjectID(e.target.value)}
                  mb={3}
                >
                  {projects.data?.user?.projects?.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </Select>
              )}
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Ticket Name</FormLabel>
              <Input
                type="text"
                mb={3}
                value={ticketName}
                onChange={(e) => setTicketName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                mb={3}
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
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
                <Radio value="ui" ml={3}>
                  UI
                </Radio>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired>
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
            </FormControl>
            <FormControl isRequired>
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
            <FormControl>
              <FormLabel>Assigned User</FormLabel>
              <Select
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
              >
                <option value="">Unassigned</option>
                {users
                  ? users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))
                  : data?.project.users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.username}
                      </option>
                    ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"gray"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            {!isDemo && (
              <Button type="submit" colorScheme={"orange"}>
                Create
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TicketModal