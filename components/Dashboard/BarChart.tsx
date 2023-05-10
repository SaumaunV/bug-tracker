import { Flex, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Bar } from "react-chartjs-2";

interface Props {
  labels: string[];
  title: string;
  data: number[];
  colors: string[][];
}

function BarChart({ labels, data, title, colors }: Props) {
    const { colorMode } = useColorMode();

  return (
    <Flex
      flex={1}
      minWidth="500px"
      minHeight="300px"
      shadow="md"
      border={colorMode === "light" ? "1px solid" : ""}
      borderColor="gray.100"
      bg={colorMode === "dark" ? "gray.700" : "white"}
      rounded="md"
      p="5"
    >
      <Bar
        data={{
          labels,
          datasets: [
            {
              animation: false,
              label: "Number of Tickets",
              data,
              borderWidth: colorMode === "light" ? 2 : 0,
              borderColor: ["purple", "red", "orange", "green"],
              backgroundColor:
                colorMode === "light"
                  ? colors[0]
                  : colors[1],
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
            legend: { display: false },
          },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: { color: colorMode === "dark" ? "white" : "" },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: { color: colorMode === "dark" ? "white" : "" },
            },
          },
        }}
      />
    </Flex>
  );
}

export default BarChart;
