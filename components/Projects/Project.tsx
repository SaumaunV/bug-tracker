import {
  Button,
  CardBody,
  CardFooter,
  Heading,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import AlertDialogDelete from "../AlertDialogDelete";

interface Props {
  id: string;
  name: string;
  description: string | null | undefined;
}

function Project({ id, name }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <>
      <Card
        data-testid="project-component"
        align="center"
        maxWidth="300px"
        w="300px"
        mr={10}
        mb={10}
        h="180px"
        bg={colorMode === "light" ? "white" : ""}
      >
        <Heading size="md" mt={3}>
          {name}
        </Heading>
        <CardBody></CardBody>
        <CardFooter>
          <Link href={"projects/[projectId]"} as={`projects/${id}`}>
            <Button colorScheme="blue" mr={5}>
              Details
            </Button>
          </Link>
          <Button colorScheme="red" onClick={onOpen}>
            Delete
          </Button>
        </CardFooter>
      </Card>
      <AlertDialogDelete id={id} isOpen={isOpen} onClose={onClose} type='project' title='Delete Project' />
    </>
  );
}

export default Project;
