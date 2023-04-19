import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { GET_PROJECTS, CREATE_PROJECT } from '../../graphql/queries';
import { useUser } from '../../UserProvider';
import { AddIcon } from '@chakra-ui/icons';

function ProjectModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isDemo } = useUser();
    const toast = useToast();
    const [createProject, { error }] = useMutation(CREATE_PROJECT, {
        refetchQueries: [
            {query: GET_PROJECTS, variables: {id: user?.id}},
            'GetAllProjects'
        ]
    });
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

  return (
    <>
      <Button
        mr={5}
        rightIcon={<AddIcon />}
        colorScheme="messenger"
        onClick={onOpen}
      >
        New Project
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          as="form"
          onSubmit={async (e) => {
            e.preventDefault();
            await createProject({
              variables: {
                input: {
                  user_id: user?.id!,
                  name: projectName,
                  description: projectDescription,
                },
              },
            });
            error
              ? toast({
                  title: "Error creating project.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
              : toast({
                  title: "Project created successfully.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
            setProjectName("");
            setProjectDescription("");
            onClose();
          }}
        >
          <ModalHeader>Create Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input
                type="text"
                isRequired
                formNoValidate
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                mb={5}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Project Description</FormLabel>
              <Textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"gray"} mr={3} onClick={onClose}>
              Cancel
            </Button>
            {!isDemo && (
              <Button type="submit" colorScheme={"blue"}>
                Create Project
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProjectModal