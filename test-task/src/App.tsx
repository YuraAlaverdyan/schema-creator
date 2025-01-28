import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import SchemaEditor from './components/SchemaEditor'
import { theme } from './theme'

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SchemaEditor />
    </ThemeProvider>
  )
}

export default App
