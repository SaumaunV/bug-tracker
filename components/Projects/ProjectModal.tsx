import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useMutation } from "@apollo/client";
import { GET_PROJECTS, CREATE_PROJECT } from '../../graphql/queries';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function ProjectModal({isOpen, onClose}: Props) {
    const [createProject] = useMutation(CREATE_PROJECT, {
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
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitted");
          createProject({
            variables: {
              input: {
                name: projectName,
                description: projectDescription,
              },
            },
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
          <Button
            type="submit"
            colorScheme={"blue"}
          >
            Create Project
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProjectModal