import { useMutation } from '@apollo/client';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { DELETE_PROJECT, DELETE_TICKET, DELETE_USER, GET_PROJECT, GET_PROJECTS, GET_TICKETS, GET_USERS, GET_USER_TICKETS } from '../graphql/queries';
import { useUser } from '../UserProvider';

interface Props {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  type: string;
  title: string;
}

function AlertDialogDelete({ id, isOpen, onClose, type, title }: Props) {
    const { user, isDemo } = useUser();
    const toast = useToast();
    const [deleteProject, { error: errorProject }] = useMutation(DELETE_PROJECT, {
      refetchQueries: [{ query: GET_PROJECTS, variables: {id: user?.id} }, "GetAllProjects"],
    });
    const [deleteTicket, { error: errorTicket }] = useMutation(DELETE_TICKET, {
      refetchQueries: [
        { query: GET_USER_TICKETS, variables: { id: user?.id } },
      ],
    });
    const [deleteUser, { error: errorUser }] = useMutation(DELETE_USER, {
      refetchQueries: [{ query: GET_USERS }, "GetAllUsers"],
    });
    const cancelRef = useRef(null);

    const handleDelete = async () => {
      type === "project"
        ? await deleteProject({ variables: { id } })
        : type === "ticket"
        ? await deleteTicket({ variables: { id } })
        : await deleteUser({ variables: { id } })
      errorProject || errorTicket || errorUser
        ? toast({
            title: `Error deleting ${type}.`,
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        : toast({
            title: `${type} deleted successfully.`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
    };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
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
              onClick={isDemo ? onClose : handleDelete}
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