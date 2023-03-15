import React, { useState, useEffect } from "react";
import { Box, Button, Divider, Flex, Icon, useColorMode } from "@chakra-ui/react";
import { AiFillBug, AiOutlineDashboard, AiOutlineFolder } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useRouter } from "next/router";
import { useUser } from "../../UserProvider";
import NavMenuItem from "./NavMenuItem";
import { BiArrowFromRight, BiArrowFromLeft } from "react-icons/bi";

function NavMenu() {
  const { user } = useUser();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const light = colorMode === 'light';

  const [selectedId, setSelectedId] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    router.pathname === '/dashboard' ? setSelectedId("1") : 
    router.pathname.includes('project') ? setSelectedId("2") : 
    router.pathname === '/tickets' ? setSelectedId("3") : 
    setSelectedId("4"); 
  }, []);

  return (
    <Box
      h="100vh"
      w={collapsed ? "60px" : "275px"}
      borderRight={colorMode === "light" ? "1px" : "1px"}
      borderColor={colorMode === "light" ? "lightgray" : "black"}
    >
      {collapsed}
      <Flex justify={collapsed ? "center" : "flex-end"}>
        <Button bg={light ? "white": "gray.800"} p={0} m={collapsed ? 0 : 1} mx={collapsed ? 0 : 2} my={collapsed ? 2 : 1} onClick={() => setCollapsed(!collapsed)}>
          <Icon
            as={collapsed ? BiArrowFromLeft : BiArrowFromRight}
            boxSize={5}
            color={light ? "gray.700": 'white'}
          />
        </Button>
      </Flex>
      <Flex
        alignItems="center"
        justify="center"
        mb={4}
      >
        <Icon as={AiFillBug} boxSize={8} color="blue.500" />
        {!collapsed && (
          <Box ml={3} fontWeight="bold" textColor="blue.600">
            <Box>Bug</Box>
            <Box>Tracker</Box>
          </Box>
        )}
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
        collapsed={collapsed}
      />
      <NavMenuItem
        id="2"
        title="My Projects"
        route="/projects"
        icon={AiOutlineFolder}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        collapsed={collapsed}
      />
      <NavMenuItem
        id="3"
        title="My Tickets"
        route="/tickets"
        icon={TbNotes}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        collapsed={collapsed}
      />
      {user?.role === "admin" && (
        <NavMenuItem
          id="4"
          title="Admin"
          route="/admin"
          icon={MdOutlineAdminPanelSettings}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          collapsed={collapsed}
        />
      )}
    </Box>
  );
}

export default NavMenu;
