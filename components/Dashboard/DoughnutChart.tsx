import { Box, useColorMode } from '@chakra-ui/react';
import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const Colors = {
  red: "rgb(255, 99, 132, 0.5)",
  redDark: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64, 0.5)",
  orangeDark: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86, 0.5)",
  yellowDark: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192, 0.5)",
  greenDark: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235, 0.5)",
  blueDark: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255, 0.5)",
  purpleDark: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207, 0.5)",
  greyDark: "rgb(201, 203, 207)",
};

interface Props {
    labels: string[];
    label?: string;
    title: string;
    data: number[];
    first?: boolean;
}

function DoughnutChart({ labels, label, title, data, first }: Props) {
  const { colorMode } = useColorMode();

  return (
    <Box
      shadow="md"
      border={colorMode === "light" ? "1px solid" : ""}
      borderColor="gray.100"
      bg={colorMode === "dark" ? "gray.700" : "white"}
      rounded="md"
      p={5}
      mx={8}
      ml={first ? 0 : 8}
    >
      <Doughnut
        data={{
          labels,
          datasets: [
            {
              animation: false,
              label,
              data,
              borderWidth: colorMode === "light" ? 1 : 0,
              borderColor: ["blue", "red"],
              backgroundColor:
                colorMode === "light"
                  ? [Colors.blue, Colors.red, Colors.orange]
                  : [Colors.blueDark, Colors.redDark, Colors.orangeDark],
            },
          ],
        }}
        options={{
          plugins: {
            title: {
              display: true,
              text: title,
              color: colorMode === "dark" ? "white" : "",
              font: { size: 16 },
            },
          },
        }}
      />
    </Box>
  );
}

export default DoughnutChart