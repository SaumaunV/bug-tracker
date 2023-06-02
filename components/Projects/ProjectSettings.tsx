import { SettingsIcon } from '@chakra-ui/icons';
import { Button, Flex, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import AlertDialogDelete from '../AlertDialogDelete';

interface Props {
    projectName: string;
    projectDescription: string;
    id: string
}

function ProjectSettings({ projectName, projectDescription, id }: Props) {
  const [name, setName] = useState(projectName);
  const [description, setDescription] = useState(projectDescription);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [update, setUpdate] = useState(false);

  function checkUpdated(original: string, current: string) {
    original !== current ? setUpdate(true) : setUpdate(false);
  }

  return (
    <>
      <IconButton
        aria-label="Project settings"
        fontSize="20px"
        icon={<SettingsIcon />}
        onClick={onOpen}
      >
        Description
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Project Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  checkUpdated(projectName, e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Project Description</FormLabel>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  checkUpdated(projectDescription, e.target.value);
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Flex w='100%' justify='space-between'>
              <AlertDialogDelete
                id={id}
                type="project"
                title="Delete Project"
                onCloseParent={onClose}
              />
              {update && <Button type='submit' colorScheme="blue">Save</Button>}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProjectSettings