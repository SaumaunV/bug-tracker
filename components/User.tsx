import { useMutation } from "@apollo/client";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Select,
  Td,
  Tr,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { GET_USERS, UPDATE_USER } from "../graphql/queries";
import { useUser } from "../UserProvider";
import AlertDialogDelete from "./AlertDialogDelete";

interface Props {
  user: {
        __typename?: "User" | undefined;
        id: string;
        username: string;
        email: string;
        role: string;
      }
}

function User({ user }: Props) {
  const { isDemo } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const [editing, setEditing] = useState(false);
  const [role, setRole] = useState("");

  const [updateUser, { error }] = useMutation(UPDATE_USER, {
    refetchQueries: [
      { query: GET_USERS, variables: { id: user.id } },
      "GetAllProjects",
    ],
  });

  async function handleUserUpdate() {
    await updateUser({variables: {role, id: user.id}});
    error
      ? toast({
          title: 'Error updating User.',
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      : toast({
          title: 'User updated.',
          status: "success",
          duration: 5000,
          isClosable: true,
        });
  }

  return (
    <>
      <Tr>
        <Td>{user?.username}</Td>
        <Td>{user?.email}</Td>
        <Td>
          {editing ? (
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="developer">developer</option>
              <option value="admin">admin</option>
            </Select>
          ) : (
            user?.role
          )}
        </Td>
        <Td>
          {!editing && (
            <IconButton
              aria-label="Edit User"
              icon={<EditIcon />}
              colorScheme={colorMode === "dark" ? "facebook" : "gray"}
              onClick={() => setEditing(true)}
            />
          )}
          {editing && (
            <>
              <IconButton
                aria-label="Save User"
                icon={<CheckIcon />}
                colorScheme={colorMode === "dark" ? "facebook" : "gray"}
                onClick={() => {
                  if (user?.role === role || isDemo) {
                    setEditing(false);
                  } else {
                    handleUserUpdate();
                    setEditing(false);
                  }
                }}
              />
              <IconButton
                aria-label="Cancel"
                icon={<CloseIcon />}
                colorScheme={colorMode === "dark" ? "facebook" : "gray"}
                onClick={() => setEditing(false)}
                ml={3}
              />
            </>
          )}

          <IconButton
            aria-label="Delete User"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={onOpen}
            ml={3}
          />
        </Td>
      </Tr>
      <AlertDialogDelete
        id={user?.id!}
        isOpen={isOpen}
        onClose={onClose}
        type="user"
        title="Delete User"
      />
    </>
  );
}

export default User;
