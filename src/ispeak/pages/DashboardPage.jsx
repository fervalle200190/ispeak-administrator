import { Box, Button, Grid } from "@mui/material";
import { LineChart, PieChart } from "../components";

export const DashboardPage = () => {
     // const data = [
     //      {
     //           name: "Page A",
     //           uv: 4000,
     //           pv: 2400,
     //           amt: 2400,
     //      },
     //      {
     //           name: "Page B",
     //           uv: 3000,
     //           pv: 1398,
     //           amt: 2210,
     //      },
     //      {
     //           name: "Page C",
     //           uv: 2000,
     //           pv: 9800,
     //           amt: 2290,
     //      },
     //      {
     //           name: "Page D",
     //           uv: 2780,
     //           pv: 3908,
     //           amt: 2000,
     //      },
     //      {
     //           name: "Page E",
     //           uv: 1890,
     //           pv: 4800,
     //           amt: 2181,
     //      },
     //      {
     //           name: "Page F",
     //           uv: 2390,
     //           pv: 3800,
     //           amt: 2500,
     //      },
     //      {
     //           name: "Page G",
     //           uv: 3490,
     //           pv: 4300,
     //           amt: 2100,
     //      },
     // ];

     return (
          <>
               <Grid
                    container
                    justifyContent="flex-start"
                    alignItems={"flex-start"}
                    spacing={2}
               >
                    <Grid item xs={10} sm={7} md={7}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "3px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                              }}
                         >
                              <LineChart />
                         </Box>
                    </Grid>
                    <Grid item xs={10} sm={4} md={4}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "3px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                              }}
                         >
                              <PieChart />
                         </Box>
                    </Grid>
               </Grid>
          </>
     );
};
