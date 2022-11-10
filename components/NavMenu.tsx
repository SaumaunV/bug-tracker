import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Icon,
} from "@chakra-ui/react";
import {
  AiFillBug,
  AiFillDashboard,
  AiOutlineDashboard,
} from "react-icons/ai";
import { TbNotes } from 'react-icons/tb';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';

function NavMenu() {
  return (
    <Box h="100vh" w="15%" shadow="base">
      <Flex alignItems="center" justify="center" p={4}>
        <Icon as={AiFillBug} boxSize={8} color="blue.500" />
        <Box ml={2}>Bug Tracker</Box>
      </Flex>

      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem p={1}>
          <AccordionButton>
            <Icon as={AiOutlineDashboard} boxSize={5} />
            <Box ml={3}>Dashboard</Box>
          </AccordionButton>
        </AccordionItem>

        <AccordionItem p={1}>
          <AccordionButton>
            <Icon as={TbNotes} boxSize={5} />
            <Box ml={3} flex={1} textAlign="left">
              Tickets
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel></AccordionPanel>
        </AccordionItem>

        <AccordionItem p={1}>
          <AccordionButton>
            <Icon as={MdOutlineAdminPanelSettings} boxSize={5} />
            <Box ml={3}>Admin</Box>
          </AccordionButton>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default NavMenu;
