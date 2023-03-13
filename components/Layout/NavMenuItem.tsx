import { Box, Flex, Icon, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';
import { IconType } from 'react-icons/lib';

interface Props {
  id: string;
  title: string;
  route: string;
  icon: IconType;
  selectedId: string;
  setSelectedId: Dispatch<React.SetStateAction<string>>;
}

function NavMenuItem({ id, title, route, icon, selectedId, setSelectedId }: Props) {
    const { colorMode } = useColorMode();
    const router = useRouter();
    const selected = selectedId === id;

    return (
      <Flex
        p={3}
        mx={3}
        mt={3}
        cursor="pointer"
        borderRadius="lg"
        textColor={selected ? "blue.600" : ""}
        bg={selected ? "blue.50" : "whiteAlpha.200"}
        fontWeight={selected ? 'bold' : "normal"}
        _hover={{
          bg: colorMode === "light" ? "blue.50" : "whiteAlpha.200",
          textColor: selected ? "blue.600" : "blue.500",
        }}
        transitionDuration="200ms"
        onClick={() => {
          router.push(route);
          setSelectedId(id);
        }}
      >
        <Icon as={icon} boxSize={5} ml={2} />
        <Box ml={3}>{title}</Box>
      </Flex>
    );
}

export default NavMenuItem