import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { GET_PROJECTS, CREATE_PROJECT } from '../../graphql/queries';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function ProjectModal({isOpen, onClose}: Props) {
    const toast = useToast();
    const [createProject, { error }] = useMutation(CREATE_PROJECT, {
        refetchQueries: [
            {query: GET_PROJECTS},
            'GetAllProjects'
        ]
    });
    const [projectName, setProjectName] = useState('');
    const [projectDescription, setProjectDescription] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await createProject({
            variables: {
              input: {
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
          <Button type="submit" colorScheme={"blue"}>
            Create Project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProjectModal