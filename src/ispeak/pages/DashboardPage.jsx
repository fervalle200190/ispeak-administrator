import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
     getStatisticsBills,
     getStatisticsCountry,
     getStatisticsGenre,
     getStatisticsLevel,
     getStatisticsLogin,
} from "../../utils";
import { BarChart, BarChartSales, LineChart, PieChart, SunburstChart } from "../components";

const getBillStats = (stats) => {
     const currencies = stats.map((stat) => stat.currencyid);
     const cleanedCurrencies = [...new Set(currencies)];

     const totalCurrencies = {};
     const initialValue = 0;
     cleanedCurrencies.forEach((currency) => {
          totalCurrencies[currency] = stats
               .filter((stat) => stat.currencyid === currency)
               .reduce((acc, currentValue) => acc + currentValue.amount, initialValue);
     });
     const chartData = [];
     for (const curren in totalCurrencies) {
          chartData.push({
               ["currencies"]: curren,
               [curren]: totalCurrencies[curren],
               [`${curren}Color`]: "#g00",
          });
     }
     return {
          cleanedCurrencies,
          chartData,
     };
};

const fakeInfo = {
     name: "nivo",
     color: "hsl(235, 70%, 50%)",
     children: [
          {
               name: "viz",
               color: "hsl(219, 70%, 50%)",
               children: [
                    {
                         name: "stack",
                         color: "hsl(29, 70%, 50%)",
                         children: [
                              {
                                   name: "cchart",
                                   color: "hsl(35, 70%, 50%)",
                                   loc: 191358,
                              },
                              {
                                   name: "xAxis",
                                   color: "hsl(48, 70%, 50%)",
                                   loc: 9796,
                              },
                              {
                                   name: "yAxis",
                                   color: "hsl(111, 70%, 50%)",
                                   loc: 179207,
                              },
                              {
                                   name: "layers",
                                   color: "hsl(110, 70%, 50%)",
                                   loc: 146495,
                              },
                         ],
                    },
                    {
                         name: "ppie",
                         color: "hsl(200, 70%, 50%)",
                         children: [
                              {
                                   name: "chart",
                                   color: "hsl(1, 70%, 50%)",
                                   children: [
                                        {
                                             name: "pie",
                                             color: "hsl(298, 70%, 50%)",
                                             children: [
                                                  {
                                                       name: "outline",
                                                       color: "hsl(209, 70%, 50%)",
                                                       loc: 196071,
                                                  },
                                                  {
                                                       name: "slices",
                                                       color: "hsl(226, 70%, 50%)",
                                                       loc: 24817,
                                                  },
                                                  {
                                                       name: "bbox",
                                                       color: "hsl(36, 70%, 50%)",
                                                       loc: 71137,
                                                  },
                                             ],
                                        },
                                        {
                                             name: "donut",
                                             color: "hsl(145, 70%, 50%)",
                                             loc: 122244,
                                        },
                                        {
                                             name: "gauge",
                                             color: "hsl(65, 70%, 50%)",
                                             loc: 157410,
                                        },
                                   ],
                              },
                              {
                                   name: "legends",
                                   color: "hsl(145, 70%, 50%)",
                                   loc: 69850,
                              },
                         ],
                    },
               ],
          },
          {
               name: "colors",
               color: "hsl(192, 70%, 50%)",
               children: [
                    {
                         name: "rgb",
                         color: "hsl(288, 70%, 50%)",
                         loc: 96128,
                    },
                    {
                         name: "hsl",
                         color: "hsl(65, 70%, 50%)",
                         loc: 124833,
                    },
               ],
          },
          {
               name: "utils",
               color: "hsl(34, 70%, 50%)",
               children: [
                    {
                         name: "randomize",
                         color: "hsl(328, 70%, 50%)",
                         loc: 180977,
                    },
                    {
                         name: "resetClock",
                         color: "hsl(349, 70%, 50%)",
                         loc: 17843,
                    },
                    {
                         name: "noop",
                         color: "hsl(174, 70%, 50%)",
                         loc: 62136,
                    },
                    {
                         name: "tick",
                         color: "hsl(331, 70%, 50%)",
                         loc: 4880,
                    },
                    {
                         name: "forceGC",
                         color: "hsl(352, 70%, 50%)",
                         loc: 51207,
                    },
                    {
                         name: "stackTrace",
                         color: "hsl(37, 70%, 50%)",
                         loc: 71499,
                    },
                    {
                         name: "dbg",
                         color: "hsl(26, 70%, 50%)",
                         loc: 51911,
                    },
               ],
          },
          {
               name: "generators",
               color: "hsl(356, 70%, 50%)",
               children: [
                    {
                         name: "address",
                         color: "hsl(87, 70%, 50%)",
                         loc: 150065,
                    },
                    {
                         name: "city",
                         color: "hsl(31, 70%, 50%)",
                         loc: 92269,
                    },
                    {
                         name: "animal",
                         color: "hsl(1, 70%, 50%)",
                         loc: 13534,
                    },
                    {
                         name: "movie",
                         color: "hsl(137, 70%, 50%)",
                         loc: 3706,
                    },
                    {
                         name: "user",
                         color: "hsl(146, 70%, 50%)",
                         loc: 148930,
                    },
               ],
          },
          {
               name: "set",
               color: "hsl(211, 70%, 50%)",
               children: [
                    {
                         name: "clone",
                         color: "hsl(53, 70%, 50%)",
                         loc: 53211,
                    },
                    {
                         name: "intersect",
                         color: "hsl(125, 70%, 50%)",
                         loc: 41455,
                    },
                    {
                         name: "merge",
                         color: "hsl(221, 70%, 50%)",
                         loc: 139546,
                    },
                    {
                         name: "reverse",
                         color: "hsl(18, 70%, 50%)",
                         loc: 92356,
                    },
                    {
                         name: "toArray",
                         color: "hsl(169, 70%, 50%)",
                         loc: 4138,
                    },
                    {
                         name: "toObject",
                         color: "hsl(140, 70%, 50%)",
                         loc: 160254,
                    },
                    {
                         name: "fromCSV",
                         color: "hsl(32, 70%, 50%)",
                         loc: 152578,
                    },
                    {
                         name: "slice",
                         color: "hsl(155, 70%, 50%)",
                         loc: 199093,
                    },
                    {
                         name: "append",
                         color: "hsl(168, 70%, 50%)",
                         loc: 29098,
                    },
                    {
                         name: "prepend",
                         color: "hsl(353, 70%, 50%)",
                         loc: 101860,
                    },
                    {
                         name: "shuffle",
                         color: "hsl(332, 70%, 50%)",
                         loc: 111830,
                    },
                    {
                         name: "pick",
                         color: "hsl(56, 70%, 50%)",
                         loc: 36812,
                    },
                    {
                         name: "plouc",
                         color: "hsl(87, 70%, 50%)",
                         loc: 172111,
                    },
               ],
          },
          {
               name: "text",
               color: "hsl(3, 70%, 50%)",
               children: [
                    {
                         name: "trim",
                         color: "hsl(308, 70%, 50%)",
                         loc: 163898,
                    },
                    {
                         name: "slugify",
                         color: "hsl(265, 70%, 50%)",
                         loc: 17847,
                    },
                    {
                         name: "snakeCase",
                         color: "hsl(38, 70%, 50%)",
                         loc: 155682,
                    },
                    {
                         name: "camelCase",
                         color: "hsl(102, 70%, 50%)",
                         loc: 98331,
                    },
                    {
                         name: "repeat",
                         color: "hsl(205, 70%, 50%)",
                         loc: 131522,
                    },
                    {
                         name: "padLeft",
                         color: "hsl(129, 70%, 50%)",
                         loc: 81459,
                    },
                    {
                         name: "padRight",
                         color: "hsl(211, 70%, 50%)",
                         loc: 117740,
                    },
                    {
                         name: "sanitize",
                         color: "hsl(36, 70%, 50%)",
                         loc: 104398,
                    },
                    {
                         name: "ploucify",
                         color: "hsl(145, 70%, 50%)",
                         loc: 65454,
                    },
               ],
          },
          {
               name: "misc",
               color: "hsl(57, 70%, 50%)",
               children: [
                    {
                         name: "greetings",
                         color: "hsl(238, 70%, 50%)",
                         children: [
                              {
                                   name: "hey",
                                   color: "hsl(17, 70%, 50%)",
                                   loc: 197822,
                              },
                              {
                                   name: "HOWDY",
                                   color: "hsl(310, 70%, 50%)",
                                   loc: 164238,
                              },
                              {
                                   name: "aloha",
                                   color: "hsl(217, 70%, 50%)",
                                   loc: 424,
                              },
                              {
                                   name: "AHOY",
                                   color: "hsl(174, 70%, 50%)",
                                   loc: 5883,
                              },
                         ],
                    },
                    {
                         name: "other",
                         color: "hsl(282, 70%, 50%)",
                         loc: 187031,
                    },
                    {
                         name: "path",
                         color: "hsl(156, 70%, 50%)",
                         children: [
                              {
                                   name: "pathA",
                                   color: "hsl(313, 70%, 50%)",
                                   loc: 133609,
                              },
                              {
                                   name: "pathB",
                                   color: "hsl(88, 70%, 50%)",
                                   children: [
                                        {
                                             name: "pathB1",
                                             color: "hsl(337, 70%, 50%)",
                                             loc: 17985,
                                        },
                                        {
                                             name: "pathB2",
                                             color: "hsl(210, 70%, 50%)",
                                             loc: 75640,
                                        },
                                        {
                                             name: "pathB3",
                                             color: "hsl(200, 70%, 50%)",
                                             loc: 53337,
                                        },
                                        {
                                             name: "pathB4",
                                             color: "hsl(185, 70%, 50%)",
                                             loc: 78147,
                                        },
                                   ],
                              },
                              {
                                   name: "pathC",
                                   color: "hsl(149, 70%, 50%)",
                                   children: [
                                        {
                                             name: "pathC1",
                                             color: "hsl(254, 70%, 50%)",
                                             loc: 88741,
                                        },
                                        {
                                             name: "pathC2",
                                             color: "hsl(222, 70%, 50%)",
                                             loc: 150968,
                                        },
                                        {
                                             name: "pathC3",
                                             color: "hsl(147, 70%, 50%)",
                                             loc: 185817,
                                        },
                                        {
                                             name: "pathC4",
                                             color: "hsl(163, 70%, 50%)",
                                             loc: 170404,
                                        },
                                        {
                                             name: "pathC5",
                                             color: "hsl(159, 70%, 50%)",
                                             loc: 123167,
                                        },
                                        {
                                             name: "pathC6",
                                             color: "hsl(122, 70%, 50%)",
                                             loc: 14070,
                                        },
                                        {
                                             name: "pathC7",
                                             color: "hsl(44, 70%, 50%)",
                                             loc: 58788,
                                        },
                                        {
                                             name: "pathC8",
                                             color: "hsl(279, 70%, 50%)",
                                             loc: 29985,
                                        },
                                        {
                                             name: "pathC9",
                                             color: "hsl(301, 70%, 50%)",
                                             loc: 67524,
                                        },
                                   ],
                              },
                         ],
                    },
               ],
          },
     ],
};

