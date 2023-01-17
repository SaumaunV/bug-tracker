import { Flex, useColorMode } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import Project from "./Project";
import { GET_PROJECTS } from "../../graphql/queries";
import { useUser } from "../../UserProvider";

function ProjectList() {
  const { user } = useUser();
  const [getProjects, {data, loading, error} ] = useLazyQuery(GET_PROJECTS);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (user)
      getProjects({
        variables: { id: user.id},
      });
  }, [user]);

  if (loading) return <h1>data is loading</h1>;
  else if (error) {
    return <h1>Error has occurred</h1>;
  }

  return (
    <Flex flex={1} p={10} shadow='inner' flexWrap='wrap' bg={colorMode === 'light' ? "gray.50": ""} >
      {data?.user?.projects?.map(project => <Project key={project.id} id={project.id} name={project.name} description={project.description} />)}
    </Flex>
  );
  
}

export default ProjectList;
