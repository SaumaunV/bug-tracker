import { Box, Center, Container, Flex } from '@chakra-ui/react'
import React from 'react'

function DashboardInfo() {
  return (
    <Flex flex={1} shadow="inner" justifyContent="space-around">
      <Flex
        mt={8}
        w="20%"
        h="150px"
        direction="column"
        alignItems="center"
        justify="center"
        bg="cyan.600"
        textColor="white"
        fontSize="3xl"
        borderRadius="lg"
        shadow="base"
      >
        <Box fontWeight="bold">0</Box>
        <div>Projects</div>
      </Flex>
      <Flex
        mt={8}
        w="20%"
        h="150px"
        direction="column"
        alignItems="center"
        justify="center"
        bg="orange.400"
        textColor="white"
        fontSize="3xl"
        borderRadius="lg"
        shadow="base"
      >
        <Box fontWeight="bold">0</Box>
        <div>Tickets</div>
      </Flex>
      <Flex
        mt={8}
        w="20%"
        h="150px"
        direction="column"
        alignItems="center"
        justify="center"
        bg="green.500"
        textColor="white"
        fontSize="3xl"
        borderRadius="lg"
        shadow="base"
      >
        <Box fontWeight="bold">0</Box>
        <div>Users</div>
      </Flex>
    </Flex>
  );
}

export default DashboardInfo