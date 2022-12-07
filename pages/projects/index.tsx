import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Header from "../../components/Header";
import NavMenu from "../../components/NavMenu";
import ProjectList from "../../components/Projects/ProjectList";

function Projects() {
  return (
    <Flex>
      <NavMenu />
      <Flex direction="column" flex={1}>
        <Header />
        <ProjectList />
      </Flex>
    </Flex>
  );
}

export default Projects;
