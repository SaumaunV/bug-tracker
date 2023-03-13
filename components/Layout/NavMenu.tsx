import React, { useState, useEffect } from "react";
import { Box, Divider, Flex, Icon, useColorMode } from "@chakra-ui/react";
import { AiFillBug, AiOutlineDashboard, AiOutlineFolder } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useRouter } from "next/router";
import { useUser } from "../../UserProvider";
import NavMenuItem from "./NavMenuItem";

function NavMenu() {
  const { user } = useUser();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const borderColor =
    colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500";

  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    router.pathname === '/dashboard' ? setSelectedId("1") : 
    router.pathname.includes('project') ? setSelectedId("2") : 
    router.pathname === '/tickets' ? setSelectedId("3") : 
    setSelectedId("4"); 
  }, []);

  return (
    <Box
      h="100vh"
      w="15%"
      borderRight={colorMode === "light" ? "1px" : "1px"}
      borderColor={colorMode === "light" ? "lightgray" : "black"}
    >
      <Flex
        alignItems="center"
        justify="center"
        p={4}
        borderColor={borderColor}
      >
        <Icon as={AiFillBug} boxSize={8} color="blue.500" />
        <Box ml={3} fontWeight="bold" textColor="blue.600">
          <Box>Bug</Box>
          <Box>Tracker</Box>
        </Box>
      </Flex>

      <Flex>
        <Divider mx={5} mb={3} />
      </Flex>

      <NavMenuItem
        id="1"
        title="Dashboard"
        route="/dashboard"
        icon={AiOutlineDashboard}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <NavMenuItem
        id="2"
        title="My Projects"
        route="/projects"
        icon={AiOutlineFolder}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <NavMenuItem
        id="3"
        title="My Tickets"
        route="/tickets"
        icon={TbNotes}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      {user?.role === "admin" && (
        <NavMenuItem
          id="4"
          title="Admin"
          route="/admin"
          icon={MdOutlineAdminPanelSettings}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}
    </Box>
  );
}

export default NavMenu;
