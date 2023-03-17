import { Box, Flex, Icon, useColorMode, useMediaQuery } from '@chakra-ui/react';
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
  collapsed: boolean;
}

function NavMenuItem({ id, title, route, icon, selectedId, setSelectedId, collapsed }: Props) {
    const { colorMode } = useColorMode();
    const router = useRouter();
    const [isSmallerThan600] = useMediaQuery("(max-width: 800px)");
    const selected = selectedId === id;
    const light = colorMode === 'light';

    return (
      <Flex
        p={3}
        mx={collapsed ? 2 : 3}
        mt={isSmallerThan600 ? 0 : 3}
        justify={collapsed || isSmallerThan600 ? "center" : ""}
        align='center'
        cursor="pointer"
        borderRadius="lg"
        textColor={selected && light ? "blue.600" : selected && !light ? 'blue.200' :  ""}
        bg={isSmallerThan600 ? "" : selected && light ? "blue.50" : selected && !light ? 'blue.900' : ""}
        fontWeight={selected ? 'bold' : "normal"}
        _hover={{
          bg: isSmallerThan600 ? "" : light ? "blue.50" : selected && !light ? 'blue.900' : "whiteAlpha.200",
          textColor: selected && light ? "blue.600" : selected && !light ? 'blue.200' : !selected && light ? "blue.500" : "blue.50",
        }}
        transitionDuration="200ms"
        onClick={() => {
          router.push(route);
          setSelectedId(id);
        }}
      >
        <Icon as={icon} boxSize={collapsed && selected ? 8 : collapsed || isSmallerThan600 ? 7 : 5} ml={collapsed || isSmallerThan600 ? 0 : 2} />
        {(!collapsed && !isSmallerThan600) && <Box ml={3}>{title}</Box>}
      </Flex>
    );
}

export default NavMenuItem