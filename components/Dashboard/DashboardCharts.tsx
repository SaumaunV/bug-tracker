import { useQuery } from "@apollo/client";
import { Flex, Skeleton } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  ArcElement,
  Legend,
} from "chart.js";
import { GET_USERS, GET_USER_ALL_TICKETS } from "../../graphql/queries";
import { useUser } from "../../UserProvider";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Title,
  ArcElement,
  Legend
);

const TicketPriorities = Object.seal(["Immediate", "High", "Medium", "Low"]);
const TicketStatuses = Object.seal([
  "Unassigned",
  "New",
  "Development",
  "Testing",
  "Resolved",
]);
const TicketTypes = Object.seal(["Feature", "Bug", "UI"]);
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
  const { user } = useUser();
  const { data, loading, error } = useQuery(GET_USER_ALL_TICKETS, {variables: {id: user ? user.id : ""}});
  const users = useQuery(GET_USERS);

  let adminCount = 0;
  let developerCount = 0;
  users.data?.users?.forEach((user) =>
    user.role === "admin" ? adminCount++ : developerCount++
  );
  
  let featureCount = 0;
  let bugCount = 0;
  let uiCount = 0;
  data?.user?.allTickets?.forEach(ticket => ticket.type === "feature" ? featureCount++ : ticket.type === 'bug' ? bugCount++ : uiCount++);

  const priorityData = TicketPriorities.map(
    (priority) =>
      data?.user?.allTickets?.filter(
        (ticket) => ticket.priority === priority.toLowerCase()
      ).length!
  );

  const ticketStatusData = TicketStatuses.map(
    (status) =>
      data?.user?.allTickets?.filter(
        (ticket) => ticket.status === status.toLowerCase()
      ).length!
  );

  if (loading) return <Skeleton m={10} h='300px'></Skeleton>;
  if (error) return <h1>Error</h1>;
  return (
    <div>
      <Flex m={10} justify="space-between" gap={20}>
        <BarChart
          labels={TicketPriorities}
          title="Tickets by Priority"
          data={priorityData}
          colors={[
            [Colors.purple, Colors.red, Colors.orange, Colors.green],
            [
              Colors.purpleDark,
              Colors.redDark,
              Colors.orangeDark,
              Colors.greenDark,
            ],
          ]}
        />
        <BarChart
          labels={TicketStatuses}
          title="Tickets by Status"
          data={ticketStatusData}
          colors={[
            [
              Colors.grey,
              Colors.blue,
              Colors.yellow,
              Colors.orange,
              Colors.green,
            ],
            [
              Colors.greyDark,
              Colors.blueDark,
              Colors.yellowDark,
              Colors.orangeDark,
              Colors.greenDark,
            ],
          ]}
        />
      </Flex>
      <Flex p={10}>
        <DoughnutChart
          labels={TicketTypes}
          label={"Number of Tickets"}
          data={[featureCount, bugCount, uiCount]}
          title="Tickets by Type"
          first
        />
        <DoughnutChart
          labels={["Admin", "Developer"]}
          label={"Number of Users"}
          data={[adminCount, developerCount]}
          title="Users by Role"
        />
      </Flex>
    </div>
  );
}

export default DashboardCharts;
