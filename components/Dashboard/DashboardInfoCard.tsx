import { Box, Flex, Icon, useColorMode } from '@chakra-ui/react';
import React from 'react'
import { IconType } from 'react-icons/lib';

interface Props {
    data: number;
    dataType: string;
    icon: IconType;
    colorLight: string;
    colorDark: string;
}

function DashboardInfoCard({ data, dataType, icon, colorLight, colorDark }: Props) {
    const { colorMode } = useColorMode();
    
  return (
    <Box
      py={5}
      px={8}
      mt="8"
      w="20%"
      minWidth="250px"
      h="150px"
      borderRadius="md"
      shadow="base"
      bg={colorMode === "dark" ? "gray.700" : "white"}
      border={colorMode === "light" ? "1px solid" : ""}
      borderColor="gray.200"
    >
      <Box
        textColor="gray.400"
        letterSpacing="-1px"
        fontWeight="semibold"
        fontSize="md"
      >
        {data === 1 ? dataType.toUpperCase() : dataType.toUpperCase() + "S"}
      </Box>
      <Flex justifyContent="space-between" alignItems="center">
        <Box fontWeight="bold" fontSize="6xl">
          {data}
        </Box>
        <Icon
          as={icon}
          size={70}
          boxSize={16}
          color={colorMode === "light" ? colorLight : colorDark}
        />
      </Flex>
    </Box>
  );
}

export default DashboardInfoCard