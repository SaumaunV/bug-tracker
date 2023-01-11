import { Box} from "@chakra-ui/react";
import React from "react";
import DashboardCharts from "../components/Dashboard/DashboardCharts";
import DashboardInfo from "../components/Dashboard/DashboardInfo";

function Dashboard() {
  return (
    <Box>
      <DashboardInfo />
      <DashboardCharts />
    </Box>
  );
}

export default Dashboard;
