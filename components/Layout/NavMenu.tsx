import React from "react";
import { Box, Flex, Icon, useColorMode } from "@chakra-ui/react";
import { AiFillBug, AiOutlineDashboard, AiOutlineFolder } from "react-icons/ai";
import { TbNotes } from "react-icons/tb";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "../../UserProvider";

function NavMenu() {
  const { user } = useUser();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const bgHover = colorMode === "light" ? "blackAlpha.200" : "whiteAlpha.200";
  const borderColor =
    colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500";

  return (
    <Box
      h="100vh"
      w="15%"
      shadow="base"
      borderRight={colorMode === "light" ? "" : "1px"}
      borderColor="black"
    >
      <Flex
        alignItems="center"
        justify="center"
        p={4}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <Icon as={AiFillBug} boxSize={8} color="blue.500" />
        <Box ml={3}>
          <Box>Bug</Box>
          <Box>Tracker</Box>
        </Box>
      </Flex>

      <Flex
        w="100%"
        p={3}
        cursor="pointer"
        _hover={{ bg: bgHover }}
        transitionDuration="200ms"
        onClick={() => router.push("/dashboard")}
      >
        <Icon as={AiOutlineDashboard} boxSize={5} ml={2} />
        <Box ml={3}>Dashboard</Box>
      </Flex>

      <Flex
        w="100%"
        p={3}
        cursor="pointer"
        _hover={{ bg: bgHover }}
        transitionDuration="200ms"
        onClick={() => router.push("/projects")}
      >
        <Icon as={AiOutlineFolder} boxSize={5} ml={2} />
        <Box ml={3}>My Projects</Box>
      </Flex>

      <Flex
        w="100%"
        p={3}
        cursor="pointer"
        _hover={{ bg: bgHover }}
        transitionDuration="200ms"
        onClick={() => router.push("/tickets")}
      >
        <Icon as={TbNotes} boxSize={5} ml={2} />
        <Box ml={3}>My Tickets</Box>
      </Flex>
      {user?.role === "admin" && (
        <Link href={"/admin"}>
          <Flex
            w="100%"
            p={3}
            cursor="pointer"
            _hover={{ bg: bgHover }}
            transitionDuration="200ms"
          >
            <Icon as={MdOutlineAdminPanelSettings} boxSize={5} ml={2} />
            <Box ml={3}>Admin</Box>
          </Flex>
        </Link>
      )}
    </Box>
  );
}

export default NavMenu;
