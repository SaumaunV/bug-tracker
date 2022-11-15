import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Icon, useColorMode } from '@chakra-ui/react';
import React from 'react'
import { CgProfile } from 'react-icons/cg';

function Header() {
    const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      alignItems="center"
      h={14}
      borderBottom={colorMode ==='light' ? "": "1px"}
      borderBottomColor="black"
      shadow={colorMode === 'light' ? '' : "base"}
    >
      <Box flex={1} ml={4} fontSize="2xl" fontWeight="bold">
        Dashboard
      </Box>
      <Button mr={5} rightIcon={<AddIcon />} colorScheme="messenger">
        New Project
      </Button>
      <Button p={2} mr={3} bg={colorMode === 'light' ? "white" : ''} _hover={colorMode === 'light' ? {bg: "gray.300"} : {bg: 'whiteAlpha.200'}} onClick={() => toggleColorMode()}>
        {colorMode === 'light' ? <MoonIcon boxSize={5} /> : <SunIcon boxSize={5}/>}
      </Button>

      <Icon as={CgProfile} boxSize={8} mr={5} />
    </Flex>
  );
}

export default Header