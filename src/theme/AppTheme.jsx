import { ThemeProvider, CssBaseline } from '@mui/material'
import { blueTheme } from './'

export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={blueTheme}>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}
