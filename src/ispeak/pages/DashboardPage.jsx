import { Box, Button, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
     getStatisticsBills,
     getStatisticsCountry,
     getStatisticsGenre,
     getStatisticsLevel,
} from "../../utils";
import { BarChart, BarChartSales, PieChart } from "../components";

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

export const DashboardPage = () => {
     const [statistics, setStatistics] = useState({
          level: [],
          genre: [],
          bills: { billChart: [], currencies: [] },
     });
     const [tables, setTables] = useState({ bills: { columns: [], rows: [] } });

     const getData = async () => {
          const { levelStatistics } = await getStatisticsLevel();
          const { genreStatistics } = await getStatisticsGenre();
          const { countryStatistics } = await getStatisticsCountry();
          const { billsStatistics } = await getStatisticsBills();
          console.log(billsStatistics);
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
                    id: "other",
                    label: "other",
                    value: genreStatistics.otros,
               },
          ];
          const billStats = getBillStats(billsStatistics);

          const columns = [
               { field: "fecha", headerName: "Fecha", width: 250 },
               { field: "amount", headerName: "Cantidad", width: 150 },
               { field: "currencyid", headerName: "Moneda", width: 150 },
          ];
          setTables({
               bills: {columns, rows: billsStatistics.map((bill,i)=> ({...bill, id: i}))}
          })
          setStatistics({
               level: levelStats,
               genre: genreStats,
               bills: { billChart: billStats.chartData, currencies: billStats.cleanedCurrencies },
          });
     };
     useEffect(() => {
          getData();
     }, []);

     return (
          <>
               <Grid container justifyContent="flex-start" alignItems={"flex-start"} spacing={2} pb={10}>
                    <Grid item xs={10} sm={7} md={7}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "3px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
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
                                   borderRadius: "3px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                              }}
                         >
                              <Typography variant="h6">Género de los usuarios</Typography>
                              <PieChart data={statistics.genre} />
                         </Box>
                    </Grid>
                    <Grid item xs={10} sm={7} md={7}>
                         <Box
                              height={350}
                              sx={{
                                   borderRadius: "3px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                              }}
                         >
                              <Typography variant="h6">Ventas por moneda</Typography>
                              <BarChartSales
                                   data={statistics.bills.billChart}
                                   currencies={statistics.bills.currencies}
                              />
                         </Box>
                    </Grid>
                    <Grid item xs={12} height={'400px'}>
                         <DataGrid columns={tables.bills.columns} rows={tables.bills.rows} />
                    </Grid>
               </Grid>
          </>
     );
};
