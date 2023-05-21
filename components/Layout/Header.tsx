import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { useUser } from "../../UserProvider";
import ProjectModal from "../Projects/ProjectModal";
import TicketModal from "../Tickets/TicketModal";

function Header() {
  const { setUser } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  const path = router.pathname.substring(1);

  async function handleLogout (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)  {
    e.preventDefault();
    try {
      const resp = await fetch(
        "https://bugtracker-backend.onrender.com/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const respData = await resp.json();
      setUser(null);
      console.log(respData);
    } catch (error) {
      console.log("error has occurred with logout");
    }
    
  }

  return (
    <Flex alignItems="center" h={14}>
      <Box flex={1} ml={10} fontSize="2xl" fontWeight="bold">
        {path.includes("projects/")
          ? "Project Details"
          : path.includes("tickets/")
          ? "Ticket Details"
          : path[0].toUpperCase() + path.substring(1)}
      </Box>
      {path === "projects" && <ProjectModal />}
      {path === "tickets" && <TicketModal />}

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
            <MenuItem onClick={handleLogout}>Sign out</MenuItem>
          </a>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Header;
