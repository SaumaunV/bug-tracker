import {
  Button,
  CardBody,
  CardFooter,
  Heading,
  useColorMode,
} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  name: string;
  description: string | null | undefined;
}

function Project({ id, name }: Props) {
  const { colorMode } = useColorMode();

  return (
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
      </CardFooter>
    </Card>
  );
}

export default Project;
