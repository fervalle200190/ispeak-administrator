import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { useForm } from "../../hooks"
import {
     getStatisticsBills,
     getStatisticsCountry,
     getStatisticsGenre,
     getStatisticsLevel,
     getStatisticsLogin,
} from "../../utils"
import { BarChart, BarChartSales, LineChart, PieChart, SunburstChart } from "../components"

const getBillStats = (stats) => {
     const currencies = stats.map((stat) => stat.currencyid)
     const cleanedCurrencies = [...new Set(currencies)]

     const totalCurrencies = {}
     const initialValue = 0
     cleanedCurrencies.forEach((currency) => {
          totalCurrencies[currency] = stats
               .filter((stat) => stat.currencyid === currency)
               .reduce((acc, currentValue) => acc + currentValue.amount, initialValue)
     })
     const chartData = []
     for (const curren in totalCurrencies) {
          chartData.push({
               ["currencies"]: curren,
               [curren]: totalCurrencies[curren],
               [`${curren}Color`]: "#g00",
          })
     }
     return {
          cleanedCurrencies,
          chartData,
     }
}

export const DashboardPage = () => {
     const [statistics, setStatistics] = useState({
          level: [],
          genre: [],
          bills: { billChart: [], currencies: [] },
          active: [],
          countries: [],
     })
     const [tables, setTables] = useState({ bills: { columns: [], rows: [] } })
     const [usersTime, setUsersTime] = useState(3)
     const { minDate, maxDate, onInputChange } = useForm({ minDate: "", maxDate: "" })

     const getData = async () => {
          const { levelStatistics } = await getStatisticsLevel()
          const { genreStatistics } = await getStatisticsGenre()
          const { countryStatistics } = await getStatisticsCountry()
          const { billsStatistics } = await getStatisticsBills()
          const { userStatistics } = await getStatisticsLogin(usersTime)
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
          ]

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
          ]
          const billStats = getBillStats(billsStatistics)
          const countryStats = {
               name: "countries",
               children: countryStatistics.map((stat) => ({
                    name: stat.nombre,
                    loc: stat.cantidad,
               })),
          }

          const columns = [
               { field: "fecha", headerName: "Fecha", width: 250 },
               { field: "amount", headerName: "Cantidad", width: 150 },
               { field: "currencyid", headerName: "Moneda", width: 150 },
          ]
          setTables({
               bills: { columns, rows: billsStatistics.map((bill, i) => ({ ...bill, id: i })) },
          })
          setStatistics({
               ...statistics,
               level: levelStats,
               genre: genreStats,
               bills: { billChart: billStats.chartData, currencies: billStats.cleanedCurrencies },
               countries: countryStats,
               active: userStatistics.sort((a, b) => {
                    let partes = a.fecha.split("/")
                    let fa = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
                    partes = b.fecha.split("/")
                    let fb = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
                    return fa - fb
               }),
          })
     }

     const getUsers = async (days) => {
          const { userStatistics } = await getStatisticsLogin(days)
          setStatistics({
               ...statistics,
               active: userStatistics.sort((a, b) => {
                    let partes = a.fecha.split("/")
                    let fa = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
                    partes = b.fecha.split("/")
                    let fb = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
                    return fa - fb
               }),
          })
     }

     const getUsersByDate = async () => {
          const { userStatistics } = await getStatisticsLogin(1000)
          const newStatistics = userStatistics
               .filter(({ fecha }) => {
                    let partes = fecha.split("/")
                    let newMaxDate = new Date(maxDate)
                    let newMinDate = new Date(minDate)
                    let newFecha = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
                    return newFecha <= newMaxDate && newFecha >= newMinDate ? true : false
               })
               .sort((a, b) => {
                    let partes = a.fecha.split("/")
                    let fa = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
                    partes = b.fecha.split("/")
                    let fb = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`)
                    return fa - fb
               })
          setStatistics({
               ...statistics,
               active: newStatistics,
          })
     }
     useEffect(() => {
          getData()
     }, [])

     useEffect(() => {
          getUsers(usersTime)
     }, [usersTime])

     useEffect(() => {
          if (minDate === "" || maxDate === "") return
          getUsersByDate()
     }, [minDate, maxDate])

     return (
          <>
               <Grid
                    container
                    justifyContent='flex-start'
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
                              <Typography variant='h6'>Usuarios por curso</Typography>
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
                              <Typography variant='h6'>Género de los usuarios</Typography>
                              <PieChart data={statistics.genre} />
                         </Box>
                    </Grid>
                    <Grid item xs={10} sm={6} md={6}>
                         <Box
                              height={450}
                              sx={{
                                   borderRadius: "13px",
                                   padding: 5,
                                   transition: "all 0.2s ease-in-out",
                                   boxShadow: "0 0 10px #0003",
                              }}
                         >
                              <Typography variant='h6'>Actividad de los estudiantes</Typography>
                              {statistics.active.length > 0? (
                                   <LineChart data={statistics.active} />
                              ): <Typography my={5} variant='h6'>No hay rango para mostrar</Typography>}
                              <Button onClick={() => setUsersTime(3)}>3 dias</Button>
                              <Button onClick={() => setUsersTime(7)}>1 semana</Button>
                              <Button onClick={() => setUsersTime(60)}>2 meses</Button>
                              <Grid>
                                   <TextField
                                        type='date'
                                        name='minDate'
                                        value={minDate}
                                        onChange={onInputChange}
                                   />
                                   <TextField
                                        type='date'
                                        name='maxDate'
                                        sx={{ml: 2}}
                                        value={maxDate}
                                        onChange={onInputChange}
                                   />
                              </Grid>
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
                              <Typography variant='h6'>Paises</Typography>
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
                              <Typography variant='h6'>Ventas por moneda</Typography>
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
     )
}
