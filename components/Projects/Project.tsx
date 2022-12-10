import { useMutation } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  CardBody,
  CardFooter,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import React, { useRef } from "react";
import { DELETE_PROJECT, GET_PROJECTS } from "../../graphql/queries";

interface Props {
    id: string;
    name: string;
    description: string;
}


function Project({ id, name, description }: Props) {
  const [deleteProject ] = useMutation(DELETE_PROJECT, {
      refetchQueries: [{ query: GET_PROJECTS }, "GetAllProjects"],
    }
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Card align="center" maxWidth="300px" w='300px' mr={10} mb={10} h='180px'>
        <Heading size="md" mt={3}> { name } </Heading>
        <CardBody>
          <Text> { description } </Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme="blue" mr={5}>
            Details
          </Button>
          <Button colorScheme="red" onClick={onOpen}>
            Delete
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => {
                deleteProject({variables: {id: id}});
                onClose();
              }} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Project;
