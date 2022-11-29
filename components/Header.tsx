import { AddIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Icon, Menu, MenuButton, MenuItem, MenuList, useColorMode, useDisclosure } from '@chakra-ui/react';
import React from 'react'
import { CgProfile } from 'react-icons/cg';
import ProjectModal from './ProjectModal';
import TicketModal from './TicketModal';

function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen: isOpenProject, onOpen: onOpenProject, onClose: onCloseProject } = useDisclosure();
    const { isOpen: isOpenTicket, onOpen: onOpenTicket, onClose: onCloseTicket } = useDisclosure();

  return (
    <Flex
      alignItems="center"
      h={14}
      borderBottom={colorMode === "light" ? "" : "1px"}
      borderBottomColor="black"
      shadow={colorMode === "light" ? "" : "base"}
    >
      <Box flex={1} ml={4} fontSize="2xl" fontWeight="bold">
        Dashboard
      </Box>
      <Button
        mr={5}
        rightIcon={<AddIcon />}
        colorScheme="messenger"
        onClick={onOpenProject}
      >
        New Project
      </Button>
      <Button
        mr={5}
        rightIcon={<AddIcon />}
        colorScheme="orange"
        onClick={onOpenTicket}
      >
        New Ticket
      </Button>
      <ProjectModal isOpen={isOpenProject} onClose={onCloseProject} />
      <TicketModal isOpen={isOpenTicket} onClose={onCloseTicket} />
      <Button
        p={2}
        mr={3}
        bg={colorMode === "light" ? "white" : ""}
        _hover={
          colorMode === "light" ? { bg: "gray.300" } : { bg: "whiteAlpha.200" }
        }
        onClick={() => toggleColorMode()}
      >
        {colorMode === "light" ? (
          <MoonIcon boxSize={5} />
        ) : (
          <SunIcon boxSize={5} />
        )}
      </Button>
      <Menu autoSelect={false}>
        <MenuButton>
          <Icon as={CgProfile} boxSize={8} mr={5} />
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <a href="/api/auth/logout">
            <MenuItem>Sign out</MenuItem>
          </a>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Header