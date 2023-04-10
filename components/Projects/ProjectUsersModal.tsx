import { Badge, Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'

interface Props {
  users:
    | {
        __typename?: "User" | undefined;
        id: string;
        username: string;
        role: string;
      }[]
    | null
    | undefined;
  projectDesc: string | undefined | null;
}

function ProjectUsersModal({ users, projectDesc }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenDescription, onOpen: onOpenDescription, onClose: onCloseDescription } = useDisclosure();
    const [description, setDescription] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          onOpenDescription();
          setDescription(true);
        }}
      >
        Description
      </Button>
      <Button onClick={onOpen}>Members</Button>

      <Modal
        isOpen={description ? isOpenDescription : isOpen}
        onClose={description ? onCloseDescription : onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{description ? "Project Description" : "Members"}</ModalHeader>
          <ModalCloseButton onClick={() => setDescription(false)} />
          <ModalBody>
            {description
              ? projectDesc
              : users?.map((user) => (
                  <Flex key={user.id} justifyContent="space-between" mb={5}>
                    <Box fontSize={"lg"} fontWeight="semibold">
                      {user.username}
                    </Box>
                    <Badge
                      ml={5}
                      p={1}
                      colorScheme={user.role === "admin" ? "orange" : "green"}
                    >
                      {user.role}
                    </Badge>
                  </Flex>
                ))}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={description ? () => {
                onCloseDescription();
                setDescription(false);
            } : onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProjectUsersModal