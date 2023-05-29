import { scaleBand } from "@devexpress/dx-chart-core";
import {
  Animation,
  ArgumentScale,
  EventTracker,
} from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Tooltip,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";

import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import * as React from "react";
export default function TransactionChart({ groupedTransaction }) {
  React.useEffect(() => {
    console.log("Dummy data is", groupedTransaction);
  }, [groupedTransaction]);

  let chartData = [];
  if (Object.keys(groupedTransaction).length > 0) {
    chartData = groupedTransaction
      .sort((a, b) => a._id - b._id)
      .map((item) => {
        item.month = dayjs()
          .month(item._id - 1)
          .format("YYYY MMMM");
        return item;
      });
  }

  return (
    <Paper sx={{ marginTop: 5 }}>
      <Chart data={chartData}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="totalExpenses" argumentField="month" />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
