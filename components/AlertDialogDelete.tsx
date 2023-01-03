import { useMutation } from '@apollo/client';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { DELETE_PROJECT, DELETE_TICKET, GET_PROJECTS, GET_TICKETS } from '../graphql/queries';
import { useUser } from '../UserProvider';

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  project?: boolean
}

function AlertDialogDelete({ id, isOpen, onClose, project }: Props) {
    const { user } = useUser();
    const toast = useToast();
    const [deleteProject, { error: errorProject }] = useMutation(DELETE_PROJECT, {
      refetchQueries: [{ query: GET_PROJECTS, variables: {id: user?.id} }, "GetAllProjects"],
    });
    const [deleteTicket, { error: errorTicket }] = useMutation(DELETE_TICKET, {
      refetchQueries: [{ query: GET_TICKETS }, "GetAllTickets"],
    });
    const cancelRef = useRef(null);

    const handleDeleteProject = async () => {
        await deleteProject({ variables: { id } });
        errorProject
          ? toast({
              title: "Error deleting project.",
              status: "error",
              duration: 5000,
              isClosable: true,
            })
          : toast({
              title: "Project deleted successfully.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
    }

    const handleDeleteTicket = async () => {
        await deleteTicket({ variables: { id } });
        errorTicket
          ? toast({
              title: "Error deleting ticket.",
              status: "error",
              duration: 5000,
              isClosable: true,
            })
          : toast({
              title: "Ticket deleted successfully.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
    }

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete {project ? 'Project' : 'Ticket'}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={project ? handleDeleteProject : handleDeleteTicket}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default AlertDialogDelete