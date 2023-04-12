import { useMutation } from "@apollo/client";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ADD_USERS, GET_PROJECT } from "../../graphql/queries";
import { MdPersonAddAlt1 } from 'react-icons/md'

interface Props {
  project_id: string;
  userList:
    | {
        __typename?: "User" | undefined;
        id: string;
        username: string;
        role: string;
      }[]
    | undefined;
}

function AddUserModal({project_id, userList}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState<string[]>([]);
  const [addUsers, { error }] = useMutation(
    ADD_USERS,
    { refetchQueries: [{ query: GET_PROJECT }, "GetProject"] }
  );

  async function AddUsers() {
    try {
      await addUsers({ variables: { input: { project_id, user_ids: users } } });
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={MdPersonAddAlt1} boxSize={6}/>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Users</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup onChange={(e: string[]) => setUsers(e)}>
              <VStack spacing={3} alignItems="flex-start">
                {userList?.map((user) => (
                  <Checkbox key={user.id} value={user.id}>
                    {user.username}
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                AddUsers();
                onClose();
              }}
            >
              Add User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddUserModal;
