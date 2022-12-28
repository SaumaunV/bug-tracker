import { useQuery } from "@apollo/client";
import { Box, SimpleGrid, useColorMode } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { GET_TICKETS } from "../../graphql/queries";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Title
);

const TicketPriorities = Object.seal(["Immediate", "High", "Medium", "Low"]);
const TicketStatuses = Object.seal([
  "Unassigned",
  "New",
  "Development",
  "Testing",
  "Resolved",
]);
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



function DashboardCharts() {
  const { colorMode } = useColorMode();
  const { data, loading, error } = useQuery(GET_TICKETS);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Tickets by Priority",
        color: colorMode === "dark" ? "white" : "",
      },
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
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <div>
      <SimpleGrid columns={2} spacing={32} p={10}>
        <Box
          minHeight="300px"
          shadow="md"
          border={colorMode === "light" ? "1px solid" : ""}
          borderColor="gray.100"
          bg={colorMode === "dark" ? "gray.700" : ""}
          rounded="md"
          p="5"
        >
          <Bar
            data={{
              labels: TicketPriorities,
              datasets: [
                {
                  label: "Number of Tickets",
                  data: TicketPriorities.map(
                    (priority) =>
                      data?.tickets?.filter(
                        (ticket) => ticket.priority === priority.toLowerCase()
                      ).length
                  ),
                  borderWidth: colorMode === "light" ? 2 : 0,
                  borderColor: ["purple", "red", "orange", "green"],
                  backgroundColor:
                    colorMode === "light"
                      ? [Colors.purple, Colors.red, Colors.orange, Colors.green]
                      : [
                          Colors.purpleDark,
                          Colors.redDark,
                          Colors.orangeDark,
                          Colors.greenDark,
                        ],
                },
              ],
            }}
            options={options}
          />
        </Box>
        <Box
          minHeight="300px"
          shadow="md"
          border={colorMode === "light" ? "1px solid" : ""}
          borderColor="gray.100"
          bg={colorMode === "dark" ? "gray.700" : ""}
          rounded="md"
          p="5"
        >
          <Bar
            data={{
              labels: TicketStatuses,
              datasets: [
                {
                  label: "Number of Tickets",
                  data: TicketStatuses.map(
                    (status) =>
                      data?.tickets?.filter(
                        (ticket) => ticket.status === status.toLowerCase()
                      ).length
                  ),
                  borderWidth: colorMode === "light" ? 2 : 0,
                  borderColor: ["grey", "blue", "yellow", "orange", "green"],
                  backgroundColor:
                    colorMode === "light"
                      ? [
                          Colors.grey,
                          Colors.blue,
                          Colors.yellow,
                          Colors.orange,
                          Colors.green,
                        ]
                      : [
                          Colors.greyDark,
                          Colors.blueDark,
                          Colors.yellowDark,
                          Colors.orangeDark,
                          Colors.greenDark,
                        ],
                },
              ],
            }}
            options={options}
          />
        </Box>
      </SimpleGrid>
    </div>
  );
}

export default DashboardCharts;
