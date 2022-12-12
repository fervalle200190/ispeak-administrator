// import { ResponsiveLine } from "@nivo/line";
import { ResponsiveMarimekko } from "@nivo/marimekko";
import { BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip, Chart as ChartJS } from "chart.js";
import { Bar } from "react-chartjs-2";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

ChartJS.register(
     CategoryScale,
     LinearScale,
     BarElement,
     Title,
     Tooltip,
     Legend
   );

export const LineChart = ({ data /* see data tab */ }) => {
     const labels = data.map(({ hora, fecha }) => `${hora + ':00'}` + ' ' + fecha);
     const config = {
          type: "bar",
          data: data,
          options: {
               responsive: true,
               plugins: {
                    legend: {
                         position: "top",
                    },
                    title: {
                         display: true,
                         text: "Chart.js Floating Bar Chart",
                    },
               },
          },
     };
     const newData = {
          labels: labels,
          datasets: [
               {
                    label: "Students",
                    data: data.map(({ users }) => users),
                    backgroundColor: "#FFB439",
               },
          ],
     };
     return <Bar options={config} data={newData} />;
};