export const DashboardPage = () => {
     const [statistics, setStatistics] = useState({
          level: [],
          genre: [],
          bills: { billChart: [], currencies: [] },
          active: [],
          countries: [],
     });
     const [tables, setTables] = useState({ bills: { columns: [], rows: [] } });
     const [usersTime, setUsersTime] = useState(3);

     const getData = async () => {
          const { levelStatistics } = await getStatisticsLevel();
          const { genreStatistics } = await getStatisticsGenre();
          const { countryStatistics } = await getStatisticsCountry();
          const { billsStatistics } = await getStatisticsBills();
          const { userStatistics } = await getStatisticsLogin(usersTime);
          const levelStats = [
               {
                    level: "junior",
                    junior: levelStatistics.junior,
                    juniorColor: "hsl(37, 100%, 61%)",
               },
               { level: "middle", middle: levelStatistics.middle, middleColor: "#088AEE" },
               { level: "senior", senior: levelStatistics.senior, middleColor: "#07B2A3" },
               { level: "expert", expert: levelStatistics.expert, middleColor: "#000027" },
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
                    id: "other",
                    label: "other",
                    value: genreStatistics.otros,
               },
          ];
          const billStats = getBillStats(billsStatistics);
          const countryStats = {
               name: "countries",
               children: countryStatistics.map((stat) => ({
                    name: stat.nombre,
                    loc: stat.cantidad,
               })),
          };

          const columns = [
               { field: "fecha", headerName: "Fecha", width: 250 },
               { field: "amount", headerName: "Cantidad", width: 150 },
               { field: "currencyid", headerName: "Moneda", width: 150 },
          ];
          setTables({
               bills: { columns, rows: billsStatistics.map((bill, i) => ({ ...bill, id: i })) },
          });
          setStatistics({
               ...statistics,
               level: levelStats,
               genre: genreStats,
               bills: { billChart: billStats.chartData, currencies: billStats.cleanedCurrencies },
               countries: countryStats,
               active: userStatistics
          });
     };

     const getUsers = async () => {
          const { userStatistics } = await getStatisticsLogin(usersTime);
          setStatistics({
               ...statistics,
               active: userStatistics,
          });
     };
     useEffect(() => {
          getData();
     }, []);

     useEffect(() => {
          getUsers();
     }, [usersTime]);

     return (
          <>
               <Grid
                    container
                    justifyContent="flex-start"
                    alignItems={"flex-start"}
                    spacing={4}
                    pb={10}
               >
                    <Grid item xs={10} sm={7} md={7}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "13px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                                   boxShadow: "0 0 10px #0003",
                              }}
                         >
                              <Typography variant="h6">Usuarios por curso</Typography>
                              <BarChart data={statistics.level} />
                         </Box>
                    </Grid>
                    <Grid item xs={10} sm={4} md={4}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "13px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                                   boxShadow: "0 0 10px #0003",
                              }}
                         >
                              <Typography variant="h6">Género de los usuarios</Typography>
                              <PieChart data={statistics.genre} />
                         </Box>
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "13px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                                   boxShadow: "0 0 10px #0003",
                              }}
                         >
                              <Typography variant="h6">Actividad de los estudiantes</Typography>
                              {statistics.active.length > 0 && (
                                   <LineChart data={statistics.active} />
                              )}
                              <Button onClick={() => setUsersTime(3)}>3 dias</Button>
                              <Button onClick={() => setUsersTime(7)}>1 semana</Button>
                              <Button onClick={() => setUsersTime(60)}>2 meses</Button>
                         </Box>
                    </Grid>
                    <Grid item xs={10} sm={5} md={5}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "13px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                                   boxShadow: "0 0 10px #0003",
                              }}
                         >
                              <Typography variant="h6">Paises</Typography>
                              <SunburstChart data={statistics.countries} />
                         </Box>
                    </Grid>
                    <Grid item xs={10} sm={5} md={5}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "13px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                                   boxShadow: "0 0 10px #0003",
                              }}
                         >
                              <Typography variant="h6">Ventas por moneda</Typography>
                              <BarChartSales
                                   data={statistics.bills.billChart}
                                   currencies={statistics.bills.currencies}
                              />
                         </Box>
                    </Grid>
                    <Grid item xs={12} md={6} height={"400px"}>
                         <DataGrid columns={tables.bills.columns} rows={tables.bills.rows} />
                    </Grid>
               </Grid>
          </>
     );
};
