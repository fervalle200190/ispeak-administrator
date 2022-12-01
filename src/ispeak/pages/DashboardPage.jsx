import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getStatisticsCountry, getStatisticsGenre, getStatisticsLevel } from "../../utils";
import { BarChart, PieChart } from "../components";

export const DashboardPage = () => {
     const [statistics, setStatistics] = useState({ level: [], genre: [] });

     const getData = async () => {
          const { levelStatistics } = await getStatisticsLevel();
          const { genreStatistics } = await getStatisticsGenre();
          const { countryStatistics } = await getStatisticsCountry()
          console.log(countryStatistics);
          // console.log(genreStatistics);
          const levelStats = [
               { level: "junior", junior: levelStatistics.junior, juniorColor: "#g00" },
               { level: "middle", middle: levelStatistics.middle, middleColor: "#g00" },
               { level: "senior", senior: levelStatistics.senior, middleColor: "#g00" },
               { level: "expert", expert: levelStatistics.expert, middleColor: "#g00" },
               {
                    level: "all level",
                    ["all level"]: levelStatistics.allLevel,
                    ["all levelColor"]: "#g00",
               },
          ];

          const genreStats = [
               {
                    id: "female",
                    label: "female",
                    value: genreStatistics.femenino,
               },
               {
                    id: "male",
                    label: "male",
                    value: genreStatistics.masculino,
               },
               {
                    id: 'other',
                    label: 'other',
                    value: genreStatistics.otros,
               },
          ];
          setStatistics({ level: levelStats, genre: genreStats });
     };
     useEffect(() => {
          getData();
     }, []);

     return (
          <>
               <Grid container justifyContent="flex-start" alignItems={"flex-start"} spacing={2}>
                    <Grid item xs={10} sm={7} md={7}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "3px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                              }}
                         >
                              <Typography variant='h6'>Usuarios por curso</Typography>
                              <BarChart data={statistics.level} />
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
                              <Typography variant='h6'>Género de los usuarios</Typography>
                              <PieChart data={statistics.genre} />
                         </Box>
                    </Grid>
               </Grid>
          </>
     );
};
