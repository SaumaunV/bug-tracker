import { Flex } from "@chakra-ui/react";
import React from "react";
import { useQuery} from "@apollo/client";
import Project from "./Project";
import { GET_PROJECTS } from "../../graphql/queries";

type Project = {
  projects: [{ id: string; name: string; description: string }];
};

function ProjectList() {
  const { data, loading, error } = useQuery<Project>(GET_PROJECTS);

  if (loading) return <h1>data is loading</h1>;
  else if (error) {
    console.log(error);
  } else console.log(data);

  return (
    <Flex p={10} flexWrap='wrap' >
      {data?.projects.map(project => <Project key={project.id} id={project.id} name={project.name} description={project.description} />)}
    </Flex>
  );
}

export default ProjectList;
